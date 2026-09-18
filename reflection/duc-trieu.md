# Reflection — Nguyễn Đức Triệu

- **Mã học viên:** 2A202602978
- **Vai trò:** Thành viên — mining/evidence và log khảo sát
- **Dự án:** Track B1 — Trợ lý Discord, lát cắt `daily standup` (K4-3B-E402-C2 · Team 5changlinhngulam)

## 1. Tôi đã làm gì

- Khai thác `data/discord-pack/` (1.092 tin, 779 tin người + 313 tin bot, 12–14/09, đã ẩn danh) để tìm bằng chứng pain: lọc `is_bot=False`, `mentions_bot=True`, nội dung chứa `daily`/`standup` → **60 tin từ 32 tác giả**. Cùng phương pháp cho hai ứng viên còn lại: `điểm danh` → 13 tin/12 tác giả, `deadline|hạn|nộp` → 49 tin/31 tác giả.
- Viết `evidence/cp1-evidence-log.md`: ghi rõ phương pháp lọc, mã tin, và log khảo sát (10/10 người nói đã lên Discord tìm hỗ trợ trong 7 ngày gần đây; 3/8 câu trả lời hợp lệ mất từ 30 phút trở lên).
- Đưa `spec.md`, `TEAMMATES.md`, `README.md` vào repo ở giai đoạn đầu; dọn và tổ chức lại thư mục `codebase/` (xoá `prototype/` trùng lặp, gom luồng) để cấu trúc repo khớp với bảng bài nộp.
- Giữ vai review/merge PR của các nhánh `Anh`, `nam`, `Trieu`.

## 2. Điều tôi thấy làm đúng

- **Con số có phương pháp tái lập được.** Mỗi con số trong canvas đều đi kèm điều kiện lọc, nên khi giám khảo hỏi "60 tin ở đâu ra" thì có câu trả lời chạy lại được chứ không phải ước lượng.
- **Đo cả ứng viên bị loại.** Việc mining cả `điểm danh` và `deadline` giúp nhóm loại `điểm danh` có lý do (dính dữ liệu cá nhân, bot không có thẩm quyền) thay vì loại theo cảm giác — phần này về sau thành hẳn một lớp case *authority* trong golden set.
- Dọn repo sớm: đến CP4–CP5 khi phải thêm `eval/`, `validation/`, `evidence/cp5-runs/` thì không phải tái cấu trúc giữa lúc gấp.

## 3. Điều khó và điều tôi làm chưa tốt

- **Khảo sát mỏng và lệch.** 10 phản hồi, trong đó chỉ 8 có thời lượng hợp lệ — cỡ mẫu này đủ để nói "pain có tồn tại" nhưng không đủ để nói "pain nghiêm trọng đến mức nào". Tôi đã có lúc định diễn giải mạnh hơn số liệu cho phép, và may là nhóm kéo lại.
- **Data pack chỉ có 3 ngày, đúng tuần onboarding** nên câu hỏi lệch hẳn về hành chính. Đề bài có nói "vẫn phải quan sát Discord trực tiếp để có evidence mới" — phần quan sát trực tiếp này tôi làm chưa đủ, evidence gần như chỉ dựa vào pack.
- Phần **log khảo sát người thật ở CP5** (`validation/session-log.md`) đến cuối vẫn là template. Đây là việc thuộc mảng của tôi và tôi đã không đẩy nó sớm.

## 4. Bài học mang đi

1. **Bằng chứng phải nêu cả giới hạn của chính nó.** Câu "3 ngày, tuần onboarding, không đại diện cả khoá" làm bằng chứng đáng tin hơn chứ không yếu đi.
2. **Data có sẵn là điểm bắt đầu, không phải điểm kết thúc.** Lần sau tôi sẽ dành cố định 1 giờ đi quan sát/ hỏi trực tiếp trước khi mở file CSV.
3. Đi tìm người khảo sát là việc phải chạy **song song** với build, không phải sau build.

## 5. Ghi nhận đồng đội

Tiến Anh giữ cho lát cắt không phình ra; Minh biến "nguồn chính thức" từ một câu khẩu hiệu thành quy tắc kiểm tra được; Nam dựng runner nên các case tôi moi từ chatlog mới có chỗ để được chấm tự động.
