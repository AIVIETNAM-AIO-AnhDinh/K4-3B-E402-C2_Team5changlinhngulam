# Mức Prototype: Mock vs Thật (CP2 vs CP3)

> **Trợ lý Discord — lát cắt `daily standup`**  
> CP2 · Luồng hoạt động | Mức prototype: MOCK  
> Nhóm `K4-3B-E402-C2_Team5changlinhngulam` · Track B1

Theo guide §3.2: **Mock = flow bấm được, data giả, AI thật ở lõi**.  
Tại CP2 nhóm nộp phần *"flow bấm được + data giả"*; lời gọi AI thật vào **cổng tự tin** là việc của CP3 (hạn 16:00 18/9). Bảng này là phần tự khai — khai thiếu không bị trừ, giấu mới bị.

---

## ⚖️ Bảng Phân Định Mức Độ Giả Lập & Sản Phẩm Thật

| Thành phần | Mức CP2 | Đang chạy giả lập thế nào | CP3 sẽ thay bằng gì |
| :--- | :---: | :--- | :--- |
| **Giao diện Discord** | `MOCK` | HTML/CSS tĩnh dựng lại khung kênh, tin nhắn, avatar. Không nối vào Discord. | Giữ nguyên bản mock cho demo; bot thật chạy trong server test của nhóm nếu kịp. |
| **① Phân loại intent** | `MOCK` | Mỗi chip kịch bản gắn cứng một intent. Gõ tự do thì khớp từ khoá thô, không khớp thì nói thẳng là ngoài 6 kịch bản. | Một lời gọi LLM phân 5 nhãn intent, có log input/output lưu trong `eval/`. |
| **② Truy nguồn chính thức** | `MOCK` | Sổ nguồn cứng 4 mục fixture, trích từ tin thật trong data pack (mã tin ghi kèm). Việc "tìm" là tra bảng ánh xạ sẵn. | Retrieval trên tập thông báo chính thức đã gom; nguồn bot-sinh bị loại bằng luật `is_bot`. |
| **③ Cổng tự tin** *(Lõi của CP3)* | `MOCK` | Kết quả gate viết sẵn theo từng kịch bản để nhìn được cả 4 đường trong 2 phút demo. | **Lời gọi AI thật**: cho model nguồn đã truy + câu hỏi, bắt trả JSON `{đủ căn cứ \| mâu thuẫn \| không có}` kèm lý do; đây là quyết định AI trung tâm của lát cắt. |
| **④ Sinh câu trả lời** | `MOCK` | Văn bản viết sẵn — cố tình giữ đúng khuôn: ≤3 dòng, có nguồn, có bước kế tiếp. | LLM sinh theo khuôn trên, chỉ được dùng nội dung nguồn đã truy; vi phạm khuôn tính là fail trong golden set. |
| **Chuyển TA / ticket** | `MOCK` | Bấm "Gửi cho TA" chỉ hiện dòng xác nhận + mã ticket giả. | Ghi vào hàng đợi (file/sheet) để TA xem; vẫn giữ luật người bấm gửi. |
| **Feedback 👍👎 + log** | `MOCK` | Lưu trong bộ nhớ trang, mất khi tải lại. | Ghi ra file log để đổ vào `eval/` làm case mới cho golden set. |
| **Dữ liệu người thật** | `KHÔNG DÙNG` | Không có nội dung cá nhân trong trang. Chỉ dẫn mã tin (`M#####`) và trích tối đa 2 câu theo luật data pack. | Giữ nguyên luật này ở mọi mốc sau. |

---

## 🔍 Chỗ Hổng Bản Mẫu Này Đã Lộ Ra (Giá Trị Của CP2)

| Phát hiện khi dựng luồng | Cách xử lý |
| :--- | :--- |
| **1.** Câu trả lời cũ của chính bot đang được học viên coi như nguồn chính thức (*"mỗi người tự nộp"* chỉ có trong tin bot). | Thêm bước loại nguồn bot-sinh vào ②, và hiện nguồn bị loại có gạch ngang để học viên thấy vì sao bot không dám khẳng định. |
| **2.** "Hạn nộp" thực ra là **hai mốc**: hạn được +XP (10h) và hạn còn được ghi nhận (hết ngày). Trả lời một mốc là sai một nửa dù trích đúng nguồn. | Đường 2 bắt buộc nêu cả hai mốc kèm ngày rồi mới hỏi lại; golden set sẽ có ≥2 case dạng này. |
| **3.** Nếu bot được phép tự tag TA thì tin nhắn của học viên có thể điều khiển bot spam `[@role]`. | Mọi tin chuyển TA đổi thành nháp, người bấm gửi. |
| **4.** 👎 không có lý do thì không dùng lại được. | 4 lý do ăn khớp 4 lớp lỗi ở spec §5, feedback đổ thẳng vào golden set. |

