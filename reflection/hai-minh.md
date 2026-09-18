# Reflection — Vũ Hải Minh

- **Mã học viên:** 2A202602452
- **Vai trò:** Thành viên — retrieval/prompt và quy tắc nguồn chính thức
- **Dự án:** Track B1 — Trợ lý Discord, lát cắt `daily standup` (K4-3B-E402-C2 · Team 5changlinhngulam)

## 1. Tôi đã làm gì

- Thiết kế **quy tắc nguồn**: bot chỉ được trả lời dựa trên source card chính thức (`SRC-01`, `SRC-02`, `SRC-03`), **cấm** lấy câu trả lời cũ do bot sinh (`NOT-01`) làm nguồn. Source card nằm ở `eval/golden-set.json` và được backend nạp trong `eval/serve-cp3.mjs`.
- Viết tầng retrieval + output contract trong `eval/ai-contract.mjs`: `retrieveSourceIds()`, JSON schema bắt buộc có `decision`, `reason`, `next_step`, `source_ids`, và cờ `external_action_taken=false`.
- Xử lý các lớp chỗ khó: hai mốc deadline lệch nhau → `ask_clarify` và **phải nêu đủ cả hai mốc**; câu hỏi dữ liệu cá nhân → `refuse_private`; tin chứa prompt injection đòi bot tag `[@role]` → chặn, coi tin nhắn là dữ liệu chứ không phải lệnh.
- Chuẩn bị `02-guide.md`, sao chép/chuẩn hoá data pack, và tham gia các vòng sửa CP3 → CP5 final audit.

## 2. Điều tôi thấy làm đúng

- **Chặn vòng lặp bot-đọc-bot.** Loại `NOT-01` khỏi nguồn hợp lệ là quyết định nhỏ về code nhưng lớn về sản phẩm: nó là lý do bot không nhân bản lỗi deadline cũ.
- **Ràng `source_ids` theo retrieval hiện tại.** Ở audit cuối tôi phát hiện model có thể tự "bịa" ID nguồn nghe rất thật; bản sửa chỉ giữ ID nào cũng nằm trong retrieval. Đây là khác biệt giữa *có trích nguồn* và *trích nguồn đúng*.
- **Chuẩn hoá nhánh hai deadline.** Trước đó model đôi khi đã chọn `ask_clarify` nhưng vẫn lỡ nói ra một mốc — đúng quyết định mà sai hành vi. Sửa ở mức prompt + hậu kiểm chứ không "dặn" model lịch sự.

## 3. Điều khó và điều tôi làm chưa tốt

- **Retrieval dựa trên pattern nên giòn.** Lỗi First Fix 001 là bằng chứng: câu "cách viết daily standup" *có* nguồn (`SRC-01`) nhưng rơi vào fallback "không có căn cứ" chỉ vì thiếu pattern. Người dùng phát hiện ra, không phải tôi. Sau đó phải mở thêm pattern cho "cách viết / cách điền / ví dụ / template / tối qua".
- **Lượt live đầu lộ ra tôi ràng contract chưa chặt:** 5 case (C05, C06, C13, C14, C22) chọn đúng `ask_clarify` nhưng trả `source_ids: []`, 3 case (C17, C19, C24) từ chối đúng nhưng bỏ trống `answer`/`next_step`. 9 case fail nhưng thực chất chỉ là **hai lỗ hổng** trong contract — tôi đã mô tả contract bằng lời mà không ép bằng schema.
- Tôi tối ưu prompt hơi lâu trước khi có runner đo; vài vòng chỉnh chỉ là cảm giác "câu trả lời nghe hay hơn".

## 4. Bài học mang đi

1. **Đừng dặn model, hãy ràng model.** Thứ gì bắt buộc thì đưa vào schema và hậu kiểm, đừng gửi gắm trong câu prompt.
2. **Gom fail theo nguyên nhân, đừng đếm theo case.** 9 fail nhìn như 9 vấn đề; nhìn kỹ là 2 — và sửa 2 thứ thì được 24/24.
3. **Fallback "không có nguồn" là một loại lỗi, không phải nơi an toàn.** Trả lời sai thì nhóm sợ, nhưng từ chối sai cũng làm người dùng mất niềm tin y hệt.

## 5. Ghi nhận đồng đội

Triệu đưa mã tin thật nên retrieval có cái để bám; Nam dựng runner biến mọi tranh cãi về prompt thành một con số; Tiến Anh không cho hạ quality bar lúc kết quả xấu, nhờ vậy tôi mới phải đi tìm nguyên nhân thật.
