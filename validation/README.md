# CP5 validation — willing user

## Mục tiêu

Kiểm tra xem một người ngoài nhóm có tự tìm được cách nộp `daily standup` đúng hạn hay không. Đây là phiên dùng thử bằng người, không phải khảo sát mức độ yêu thích và không được biến thành buổi thuyết minh sản phẩm.

Chạy local backend bằng key trong `.env`, sau đó mở `http://localhost:8787/`. UI đã có sẵn:

- nhiệm vụ nói nguyên văn cho người thử;
- đồng hồ phiên 10 phút;
- nhắc người quan sát không dẫn dắt;
- form phản hồi sau phiên;
- nút tải JSON feedback ẩn danh tại máy local;
- AI thật `gpt-4o-mini` và history gần nhất qua local backend.

API key chỉ được backend đọc từ `.env`, không gửi vào browser. Câu hỏi được gửi tới OpenAI để bot trả lời thật; feedback JSON chỉ được tải cục bộ.

## Chuẩn bị

Theo rubric R6, nhóm cần **5 người ngoài nhóm**, trong đó **ít nhất 2 willing user đã khai từ CP1**. Dùng mã `WU-01`…`WU-05` trong log, chỉ ghi vai trò tổng quát nếu chưa có đồng ý ghi danh tính.

Trước mỗi phiên:

1. Đặt `OPENAI_API_KEY` trong `.env`, chạy `node eval/serve-cp3.mjs --port 8787`, rồi mở `http://localhost:8787/`.
2. Đọc lời mở đầu: “Tụi mình đang đánh giá sản phẩm, không đánh giá bạn. Không có câu trả lời đúng/sai; cứ nói to suy nghĩ.”
3. Bấm **Bắt đầu phiên** rồi giao đúng task trong khung CP5.
4. Để người thử tự cầm chuột. Không chỉ chip, không giải thích icon, không hỏi “bạn có thích không?”.
5. Nếu bị kẹt, chỉ dùng ba câu cứu hộ trung tính: “Cứ nói to suy nghĩ nhé” · “Bạn sẽ làm gì tiếp?” · “Bạn nghĩ nó nên hoạt động thế nào?”.
6. Kết thúc trong khoảng 10 phút, hỏi phần phản hồi trên UI, chỉ tải JSON khi người thử đồng ý lưu feedback ẩn danh.

## Task chuẩn hoá

Đọc nguyên văn:

> “Bạn hãy dùng giao diện này để tìm cách nộp daily standup đúng hạn. Khi thấy đã biết phải làm gì, hãy nói cho tôi biết bước tiếp theo.”

Sau khi người thử hoàn thành hoặc bị kẹt, hỏi nguyên văn:

- “Điều gì khó hiểu hoặc khó chịu nhất?”
- “Bạn có tin câu trả lời không — vì sao?”
- “Nếu từ mai không được dùng cái này nữa, bạn thấy rất tiếc, hơi tiếc hay không sao?”

## Dữ liệu cần giữ

Sau mỗi phiên, chuyển các trường trong file JSON vào [`session-log.md`](session-log.md). Giữ nguyên quote, kể cả lỗi chính tả. Không đưa tên thật, mã học viên, email hoặc nội dung cá nhân vào repo công khai nếu chưa có sự đồng ý phù hợp.

Không điền trước kết quả. Hiện trạng repo là **chưa có phiên validation thật**; chỉ ghi sau khi đã quan sát người dùng thật.

## Tổng hợp sau 5 phiên

Cuối bảng phải có đủ bốn dòng:

1. Chủ đề lặp nhiều nhất.
2. Một hoặc hai thay đổi làm trước demo.
3. Điều giữ nguyên và lý do.
4. Điều đưa vào backlog sau CP5.

Ít nhất một thay đổi đã làm phải được ghi vào `spec.md` §9 Changelog sau khi nhóm có bằng chứng thật; không ghi thay đổi giả trước khi test.
