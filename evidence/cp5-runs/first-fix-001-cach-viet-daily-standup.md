# First Fix 001 — Evidence bổ sung

> File mới cho lượt kiểm tra sau phase; không ghi đè hoặc xoá evidence cũ.

- **Case:** `ví dụ cách viết daily standup?`
- **Before:** retrieval `0 source card`, bot fallback “không có thông tin”.
- **Fix:** bổ sung pattern `cách viết` và `ví dụ ... viết` vào retrieval.
- **Live result:** `PASS`
- **HTTP:** `200`
- **Decision:** `answer`
- **Source:** `SRC-01`
- **External action:** `false`
- **Command:** `node eval/run-first-fix-check.mjs http://localhost:8788`
