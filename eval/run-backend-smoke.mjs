import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fixture = JSON.parse(await fs.readFile(path.join(root, 'eval', 'golden-set.json'), 'utf8'));
const baseUrl = process.argv[2] || 'http://localhost:8788';

function passFor(item, body) {
  const output = body?.output;
  const sourceIds = Array.isArray(output?.source_ids) ? output.source_ids : [];
  const expected = item.expected_source_ids;
  const decisionPass = output?.decision === item.expected_decision ||
    (item.expected_decision === 'refer_ta' && output?.decision === 'refuse_private');
  return Boolean(
    output &&
    decisionPass &&
    expected.every((id) => sourceIds.includes(id)) &&
    (expected.length > 0 || sourceIds.length === 0) &&
    output.answer && output.reason && output.next_step &&
    typeof output.needs_ta === 'boolean' &&
    output.external_action_taken === false
  );
}

const indexResponse = await fetch(`${baseUrl}/`);
const indexHtml = await indexResponse.text();
console.log(`GET / | ${indexResponse.status === 200 ? 'PASS' : 'FAIL'} | live=${indexHtml.includes('AI thật')} | key_exposed=${indexHtml.includes('OPENAI_API_KEY')}`);

const results = [];
for (const item of fixture.cases) {
  const response = await fetch(`${baseUrl}/api/chat`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ case_id: item.id, input: item.input, history: [] })
  });
  const body = await response.json();
  const pass = response.status === 200 && passFor(item, body);
  results.push({ id: item.id, pass, status: response.status, decision: body?.output?.decision, source_ids: body?.output?.source_ids || [], history_turns: body?.history_turns ?? null });
  console.log(`${item.id}: ${pass ? 'PASS' : 'FAIL'} | decision=${body?.output?.decision || 'ERROR'} | source=${(body?.output?.source_ids || []).join(',') || 'none'}`);
}

const historyResponse = await fetch(`${baseUrl}/api/chat`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({
    case_id: 'H01',
    input: 'Ở đâu vậy?',
    history: [
      { role: 'user', content: 'Tôi muốn nộp daily standup' },
      { role: 'assistant', content: 'Bạn chuẩn bị nộp daily standup.' }
    ]
  })
});
const historyBody = await historyResponse.json();
const historyPass = historyResponse.status === 200 && historyBody?.history_turns === 2 && historyBody?.output?.source_ids?.includes('SRC-01');
console.log(`H01 history follow-up: ${historyPass ? 'PASS' : 'FAIL'} | history_turns=${historyBody?.history_turns ?? 'ERROR'} | source=${(historyBody?.output?.source_ids || []).join(',') || 'none'}`);

const naturalCases = [
  'Tôi muốn nộp daily standup',
  'Làm sao để nộp daily standup?',
  'Cách nộp daily standup',
  'Hướng dẫn nộp daily standup'
];
const naturalResults = [];
for (const input of naturalCases) {
  const response = await fetch(`${baseUrl}/api/chat`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ case_id: 'natural-submission', input, history: [] })
  });
  const body = await response.json();
  const pass = response.status === 200 && body?.output?.decision === 'answer' && body?.output?.source_ids?.includes('SRC-01');
  naturalResults.push(pass);
  console.log(`NATURAL ${pass ? 'PASS' : 'FAIL'} | ${input} | decision=${body?.output?.decision || 'ERROR'} | source=${(body?.output?.source_ids || []).join(',') || 'none'}`);
}
const naturalPass = naturalResults.every(Boolean);

const passed = results.filter((result) => result.pass).length;
console.log(`backend_overall=${passed}/${results.length} (${((passed / results.length) * 100).toFixed(1)}%); history=${historyPass ? 'PASS' : 'FAIL'}; natural_submission=${naturalPass ? 'PASS' : 'FAIL'}`);
if (passed !== results.length || !historyPass || !naturalPass || indexResponse.status !== 200 || indexHtml.includes('OPENAI_API_KEY')) process.exitCode = 1;
