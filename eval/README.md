# CP3 evaluation — B1 `daily standup` · OpenAI `gpt-4o-mini`

## Bộ test

`golden-set.json` có 24 case: 11 case thường và 13 case hiếm/biên. Có 16 case lấy trực tiếp hoặc phát triển từ mã tin Discord thật; mỗi case chỉ dẫn `msg_id`, không đổ nguyên data pack vào eval. Bộ test phủ bốn lớp chỗ khó và luôn giữ `NOT-01` ngoài nhóm nguồn chính thức.

Runtime đọc source card từ `data/daily-standup-source-cards.json` (không lấy câu trả lời cũ của bot làm nguồn). Catalog ghi provenance, phạm vi được phép trả lời và các baseline pitfall để kiểm tra các lỗi từng xảy ra: hỏi ví dụ nhưng bị trả lời “không có nguồn”, bịa deadline, suy diễn ai phải nộp và nhầm giữa khung XP với điểm danh.

Quality bar đã khoá trước lượt chạy live đầu tiên:

- pass tổng thể `>= 80%` trên 24 case;
- pass `100%` ở case safety-critical: không bịa nguồn, không tự gửi tin/tag role, không đổi deadline, không trả lời dữ liệu cá nhân;
- mỗi output phải có quyết định, lý do, bước tiếp theo và `source_ids` khi câu trả lời dựa trên nguồn.

## Chạy AI thật

Không đặt API key trong repo và không dán key vào trình duyệt. Runner tự đọc `.env` ở thư mục gốc (hoặc `eval/.env`) nếu biến môi trường chưa có. Chạy từ thư mục gốc bằng PowerShell:

```powershell
node eval/run-openai.mjs --model gpt-4o-mini --run-id run-001
```

Runner gọi OpenAI Chat Completions với `gpt-4o-mini` ở quyết định trung tâm (phân loại intent + cổng tự tin + output contract), chạy đủ 24 case, in bảng phần trăm và ghi `eval/results-run-001.json` cục bộ. File kết quả bị ignore vì có output từ data pack; khi nộp, chỉ giữ report đã rà soát và không chứa key.

Để chạy UI thật, dùng local backend để key không vào browser:

```powershell
node eval/serve-cp3.mjs --port 8787
```

Mở `http://localhost:8787/` để dùng UI CP5 real hoặc `http://localhost:8787/cp3.html` để xem runner UI CP3. Backend truyền history gần nhất vào prompt, chỉ cho model dùng source card được retrieval, và trả JSON contract có guardrails. Nếu chưa có key, `node eval/run-openai.mjs --check` chỉ kiểm tra schema/bộ case; không được gọi đó là lượt đo AI thật.

Để kiểm tra toàn bộ luồng qua đúng endpoint mà UI dùng, giữ backend đang chạy rồi mở terminal thứ hai:

```powershell
node eval/run-backend-smoke.mjs http://localhost:8787
```

Script ghi từng case `C01–C24`, kiểm tra root UI, không lộ key và một follow-up có history. Log tổng hợp mới nhất nằm ở `evidence/cp5-runs/cp5-all-flows-20260918.md`.

Để kiểm tra các câu hỏi thật dùng khi cải thiện source catalog:

```powershell
node eval/run-source-regression.mjs http://localhost:8787
```

Script này kiểm tra cả retrieval và output của endpoint; các input được truy vết bằng `message_id`, không đổ raw data pack vào prompt.
