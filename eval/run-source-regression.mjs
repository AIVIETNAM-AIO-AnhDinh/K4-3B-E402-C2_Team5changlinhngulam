import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { retrieveSourceIds } from './ai-contract.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cases = JSON.parse(await fs.readFile(path.join(root, 'eval', 'source-regression.json'), 'utf8')).cases;
const endpoint = process.argv[2] || '';
let passed = 0;

for (const item of cases) {
  const retrieved = retrieveSourceIds(item.input);
  let output = null;
  let error = '';
  if (endpoint) {
    try {
      const response = await fetch(`${endpoint}/api/chat`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ input: item.input, case_id: item.id, history: [] })
      });
      const body = await response.json();
      output = body.output;
      if (!response.ok) error = body.error || `HTTP ${response.status}`;
    } catch (e) {
      error = String(e?.message || e);
    }
  }
  const expectedSources = JSON.stringify(item.expected_source_ids);
  const retrievalPass = JSON.stringify(retrieved) === expectedSources;
  const liveSourcePass = !endpoint || JSON.stringify(output?.source_ids || []) === expectedSources;
  const liveDecisionPass = !endpoint || output?.decision === item.expected_decision ||
    (item.expected_decision === 'refer_ta' && output?.decision === 'refuse_private');
  const pass = retrievalPass && liveSourcePass && liveDecisionPass && !error;
  if (pass) passed += 1;
  console.log(`${item.id} (${item.message_id}) | ${pass ? 'PASS' : 'FAIL'} | retrieval=${JSON.stringify(retrieved)} | decision=${output?.decision || 'not-run'} | source=${JSON.stringify(output?.source_ids || [])}${error ? ` | error=${error}` : ''}`);
}

console.log(`source_regression=${passed}/${cases.length} (${((passed / cases.length) * 100).toFixed(1)}%)${endpoint ? ' live' : ' retrieval-only'}`);
if (passed !== cases.length) process.exitCode = 1;
