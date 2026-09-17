# AI SPEC — B1 Trợ lý Discord cho `daily standup` · Nhóm K4-3B-E402-C2_Team5changlinhngulam · Zone C2

Hướng: [ ] A — VLearn  **[x] B — Trợ lý Học viên**  [ ] C — Làn mở  
Loại: **[x] Tối ưu tính năng có sẵn**  [ ] Tính năng mới

> Bản CP1. Các mục thiết kế, lỗi và eval sẽ được hoàn thiện và chốt tại CP4. Bằng chứng chi tiết nằm ở `evidence/cp1-evidence-log.md`.

## §1. User & Job

- **Job executor + workflow:** Một học viên khoá 4 trong giai đoạn onboarding/build phase, đang ở Discord và chuẩn bị thực hiện hoặc nộp `daily standup`. Học viên cần tìm quy định hiện hành, xác định đúng nơi/cú pháp/thời hạn, rồi hoàn thành việc nộp.
- **Core JTBD:** Khi chuẩn bị nộp báo cáo `daily standup`, tôi muốn biết chính xác mình phải nộp ở đâu, khi nào và điền gì để hoàn thành đúng hạn mà không phải dò nhiều tin nhắn hoặc hỏi lại TA.
- **Problem statement:** Học viên đang cố hoàn thành `daily standup` nhưng thông tin nằm rải rác trong các tin nhắn/kênh và câu hỏi lặp lại; họ có thể mất thời gian tìm kiếm hoặc bị blocked nếu nhận hướng dẫn thiếu căn cứ về nơi nộp, cách nộp hay deadline.
- **Evidence (chuẩn B là chính; khảo sát là tín hiệu bổ sung):**
  - **Mining:** từ 1.092 tin Discord, lọc `is_bot=False`, `mentions_bot=True`, `content` chứa `daily` hoặc `standup` → **60 tin từ 32 tác giả** trong 3 ngày. Cùng phương pháp: `điểm danh` → 13 tin/12 tác giả; `deadline|hạn|nộp` → 49 tin/31 tác giả. Các nhóm có thể giao nhau.
  - **Baseline đang chạy:** trong 4 bản tin ngày, có **7** mục ghi “chưa xác nhận đã xử lý”; **3** mục ghi phản hồi tự động chưa phải hướng dẫn chính thức.
  - **Khảo sát Google Sheets:** `n=10`, **10/10** nói đã lên Discord tìm câu trả lời/hỗ trợ trong 7 ngày; **4/10** gặp 2–3 lần; trong 8 câu trả lời có thời lượng hợp lệ, **3/8** mất từ 30 phút trở lên. Khảo sát chưa đủ `n≥20`, nên không claim đạt chuẩn A.
  - **5 ví dụ nguyên văn:**
    1. `M35505`: “[@BOT] giới thiệu tôi về daily standup”
    2. `M57734`: “quy cách nộp daily standup, cả nhóm có phải nộp ko? hình thức nộp như nào, viết ra sao, có mẫu ko? Nộp vào đâu?”
    3. `M65205`: “nộp ở đâu cơ, phần này mình đánh lệnh /daily-standup rồi mà ko được”
    4. `M07653`: “[@BOT] hạn nộp daily stand up”
    5. `M98666`: “thời gian mở daily standup và kết thúc là khi nào vậy? hôm qua mình gửi sớm daily standup thì không được, chiều nay quá deadline thì nó lại blocked mình.”

## §2. Impact & quyết định chọn

| Ứng viên | Bao nhiêu người/tần suất | Tốn gì mỗi lần | Khả thi trong hackathon | Chọn? |
|---|---|---|---|---|
| **B1. Trả lời câu hỏi `daily standup` bằng nguồn chính thức** | 60 tin từ 32 tác giả tag bot trong 3 ngày; 4/10 khảo sát gặp nhu cầu 2–3 lần/tuần | 3/8 câu trả lời thời lượng hợp lệ mất ≥30 phút; failure có thể làm blocked/mất XP | Hẹp, có nhiều input thật, demo được 1 quyết định AI và 1 đường chuyển TA | **Chọn** |
| B1. Tra cứu điểm danh và lịch sử điểm danh | 13 tin từ 12 tác giả tag bot | Sai thông tin có thể ảnh hưởng điểm danh; một số trường hợp cần dữ liệu cá nhân mà bot không có quyền | Khó hơn vì cần phân biệt câu hỏi cá nhân và chuyển đúng nơi hỗ trợ | Loại ở CP1 |
| B1. Tất cả câu hỏi deadline/nộp bài | 49 tin từ 31 tác giả tag bot; có giao nhau với `daily standup` | Deadline sai có cost-of-error cao, nhưng phạm vi rộng và nhiều nguồn mâu thuẫn | Quá rộng cho một demo 5 phút nếu không cắt tiếp | Loại ở CP1 |

