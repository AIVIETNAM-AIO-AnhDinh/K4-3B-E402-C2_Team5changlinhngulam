# Nguyên Tắc HAX/PAIR Đã Chọn

> **Trợ lý Discord — lát cắt `daily standup`**  
> CP2 · Luồng hoạt động | Mức prototype: MOCK  
> Nhóm `K4-3B-E402-C2_Team5changlinhngulam` · Track B1

Bốn nguyên tắc bắt buộc là **G1, G2, G10, G11**; nhóm khai thêm **G9, G15** vì đường sửa là phần quan trọng nhất khi demo trải nghiệm người dùng.

---

## 📑 Bảng Chi Tiết Áp Dụng Nguyên Tắc HAX / PAIR

| Nguyên tắc | Nội dung nguyên tắc | Vị trí áp dụng cụ thể trong bản mẫu | Vì sao chọn cho lát cắt này |
| :--- | :--- | :--- | :--- |
| **G1**<br>Làm rõ hệ thống làm được gì | Câu đầu tiên user thấy phải nêu đúng phạm vi. | Banner xanh ngay dưới tên kênh `#hỏi-trợ-lý`, hai dòng: trả lời logistics từ sổ tay + thông báo ghim; **không** tra dữ liệu cá nhân, **không** trả lời bài học. Pin **G1**. | Bot hiện chào bằng cả đoạn dài rồi vẫn nhận câu hỏi ngoài khả năng. Khai phạm vi trước thì câu hỏi "điểm danh của tôi" không còn là bất ngờ. |
| **G2**<br>Làm rõ nó làm tốt đến đâu | User biết khi nào nên tin, khi nào nên kiểm lại. | (a) Dòng giới hạn trong banner;<br>(b) **Nhãn độ tin** trên từng câu trả lời: *"có căn cứ · 1 nguồn"* / *"chưa chắc · 2 nguồn lệch nhau"* / *"không có căn cứ"*. Pin **G2**. | Kỳ vọng đặt thấp hơn khả năng một chút (PAIR Mental Models). Học viên biết câu nào cầm đi nộp được, câu nào phải hỏi lại. |
| **G10**<br>Thu hẹp phạm vi khi nghi ngờ | Không chắc → hỏi lại một câu hoặc trả lời kèm giới hạn, không làm liều. | **Đường 2**: khi `SRC-02` và `SRC-03` lệch nhau, bot hiện cả hai mốc kèm ngày và hỏi **đúng một câu** hai lựa chọn — không tự chọn mốc nào.<br>**Đường 3**: 0 nguồn thì dừng, không suy diễn. Pin **G10**. | Đây là cost-of-error cao nhất của lát cắt: đoán sai hạn thì học viên bị blocked hoặc mất XP. Đoán một lần sai đắt hơn hỏi lại một câu. |
| **G11**<br>Giải thích vì sao | Giải thích gắn với hành động tiếp theo. | Mỗi câu trả lời logistics có hàng **Nguồn:** bấm vào mở ngăn kéo hiện nguyên văn, ngày, mã tin. Nguồn bị loại hiện gạch ngang (ví dụ câu trả lời cũ của chính bot). Cột **Hộp máy** hiện 4 bước quyết định. Pin **G11**. | Tin đúng mức > tin tối đa. Học viên tự kiểm được thay vì phải tin lời bot. |
| **G9**<br>Sửa dễ dàng | User sửa/hỏi lại ngay trên output. | Nút **"Sửa câu hỏi"** dưới mọi câu trả lời: đưa nguyên văn câu cũ trở lại ô nhập, con trỏ sẵn sàng — không phải gõ lại. Pin **G9**. | Nhiều tin trong pack là hỏi lại lần hai lần ba vì bot hiểu sai câu đầu (`M94107` → `M24218`). Sửa rẻ thì học viên không bỏ cuộc sang hỏi TA ngay. |
| **G15**<br>Mời feedback chi tiết | 👍👎 kèm "sai chỗ nào?". | 👎 mở 4 lý do cụ thể (sai hạn · sai nơi nộp · dài quá · không đúng câu mình hỏi). Chọn xong: câu trả lời **bị gỡ nhãn "có căn cứ"** ngay trên màn, vào hàng đợi TA, ghi 1 dòng vào log eval. Pin **G15**. | 👎 trống không dùng được để sửa prompt. Bốn lý do này chính là bốn lớp lỗi của §5 spec, nên feedback đổ thẳng vào golden set. |
| **G8**<br>Gạt bỏ dễ dàng | Bỏ qua gợi ý của AI không bị chặn flow. | Nút **"Hỏi TA luôn"** có mặt ở mọi câu trả lời, kể cả câu happy path; học viên không phải trả lời bot xong mới được chuyển người. | Bot không được đứng chắn giữa học viên và TA khi hạn nộp đang đến gần. |
| **PAIR**<br>Feedback + Control | Người giữ quyền với hành động có hậu quả. | Tin chuyển TA luôn ở dạng **nháp có nút "Gửi cho TA"**. Bot soạn, người bấm. Bot không tự tag `[@role]` trong bản mẫu, kể cả khi tin nhắn của user yêu cầu. | Luật an toàn của track: không tự động gửi tin cho người khác khi chưa có người duyệt; chống prompt injection bằng thiết kế, không bằng lời hứa. |
| **PAIR**<br>Errors + Graceful failure | Lỗi-do-giới-hạn ≠ lỗi-do-hiểu-nhầm — mỗi loại một đường lui. | Hai lời từ chối khác nhau: *"không có nguồn chính thức"* (đường 3, lối lui = nhờ TA) và *"không có quyền xem dữ liệu cá nhân"* (nhánh chặn, lối lui = `/ticket create`). | Gộp hai loại lỗi vào một câu "mình không biết" làm học viên đi sai cửa và mất thêm một vòng. |

---

📌 *Ghi chú: Khi mở file `index.html`, bật công tắc **"Hiện pin nguyên tắc"** ở góc phải thanh tiêu đề để thấy từng Pin màu tím ứng với các nguyên tắc trên.*

