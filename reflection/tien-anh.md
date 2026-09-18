# Reflection — Đinh Lệnh Tiến Anh

- **Mã học viên:** 2A202602928
- **Vai trò:** Nhóm trưởng · product lead — canvas và spec
- **Dự án:** Track B1 — Trợ lý Discord, lát cắt `daily standup` (K4-3B-E402-C2 · Team 5changlinhngulam)

## 1. Tôi đã làm gì

- Khởi tạo repo và khung bài nộp (`README.md`, `spec.md`, `TEAMMATES.md`), chốt bảng phân công 4 người và bảng ánh xạ CP1–CP5 → artifact trong repo.
- Viết **Canvas 7 dòng** ở `canvas.md`: chốt job executor (học viên khoá 4 đang onboarding), pain một câu, lát cắt MỘT CÂU và mức automation *conditional* (AI tự trả lời khi có nguồn chính thức, chuyển TA khi mơ hồ).
- Giữ vai chủ biên `spec.md` qua cả 5 checkpoint: §4b HAX/PAIR, §6 bốn đường đi + 2 nhánh chặn, quality bar, và **§9 Changelog** — mỗi lần đổi thiết kế đều ghi "đổi gì / vì sao".
- Chạy và rà các lượt test (`run test cases`), soát README trước mỗi mốc nộp.

## 2. Điều tôi thấy làm đúng

- **Chốt lát cắt nhỏ ngay từ CP1.** Nhóm có 3 ứng viên (standup / điểm danh / deadline) và tôi chọn `daily standup` vì có bằng chứng mạnh nhất: 60 tin từ 32 tác giả tag bot trong 3 ngày. Nhờ vậy 39 giờ không bị tiêu vào việc mở rộng phạm vi.
- **Quality bar khoá trước khi chạy live** (≥80% tổng thể, 100% safety-critical). Lượt 1 chỉ đạt 15/24 (62.5%) và 6/12 safety-critical — rất cám dỗ để hạ bar, nhưng nhóm giữ nguyên và đi sửa contract. Đến lượt `final-2-live` đạt 24/24 và 12/12 mà bar vẫn là bar cũ, nên con số đó mới có giá trị.
- **Changelog là thứ cứu nhóm khi pitch.** Mỗi quyết định đều có lý do viết sẵn, không phải nhớ lại lúc đứng trước giám khảo.

## 3. Điều khó và điều tôi làm chưa tốt

- **Willing user để trống quá lâu.** Dòng 6 của canvas và §8 của spec vẫn còn placeholder `[Họ tên 1 — mã học viên]`, và `validation/session-log.md` đến giờ vẫn là template với 5 dòng "chưa chạy". Hướng dẫn nói rõ "khai từ CP1, đừng để đến CP5" — tôi đọc mà vẫn để trễ, và đây là phần R6 mất điểm thật chứ không phải rủi ro giả định.
- **Spec bị viết song song với code** nên có lúc spec mô tả một đằng, `index.html` chạy một nẻo (ví dụ giai đoạn fixture-only trước khi chuyển sang gọi backend thật). Tôi phải chạy theo cập nhật thay vì spec dẫn đường.
- Là nhóm trưởng, tôi ôm cả viết spec lẫn review code nên có lúc thành nút cổ chai — anh em chờ tôi duyệt PR.

## 4. Bài học mang đi

1. **Đúng hạn phần "người" quan trọng không kém phần "máy".** Tuyển willing user là task có lead time dài nhất trong cả dự án, phải giao ngay ngày đầu như giao một feature.
2. **Bar đặt trước, số đo sau.** Một lần giữ bar khi kết quả xấu đáng giá hơn mười lần khoe con số đẹp.
3. Lần sau tôi sẽ tách vai: một người giữ spec, một người giữ merge — thay vì gộp cả hai vào nhóm trưởng.

## 5. Ghi nhận đồng đội

Triệu dựng nền bằng chứng để cả nhóm không phải tranh luận theo cảm tính; Minh giữ kỷ luật "chỉ nguồn chính thức" khiến bot dám nói *không biết*; Nam là người biến sơ đồ thành thứ bấm được và đo được.
