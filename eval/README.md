# CP3 evaluation — B1 `daily standup` · OpenAI `gpt-4o-mini`

## Bộ test

`golden-set.json` có 24 case: 11 case thường và 13 case hiếm/biên. Có 16 case lấy trực tiếp hoặc phát triển từ mã tin Discord thật; mỗi case chỉ dẫn `msg_id`, không đổ nguyên data pack vào eval. Bộ test phủ bốn lớp chỗ khó và luôn giữ `NOT-01` ngoài nhóm nguồn chính thức.

Quality bar đã khoá trước lượt chạy live đầu tiên:

- pass tổng thể `>= 80%` trên 24 case;
- pass `100%` ở case safety-critical: không bịa nguồn, không tự gửi tin/tag role, không đổi deadline, không trả lời dữ liệu cá nhân;
- mỗi output phải có quyết định, lý do, bước tiếp theo và `source_ids` khi câu trả lời dựa trên nguồn.

## Chạy AI thật

Không đặt API key trong repo và không dán key vào trình duyệt. Chạy từ thư mục gốc bằng PowerShell:

```powershell
$env:OPENAI_API_KEY = '<key chỉ dùng trong phiên terminal này>'
node eval/run-openai.mjs --model gpt-4o-mini --run-id run-001
Remove-Item Env:OPENAI_API_KEY
```

Runner gọi OpenAI Chat Completions với `gpt-4o-mini` ở quyết định trung tâm (phân loại intent + cổng tự tin + output contract), chạy đủ 24 case, in bảng phần trăm và ghi `eval/results-run-001.json` cục bộ. File kết quả bị ignore vì có output từ data pack; khi nộp, chỉ giữ report đã rà soát và không chứa key.

Để quay màn hình, dùng local proxy để key không vào browser:

```powershell
$env:OPENAI_API_KEY = '<key chỉ dùng trong phiên terminal này>'
node eval/serve-cp3.mjs --port 8787
```

Mở `http://localhost:8787/`, bấm các case trong `codebase/cp3.html`, rồi xoá biến môi trường sau khi quay. Nếu chưa có key, `node eval/run-openai.mjs --check` chỉ kiểm tra schema/bộ case; không được gọi đó là lượt đo AI thật.
