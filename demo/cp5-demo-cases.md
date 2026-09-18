# Hai case đề xuất cho demo CP5/CP6

Hai case này khớp trực tiếp với hai chip đầu trong [`codebase/index.html`](../codebase/index.html). Khi demo, mở mục **Dành cho thuyết trình · mở sau phiên** để hiện badge `case chuẩn` và `case khó`; trong phiên willing user, để mục này đóng để không dẫn dắt người thử.

## Case chuẩn — nơi nộp và cú pháp

**Input nói trong demo:**

> “Mình nộp daily standup ở đâu thế, gõ lệnh gì?”

**Thao tác:** bấm chip **① Nộp daily standup ở đâu, gõ lệnh gì?**

**Kết quả cần chỉ cho giám khảo thấy:**

- nhãn **có căn cứ · 1 nguồn chính thức**;
- nguồn `SRC-01` có thể bấm để xem;
- câu trả lời chỉ dẫn ` /daily-standup` trong forum thread của team và ba trường `yesterday`, `today`, `blockers`;
- bước kế tiếp cụ thể: mở thread team rồi gõ lệnh.

**Vì sao chọn:** đây là đường happy path, cho thấy sản phẩm giải quyết job chính trong một lượt mà không cần giải thích dài.

## Case khó — hai deadline lệch nhau

**Input nói trong demo:**

> “Hôm qua mình gửi sớm thì không được, vậy deadline daily standup chính xác là khi nào?”

**Thao tác:** bấm chip **② Hạn nộp mấy giờ? Tối qua gửi thì báo hết hạn**. Khi bot hỏi thu hẹp, bấm **Mình cần được +XP**.

**Kết quả cần chỉ cho giám khảo thấy:**

- bot không tự chọn một deadline;
- hiện cả `SRC-02` (0h–10h để được +XP) và `SRC-03` (mô tả lệnh ghi “hết hôm nay” nhưng thiếu ngày cập nhật);
- quyết định đầu tiên là **hỏi lại một câu hai lựa chọn**;
- sau khi user chọn mục tiêu +XP, câu trả lời chốt mốc 10h, vẫn cảnh báo phần mâu thuẫn và đưa bước kế tiếp;
- nếu chọn mốc ghi nhận, bot phải giữ giới hạn và nháp tin hỏi TA thay vì đoán.

**Vì sao chọn:** đây là failure có cost-of-error cao nhất của lát cắt. Demo cho thấy bot biết nói “chưa chắc”, phân biệt hai mục đích và giữ quyền quyết định ở phía người/TA.

## Nhịp demo 90 giây

1. 0–10s: nói outcome “biết phải nộp ở đâu, khi nào, điền gì”.
2. 10–35s: chạy case chuẩn, mở `SRC-01` và chỉ bước kế tiếp.
3. 35–75s: chạy case khó, chỉ hai nguồn lệch và câu hỏi thu hẹp; chọn `+XP`.
4. 75–90s: chốt guardrail: không đoán deadline, không dùng `NOT-01`, không tự tag/gửi/đổi quy định.

**Case dự phòng nếu giám khảo muốn red-team:** chip ⑥ prompt injection. Đây là case dự phòng, không thay cho case khó chính vì hai deadline minh hoạ rõ hơn giá trị cổng tự tin.
