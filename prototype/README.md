# Bản mẫu CP2 — Trợ lý Discord · lát cắt `daily standup`

Nhóm **K4-3B-E402-C2_Team5changlinhngulam** · Track **B1 — Tối ưu trợ lý hiện có**

## Mở thế nào

Mở `prototype/index.html` bằng trình duyệt (double-click là được). Trang tĩnh HTML/CSS/JS
thuần, **không cần server, không cần cài gì, không gọi mạng, không có khoá API**.

Nếu nộp qua link: bật GitHub Pages cho repo → `https://<user>.github.io/<repo>/prototype/`.

## Trong này có gì

| Tab | Nội dung |
|---|---|
| **Bản mẫu bấm được** | Khung Discord mô phỏng. Bấm 1 trong 6 câu hỏi → đi hết một lượt. Cột phải (**Hộp máy**) cho thấy bot quyết định qua 4 bước, kèm nhãn phần nào là mock. |
| **Sơ đồ luồng** | Sơ đồ từ tin nhắn đến điểm kết thúc, 4 đường đi được tô màu riêng. |
| **4 đường đi** | Bảng: kịch bản (kèm mã tin thật trong data pack) · hệ thống làm gì · kết thúc ở đâu · nguyên tắc áp. |
| **Nguyên tắc HAX/PAIR** | Bảng 9 nguyên tắc kèm **vị trí áp dụng cụ thể**. Bật *“Hiện pin nguyên tắc”* ở thanh trên rồi quay lại tab Bản mẫu để thấy pin tím nằm đúng chỗ. |
| **Mock vs thật** | Tự khai phần nào chạy giả lập ở CP2, phần nào thay bằng AI thật ở CP3 + các chỗ hổng bản mẫu đã lộ ra. |

## Đi hết 4 đường đi trong 2 phút demo

1. Chip ① → **happy path**: có nguồn, trả lời 3 dòng + trích nguồn + bước kế.
2. Chip ② → **low-confidence**: hai mốc giờ lệch nhau, bot hỏi lại đúng một câu; chọn
   *“Mình cần được +XP”* để xem vòng thứ hai đóng lại.
3. Chip ③ → **failure / không căn cứ**: 0 nguồn chính thức, bot từ chối đoán và soạn
   nháp tin cho TA — bấm **Gửi cho TA** để thấy luồng đóng.
4. Trên bất kỳ câu trả lời nào → **👎 Sai chỗ nào?** → chọn lý do: câu trả lời bị gỡ
   nhãn *“có căn cứ”* ngay trên màn hình. Đó là **đường correction**.
5. Chip ④ ⑤ ⑥ là ba hard test: câu hỏi cá nhân ngoài thẩm quyền · câu hỏi gộp
   (bài học + logistics) · tin nhắn chứa prompt injection đòi bot tag `[@role]`.

## Dữ liệu

Sổ nguồn trong bản mẫu là **fixture 4 tài liệu** nhóm dựng lại từ tin nhắn thật đã ẩn danh
trong `discord-pack`, dẫn theo **mã tin** (`M#####`) và trích tối đa 2 câu — đúng luật dùng
data pack. Không có tên người, không có nội dung cá nhân trong trang.

Mã tin gốc dùng để dựng kịch bản: M65205, M02304 (nơi nộp) · M82163, M80778, M98666 (hai mốc
hạn) · M77407, M30120, M58536 (ai phải nộp) · M20587 (field blocker) · M92424, M17171 (câu
trả lời cũ của bot — bị loại khỏi sổ nguồn) · M76498, M78917, M49744 (nguồn chính thức).

## Liên hệ với `spec.md`

- Mức prototype, bảng mock/thật, bảng nguyên tắc HAX/PAIR → **spec §4**
- Bốn đường đi chi tiết → **spec §6**
