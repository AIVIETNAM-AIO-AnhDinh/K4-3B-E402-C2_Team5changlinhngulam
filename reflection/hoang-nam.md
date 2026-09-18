# Reflection — Nguyễn Hoàng Nam

- **Mã học viên:** 2A202602485
- **Vai trò:** Thành viên — prototype/bot, golden set, validation và demo
- **Dự án:** Track B1 — Trợ lý Discord, lát cắt `daily standup` (K4-3B-E402-C2 · Team 5changlinhngulam)

## 1. Tôi đã làm gì

- Dựng **bản mẫu bấm được** `codebase/index.html`: khung Discord mô phỏng, 6 kịch bản, cột phải "Hộp máy" cho thấy bot quyết định qua 4 bước, công tắc hiện pin nguyên tắc HAX; tách phần giao diện ra khỏi phần logic để CP3/CP5 dùng lại được.
- Xây **golden set 24 case** (`eval/golden-set.json`): 11 case thường + 13 case hiếm/biên, ≥2 case cho mỗi lớp *source truth / ambiguity / authority / domain*, **16 case lấy trực tiếp hoặc phát triển từ mã tin Discord thật**.
- Viết bộ runner: `run-openai.mjs` (chạy 24 case, chấm contract + safety), `serve-cp3.mjs` (local backend, key ở biến môi trường, không vào browser), `run-backend-smoke.mjs`, `run-source-regression.mjs`, `run-first-fix-check.mjs`.
- Làm phiên **validation CP5** trên UI thật (task 10 phút, đồng hồ, history 8 lượt, feedback JSON ẩn danh tải cục bộ) + template log `validation/`, kịch bản video CP3 và 2 case demo ở `demo/cp5-demo-cases.md`.
- Hoàn thiện §3 và §5 của `spec.md` ở CP4.

## 2. Điều tôi thấy làm đúng

- **Case do người viết, LLM chỉ paraphrase.** Golden set bám mã tin thật nên phủ được chỗ khó thật (hai deadline lệch nhau, hỏi điểm danh cá nhân, prompt injection, câu gộp bài học + logistics) chứ không phải 24 dòng happy path nhìn cho nhiều.
- **Có runner từ sớm** nên mọi thay đổi prompt/retrieval đều kiểm chứng được: 15/24 (62.5%) ở `run-001` → 24/24 và safety-critical 12/12 ở các lượt sau, đo bằng cùng một bộ case và cùng một bar.
- **Không để key vào browser.** Backend local giữ key, UI chỉ gọi API — làm được điều này mà vẫn cho willing user dùng "hàng thật".
- **Evidence chỉ thêm, không ghi đè.** Log `run-001` với 62.5% vẫn nằm nguyên trong repo bên cạnh log 100%.

## 3. Điều khó và điều tôi làm chưa tốt

- **Validation thật chưa chạy.** `validation/session-log.md` vẫn là template, 5 dòng `WU-01`…`WU-05` đều ghi "chưa chạy", phần tổng hợp toàn "Chưa có dữ liệu". Tôi dựng xong công cụ quan sát nhưng chưa có người ngồi vào ghế thử. Đây là khoảng trống lớn nhất trong phần việc của tôi.
- **Tôi tự thử sản phẩm quá nhiều nên mù lỗi hiển nhiên.** First Fix 001 — câu "cách viết daily standup" bị trả về "không có nguồn" — là lỗi mà bất kỳ người ngoài nào cũng gặp trong 30 giây đầu, còn tôi chạy 24 case sạch sẽ mà không thấy, vì case của tôi dùng đúng cách nói mà tôi đã nghĩ ra.
- **UI có giai đoạn fixture-only** trước khi nối backend thật, và trong giai đoạn đó demo trông "chạy được" hơn thực tế. Tôi đã kịp chuyển sang gọi thật trước CP5, nhưng nếu hết giờ thì đó là một demo dễ gây hiểu nhầm.

## 4. Bài học mang đi

1. **24/24 trên bộ case của chính mình không phải bằng chứng sản phẩm tốt** — nó chỉ chứng minh sản phẩm khớp với trí tưởng tượng của người viết case. Một người lạ trong 10 phút cho tín hiệu mạnh hơn.
2. **Đưa người ngoài vào từ lúc còn mock,** đừng đợi bản hoàn chỉnh. Lỗi retrieval kiểu First Fix 001 lẽ ra lộ ra từ CP2.
3. **Runner là hạ tầng, làm trước prompt.** Có thước đo rồi thì tranh luận nào cũng kết thúc trong một lần chạy.

## 5. Ghi nhận đồng đội

Triệu đưa mã tin thật để golden set không phải bịa; Minh sửa contract nên các case fail gom được về đúng hai nguyên nhân; Tiến Anh giữ quality bar nên con số 24/24 cuối cùng mới có nghĩa.
