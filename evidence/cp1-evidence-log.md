# CP1 Evidence Log — Track B1

## Phạm vi và nguồn

- **Khảo sát:** Google Sheets do nhóm cung cấp: [bảng thống kê](https://docs.google.com/spreadsheets/d/1dUxgij4dCj1WTz1ZTo70sTGYZ6hEjEeAoGBdoX_CbVo/edit?usp=sharing). Bản đọc ngày **17/09/2026**, có **10 phản hồi**. Vì form không thu tên/email, mã `R01`–`R10` chỉ là mã nội bộ theo thứ tự dòng; không dùng để suy đoán danh tính.
- **Mining:** `K4-3B-Day05-06-AI-Product-Hackathon/data/discord-pack/k4_messages.csv`, cùng `DATA_DICTIONARY.md` và `k4_daily_reports.md`.
- Dữ liệu Discord chỉ là 3 ngày onboarding, chỉ kênh public và đã ẩn danh. Các con số dưới đây là evidence cho lát cắt B1, không đại diện cho toàn bộ khoá.

## Phương pháp đếm có thể kiểm lại

### A. Khảo sát

Đếm theo 10 dòng phản hồi trong Google Sheets:

1. Câu 1: đếm lựa chọn “Có”.
2. Câu 4: nhóm theo đúng lựa chọn người trả lời.
3. Câu 5: bỏ “Không áp dụng”, sau đó nhóm thời lượng thành `≤5 phút`, `30 phút`, `≥2 giờ`.
4. Câu 7: đếm ba lựa chọn sẵn sàng.

Kết quả khảo sát hiện **chưa đủ chuẩn A** vì mới có `n=10`, dưới ngưỡng 20 người. Nhóm dùng khảo sát như bằng chứng định hướng và dùng mining Discord làm evidence chuẩn B.

### B. Mining Discord

Đếm bằng các điều kiện sau trên `k4_messages.csv`:

```text
total = 1.092 tin
human = is_bot == False → 779 tin
bot-tagged human = is_bot == False AND mentions_bot == True → 307 tin
daily-standup slice = bot-tagged human AND content chứa "daily" hoặc "standup" → 60 tin, 32 tác giả
```

Pattern `daily|standup` không phân biệt hoa thường. Các nhóm “điểm danh” và “deadline|hạn|nộp” được dùng để so sánh impact, không cộng chồng với nhóm `daily|standup`.

Kết quả kiểm tra đối chiếu:

- `daily|standup`: **60 tin, 32 tác giả**.
- `điểm danh`: **13 tin, 12 tác giả** được tag bot.
- `deadline|hạn|nộp`: **49 tin, 31 tác giả** được tag bot.
- `k4_daily_reports.md`: **7** mục chứa “chưa xác nhận đã xử lý”; **3** mục chứa “phản hồi tự động chưa phải hướng dẫn chính thức”.

## Tóm tắt kết quả khảo sát

| Chỉ số | Kết quả | Diễn giải |
|---|---:|---|
| Từng lên Discord tìm câu trả lời/hỗ trợ trong 7 ngày | **10/10 (100%)** | Có tín hiệu nhu cầu, nhưng `n=10` chưa đạt chuẩn A. |
| Tần suất 1 lần | **6/10** | Hành vi xảy ra với toàn bộ người trả lời. |
| Tần suất 2–3 lần | **4/10** | Có nhóm gặp lại nhu cầu trong cùng 7 ngày. |
| Thời lượng hợp lệ `≤5 phút` | **5/8** | Hai người trả lời “Không áp dụng”. |
| Thời lượng hợp lệ `≥30 phút` | **3/8** | Gồm hai câu trả lời 30 phút và một câu trả lời 2 giờ. |
| Sẵn sàng ngay | **2/10** | Có thể dùng làm willing users sau khi đối chiếu tên/mã học viên. |
| Có thể tham gia, cần biết thêm | **4/10** | Có thể mời dự phòng sau khi giải thích phiên test. |
| Chưa sẵn sàng | **4/10** | Không dùng làm willing user. |

## 5 ví dụ nguyên văn từ Discord

Các ví dụ dưới đây đều là tin đã ẩn danh trong data pack; dẫn mã tin thay vì đưa nguyên file dữ liệu vào repo.

1. `M35505`: “[@BOT] giới thiệu tôi về daily standup”
2. `M57734`: “quy cách nộp daily standup, cả nhóm có phải nộp ko? hình thức nộp như nào, viết ra sao, có mẫu ko? Nộp vào đâu?”
3. `M65205`: “nộp ở đâu cơ, phần này mình đánh lệnh /daily-standup rồi mà ko được”
4. `M07653`: “[@BOT] hạn nộp daily stand up”
5. `M98666`: “thời gian mở daily standup và kết thúc là khi nào vậy? hôm qua mình gửi sớm daily standup thì không được, chiều nay quá deadline thì nó lại blocked mình.”

Các ví dụ cho thấy người dùng không chỉ cần nội dung khái niệm; họ cần quyết định thao tác cụ thể, đúng kênh và đúng thời hạn. `M98666` cho thấy sai/thiếu thông tin có thể làm người dùng bị blocked.

## Log đầy đủ 10 phản hồi khảo sát

Các câu trả lời dưới đây được chép theo nội dung xuất từ bảng; ô trống được ghi là `—`. Mã phản hồi không phải mã danh tính.

### R01

- C1: Có
- C2: buổi tối
- C3: không áp dụng
- C4: 2–3 lần
- C5: 2h
- C6: Mình cần tóm tắt các thông báo
- C7: Có thể, tôi muốn biết thêm trước
- Liên hệ tùy chọn: —

### R02

- C1: Có
- C2: 1 tuần, được trả lời câu hỏi
- C3: Không áp dụng
- C4: 1 lần
- C5: Không áp dụng
- C6: Không áp dụng
- C7: Chưa sẵn sàng
- Liên hệ tùy chọn: —

### R03

- C1: Có
- C2: thứ 2, hỏi về cách dùng câu lệnh của trợ lý cute
- C3: Tag trợ lý và hỏi, sau đó nhận được câu trả lời
- C4: 2–3 lần
- C5: 2-3 phút
- C6: thời gian tìm thông tin rất nhanh, trợ lý có thêm perm để lấy thêm thông tin
- C7: Chưa sẵn sàng
- Liên hệ tùy chọn: —

### R04

- C1: Có
- C2: 2 ngày trước, tìm cách nộp gate 1
- C3: Tra các câu mọi người đã hỏi và xem câu trả lời
- C4: 2–3 lần
- C5: 30 phút
- C6: Đọc câu hỏi của người khác sẽ có thêm thông tin ngoài thông tin đang tìm, không muốn đổi gì
- C7: Có thể, tôi muốn biết thêm trước
- Liên hệ tùy chọn: —

### R05

- C1: Có
- C2: Hôm đầu tiên nhập học - cần thời gian địa điểm tập trung
- C3: Tự tìm đúng kênh để biết thông báo
- C4: 1 lần
- C5: 5p
- C6: Thông tin quan trọng được gather 1 chỗ
- C7: Có thể, tôi muốn biết thêm trước
- Liên hệ tùy chọn: —

### R06

- C1: Có
- C2: Hqua, tìm về thông tin làm demo
- C3: Hỏi discord bot và tìm dc
- C4: 1 lần
- C5: 5p
- C6: Hong bít
- C7: Chưa sẵn sàng
- Liên hệ tùy chọn: —

### R07

- C1: Có
- C2: Hôm qua, muốn có kết quả ngay.
- C3: Không áp dụng
- C4: 1 lần
- C5: 30p
- C6: Không áp dụng
- C7: Có thể, tôi muốn biết thêm trước
- Liên hệ tùy chọn: —

### R08

- C1: Có
- C2: Hỏi về việc có đổi đề tài dc ko. Kết quả cần đạt: có hay ko
- C3: Tạo thread ở phần đặt câu hỏi
- C4: 1 lần
- C5: 5phút. K ảnh hưởng
- C6: Ko áp dụng
- C7: Chưa sẵn sàng
- Liên hệ tùy chọn: —

### R09

- C1: Có
- C2: không áp dụng
- C3: Không áp dụng
- C4: 1 lần
- C5: Không áp dụng
- C6: Không áp dụng
- C7: Có, hãy liên hệ tôi
- Liên hệ tùy chọn: Có

### R10

- C1: Có
- C2: Sáng nay
- C3: Đọc lại tin nhắn cũ, tìm lại tài liệu, hỏi lại thông tin
- C4: 2–3 lần
- C5: Khoảng 5’
- C6: Điều tiết câu hỏi đến đúng bên và có gợi ý trả lời sẵn
- C7: Có, hãy liên hệ tôi
- Liên hệ tùy chọn: —

## Kết luận CP1

Nhóm chọn B1 vì nhu cầu lớn nhất trong data hiện có là câu hỏi logistics lặp lại và cần câu trả lời có căn cứ. `daily standup` là lát cắt nhỏ đủ để demo trong thời gian hackathon: có 60 tin từ 32 tác giả, nhiều biến thể cùng hỏi về khái niệm/cú pháp/nơi nộp/hạn nộp, và có failure rõ ràng khi việc nộp bị blocked. Nhóm chưa kết luận rằng bot hiện trả lời sai ở mọi case; CP2–CP4 sẽ xây golden set để kiểm tra đúng nguồn, đúng intent và hành vi chuyển TA khi không chắc.

