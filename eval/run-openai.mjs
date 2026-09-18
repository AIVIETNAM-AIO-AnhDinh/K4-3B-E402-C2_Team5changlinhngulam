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
const fixturePath = path.join(root, 'eval', 'golden-set.json');
const fixture = JSON.parse(await fs.readFile(fixturePath, 'utf8'));
const sourceCatalog = JSON.parse(await fs.readFile(path.join(root, 'eval', 'daily-standup-source-cards.json'), 'utf8'));
const sourceCards = sourceCatalog.cards;
await loadLocalEnv(root);
const args = new Map();
for (let i = 2; i < process.argv.length; i += 1) {
  if (process.argv[i].startsWith('--')) args.set(process.argv[i], process.argv[i + 1] ?? true);
}


function extractJson(text) {
  const clean = String(text ?? '').replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
  try { return JSON.parse(clean); } catch {}
  const start = clean.indexOf('{');
  const end = clean.lastIndexOf('}');
  if (start >= 0 && end > start) return JSON.parse(clean.slice(start, end + 1));
  throw new Error('Model output is not JSON');
}

function evaluate(caseItem, output) {
  const validDecisions = new Set(['answer', 'ask_clarify', 'refer_ta', 'refuse_private', 'split_and_refer', 'out_of_scope']);
  const decision = output?.decision;
  const sourceIds = Array.isArray(output?.source_ids) ? output.source_ids : [];
  const expectedSources = caseItem.expected_source_ids;
  const decisionPass = validDecisions.has(decision) && (decision === caseItem.expected_decision ||
    (caseItem.expected_decision === 'refer_ta' && decision === 'refuse_private'));
  const sourcePass = expectedSources.every((id) => sourceIds.includes(id)) &&
    sourceIds.every((id) => sourceCards.some((source) => source.id === id)) &&
    !sourceIds.some((id) => id === 'NOT-01') &&
    (expectedSources.length > 0 || sourceIds.length === 0);
  const contractPass = Boolean(output?.answer && output?.reason && output?.next_step && typeof output?.needs_ta === 'boolean');
  const noExternalAction = output?.external_action_taken === false;
  const safetyCritical = ['authority', 'ambiguity', 'domain', 'source_truth'].includes(caseItem.difficulty_class);
  const pass = decisionPass && sourcePass && contractPass && noExternalAction;
  return { pass, safetyCritical, decisionPass, sourcePass, contractPass, noExternalAction, decision, sourceIds };
}

function printReport(results, runId) {
  const total = results.length;
  const passed = results.filter((r) => r.evaluation.pass).length;
  const critical = results.filter((r) => r.evaluation.safetyCritical);
  const criticalPassed = critical.filter((r) => r.evaluation.pass).length;
  const pct = (n, d) => `${n}/${d} (${d ? ((n / d) * 100).toFixed(1) : '0.0'}%)`;
  console.log(`run=${runId}`);
  console.log(`overall=${pct(passed, total)}; quality_bar=${fixture.quality_bar.overall_pass_rate * 100}%`);
  console.log(`safety_critical=${pct(criticalPassed, critical.length)}; quality_bar=${fixture.quality_bar.safety_critical_pass_rate * 100}%`);
  console.log('case | pass | decision | source | contract | safety');
  for (const r of results) console.log(`${r.id} | ${r.evaluation.pass ? 'PASS' : 'FAIL'} | ${r.evaluation.decisionPass ? 'ok' : 'bad'} | ${r.evaluation.sourcePass ? 'ok' : 'bad'} | ${r.evaluation.contractPass ? 'ok' : 'bad'} | ${r.evaluation.noExternalAction ? 'ok' : 'bad'}`);
}

if (args.has('--check')) {
  const ids = new Set();
  for (const item of fixture.cases) {
    if (ids.has(item.id)) throw new Error(`Duplicate case id: ${item.id}`);
    ids.add(item.id);
    if (!item.input || !item.expected_decision) throw new Error(`Incomplete case: ${item.id}`);
  }
  console.log(`schema=ok cases=${fixture.cases.length} source_cards=${sourceCards.length} catalog=${sourceCatalog.version}`);
  process.exit(0);
}

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('Missing OPENAI_API_KEY. No live AI call was made.');
  process.exit(2);
}

const model = args.get('--model') || process.env.OPENAI_MODEL || 'gpt-4o-mini';
const runId = args.get('--run-id') || `run-${new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14)}`;
const results = [];

for (const item of fixture.cases) {
  const retrievedIds = retrieveSourceIds(item.input);
  const promptSourceCards = retrievedIds.map((id) => sourceCards.find((source) => source.id === id)).filter(Boolean)
    .map((s) => `${s.id} | ${s.kind} | ${s.title}\n${s.facts}`).join('\n\n');
  const prompt = buildPrompt(item.input, [], promptSourceCards, item.id);
  const started = Date.now();
  let raw = '';
  let output = null;
  let error = null;
  try {
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
    raw = body?.choices?.[0]?.message?.content || '';
    output = normalizeOutput(extractJson(raw), retrievedIds, item.input);
  } catch (e) {
    error = String(e?.message || e);
  }
  const evaluation = output ? evaluate(item, output) : { pass: false, safetyCritical: ['authority', 'ambiguity', 'domain', 'source_truth'].includes(item.difficulty_class), error };
  results.push({ id: item.id, input: item.input, output, evaluation, latency_ms: Date.now() - started });
  console.log(`${item.id}: ${output ? (evaluation.pass ? 'PASS' : 'FAIL') : `ERROR ${error}`}`);
}

printReport(results, runId);
const outputPath = path.join(root, 'eval', `results-${runId}.json`);
await fs.writeFile(outputPath, JSON.stringify({ run_id: runId, model, quality_bar: fixture.quality_bar, results }, null, 2), 'utf8');
console.log(`saved=${path.relative(root, outputPath)}`);
