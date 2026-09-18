# First Fix 001 — Nhận diện câu hỏi “cách viết daily standup”

**Trạng thái:** Đã sửa và kiểm tra bằng API thật sau khi phase kết thúc  
**Ngày:** 18/09/2026  
**Loại:** Regression / retrieval miss  
**Không thay thế:** log validation và evidence trước đó được giữ nguyên.

## Lỗi quan sát được

Input người dùng:

> ví dụ cách viết daily standup?

Bot trả lời rằng không có thông tin về cách viết daily standup và không truy được nguồn.

## Nguyên nhân

Bộ retrieval chỉ nhận một số cụm như `viết gì`, `cách nộp`, `nộp ở đâu` nhưng chưa nhận diện các mẫu tự nhiên `cách viết` và `ví dụ cách viết`. Vì vậy lượt hỏi bị gửi tới model với `0 source card`, dẫn tới fallback an toàn.

## Bản sửa đầu tiên

Trong `eval/ai-contract.mjs`, mở rộng `isSubmissionHowQuestion()` để nhận:

- `cách viết`
- `ví dụ ... viết`
- các biến thể có `daily standup`

Nguồn được truy đúng là `SRC-01` — Sổ tay học viên — Daily Standup.

## Kiểm tra sau sửa

Command:

```powershell
node eval/serve-cp3.mjs --port 8788
node eval/run-first-fix-check.mjs http://localhost:8788
```

Kết quả API thật:

```text
case=first-fix-001 | PASS | status=200 | decision=answer | source=SRC-01
answer=Ví dụ cách viết daily standup có thể như sau:
- Yesterday: Hoàn thành việc A, B.
- Today: Tiếp tục việc C, chuẩn bị cho việc D.
- Blockers: Không có trở ngại nào.
next_step=Bạn có thể áp dụng ví dụ này để viết daily standup của mình.
```

**Kết luận:** First Fix 001 đạt. Bot đã trả lời có căn cứ và không thực hiện hành động bên ngoài.