- **Ứng viên đã loại + vì sao:**
  - Điểm danh: hậu quả cao nhưng có dữ liệu cá nhân/thẩm quyền; bot không nên đoán hoặc trả lời trạng thái cá nhân.
  - Tất cả deadline/nộp bài: evidence lớn nhưng phạm vi vượt quá một lát cắt; giữ làm backlog sau khi xử lý `daily standup`.
  - B2 bản tin cuối ngày: baseline có lỗi và đáng cải tiến, nhưng cần workflow TA/bản tin và không trực tiếp giải quyết job thao tác của học viên trong CP1.
- **Ứng viên chọn + vì sao:** chọn `daily standup` vì có 60 tin/32 tác giả, có nhiều câu hỏi lặp theo cùng một job, có failure cụ thể “gửi sớm không được / quá deadline bị blocked”, và có thể xác định quality bar quanh **đúng nguồn chính thức + đúng bước + không đoán khi thiếu căn cứ**.

## §3. Giải pháp tương tự đã nghiên cứu

Chưa chốt tại CP1. Sẽ bổ sung sau khi nhóm thử bot hiện có và ít nhất một trợ lý hỏi đáp có citation.

## §4. Thiết kế

- **Lát cắt MỘT CÂU:** Một học viên chuẩn bị nộp `daily standup` trên Discord · hỏi một câu về nơi/cách/hạn nộp · AI quyết định câu trả lời có truy được về nguồn chính thức hay không · trả lời ngắn kèm nguồn và bước tiếp theo, hoặc nói chưa đủ căn cứ và chuyển TA.
- **Non-goals tại CP1:** không trả lời trạng thái điểm danh cá nhân; không tự thay đổi deadline; không tự gửi tin/mention người khác khi chưa có người duyệt; không mở rộng sang mọi câu hỏi học tập.
- **Mức prototype nhắm tới:** [ ] Sketch  [x] Mock  [ ] Working — flow và AI call thật sẽ được chốt ở CP2/CP3; nguồn demo có thể là fixture chính thức tối thiểu.
- **Automation:** [ ] augment  **[x] conditional**  [ ] automate — chỉ tự trả lời khi intent rõ và nguồn chính thức đủ căn cứ; nếu mơ hồ/mâu thuẫn thì hỏi lại hoặc chuyển TA vì sai deadline có cost-of-error cao.

## §5. Kiểu lỗi — 4 lớp chỗ khó + kịch bản

Sẽ hoàn thiện tối thiểu 8 kịch bản ở CP4, gồm: hai deadline khác nhau, tin thiếu ngày/đối tượng, hỏi trạng thái cá nhân, prompt injection trong nội dung Discord, tin gộp `daily standup` với logistics khác, nguồn chính thức không tìm thấy, câu hỏi đã được trả lời trong thread khác, và nội dung bot bị tính nhầm là câu hỏi.

## §6. Bốn đường đi của trải nghiệm

Sẽ hoàn thiện sau CP2 khi flow được mock: happy path · low-confidence · failure/không căn cứ · correction · ngoài phạm vi · case đặc thù deadline/XP.

## §7. Kiểm thử

Sẽ xây golden set tối thiểu 20 case ở CP3–CP4, có case thường và 4 lớp lỗi theo guide §2.5. Quality bar sẽ được chốt trước hạn CP4, không sửa theo kết quả đo.

## §8. Phân công & kế hoạch

- **Phân công:** Đinh Lệnh Tiến Anh — product lead, canvas và spec; Nguyễn Đức Triệu — mining/evidence và log khảo sát; Vũ Hải Minh — retrieval/prompt và quy tắc nguồn chính thức; Nguyễn Hoàng Nam — prototype/bot, golden set, validation và demo.
- **Willing users:** [Họ tên 1 — mã học viên — điền trước khi nộp], [Họ tên 2 — mã học viên — điền trước khi nộp]. Có thể bổ sung người thứ ba dự phòng nếu nhóm có.
- **Kế hoạch validation:** sau CP3, giao một task theo outcome “hãy tìm cách nộp daily standup đúng hạn”, quan sát người thử tự làm, ghi quote nguyên văn và thay đổi vào `validation/`/§9.

## §9. Changelog

| Thời điểm | Đổi gì | Vì sao |
|---|---|---|
| 17/09/2026 · CP1 | Chọn B1 và cắt lát vào `daily standup` | 60 tin từ 32 tác giả tag bot; phạm vi đủ nhỏ để kiểm chứng trong hackathon và có failure blocked/deadline rõ ràng. |

