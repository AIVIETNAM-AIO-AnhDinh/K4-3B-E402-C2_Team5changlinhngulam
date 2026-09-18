import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildPrompt,
  loadLocalEnv,
  normalizeOutput,
  responseFormat,
  retrieveSourceIds,
  systemInstruction
} from './ai-contract.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const codebase = path.join(root, 'codebase');
const fixture = JSON.parse(await fs.readFile(path.join(root, 'eval', 'golden-set.json'), 'utf8'));
const sourceCatalog = JSON.parse(await fs.readFile(path.join(root, 'data', 'daily-standup-source-cards.json'), 'utf8'));
await loadLocalEnv(root);
const apiKey = process.env.OPENAI_API_KEY;
const portArg = process.argv.indexOf('--port');
const port = Number(portArg >= 0 ? process.argv[portArg + 1] : 8787);
if (!apiKey) throw new Error('Missing OPENAI_API_KEY. Set it in this terminal before starting the local backend.');
const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

const sourceCardsById = new Map(sourceCatalog.cards.map((source) => [source.id, source]));

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  res.end(body);
}

function parseJson(text) {
  const clean = String(text ?? '').replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
  try { return JSON.parse(clean); } catch {}
  const start = clean.indexOf('{');
  const end = clean.lastIndexOf('}');
  if (start >= 0 && end > start) return JSON.parse(clean.slice(start, end + 1));
  throw new Error('Model output is not JSON');
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

async function callOpenAI(input, caseId, history = []) {
  const retrievedIds = retrieveSourceIds(input);
  const sourceCards = retrievedIds.map((id) => sourceCardsById.get(id)).filter(Boolean)
    .map((s) => `${s.id} | ${s.kind} | ${s.title}\n${s.facts}`).join('\n\n');
  const prompt = buildPrompt(input, history, sourceCards, caseId);
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'content-type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
        model,
      messages: [
        { role: 'system', content: systemInstruction },
        { role: 'user', content: prompt }
      ],
      temperature: 0.1,
      response_format: responseFormat,
      store: false
    })
  });
  const body = await response.json();
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${body?.error?.message || 'OpenAI request failed'}`);
  const raw = body?.choices?.[0]?.message?.content || '';
  return { output: normalizeOutput(parseJson(raw), retrievedIds, input), raw, retrieved_source_ids: retrievedIds };
}

function cleanHistory(history) {
  if (!Array.isArray(history)) return [];
  return history.filter((item) => item && (item.role === 'user' || item.role === 'assistant') && typeof item.content === 'string')
    .slice(-8)
    .map((item) => ({ role: item.role, content: item.content.slice(0, 2000) }));
}

const server = http.createServer(async (req, res) => {
  try {
    const requestUrl = new URL(req.url, `http://localhost:${port}`);
    if (req.method === 'POST' && requestUrl.pathname === '/api/chat') {
      const payload = await readBody(req);
      if (!payload.input || !payload.case_id) return sendJson(res, 400, { error: 'input and case_id are required' });
      if (String(payload.input).length > 4000) return sendJson(res, 413, { error: 'input is too long' });
      const started = Date.now();
      const result = await callOpenAI(String(payload.input), String(payload.case_id), cleanHistory(payload.history));
      return sendJson(res, 200, { ...result, model, latency_ms: Date.now() - started, history_turns: cleanHistory(payload.history).length });
    }
    if (req.method === 'GET') {
      const relative = requestUrl.pathname === '/' ? 'index.html' : decodeURIComponent(requestUrl.pathname.slice(1));
      const filePath = path.resolve(codebase, relative);
      if (filePath !== codebase && !filePath.startsWith(`${codebase}${path.sep}`)) return sendJson(res, 403, { error: 'forbidden' });
      const data = await fs.readFile(filePath);
      const type = filePath.endsWith('.html') ? 'text/html; charset=utf-8' : 'text/plain; charset=utf-8';
      res.writeHead(200, { 'content-type': type, 'cache-control': 'no-store' });
      return res.end(data);
    }
    return sendJson(res, 404, { error: 'not found' });
  } catch (error) {
    return sendJson(res, 502, { error: String(error?.message || error) });
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`CP5/CP3 local backend: http://localhost:${port}/`);
  console.log(`Model: ${model} · index.html uses live OpenAI with recent chat history; API key stays in this server process.`);
  console.log(`CP3 page: http://localhost:${port}/cp3.html`);
});
