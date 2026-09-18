const baseUrl = process.argv[2] || 'http://localhost:8788';
const input = 'ví dụ cách viết daily standup?';
const response = await fetch(`${baseUrl}/api/chat`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ case_id: 'first-fix-001', input, history: [] })
});
const body = await response.json();
const output = body?.output;
const pass = response.status === 200 && output?.decision === 'answer' && output?.source_ids?.includes('SRC-01') && output?.external_action_taken === false;
console.log(`case=first-fix-001 | ${pass ? 'PASS' : 'FAIL'} | status=${response.status} | decision=${output?.decision || 'ERROR'} | source=${(output?.source_ids || []).join(',') || 'none'}`);
console.log(`answer=${output?.answer || 'ERROR'}`);
console.log(`next_step=${output?.next_step || 'ERROR'}`);
if (!pass) process.exitCode = 1;
