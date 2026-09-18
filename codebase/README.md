# Trợ lý Discord · UI CP2/CP5 cho lát cắt `daily standup`

Nhóm **K4-3B-E402-C2_Team5changlinhngulam** · Track **B1 — Tối ưu trợ lý hiện có**

## 🚀 Cách mở và sử dụng

CP2 có thể mở các trang tĩnh bằng trình duyệt. Riêng UI CP5 `index.html` dùng AI thật nên phải chạy local backend:

```powershell
node eval/serve-cp3.mjs --port 8787
```

Sau đó mở `http://localhost:8787/`. Backend tự đọc `.env`, giữ API key ở server process và gửi tối đa 8 lượt history gần nhất cho model. Không mở `index.html` bằng `file://` nếu muốn gọi AI thật.

Nếu nộp qua link: bật GitHub Pages cho repo → `https://<user>.github.io/<repo>/codebase/`.

---

## 📂 Danh mục tài liệu và file trong thư mục `codebase/`

| File | Định dạng | Nội dung |
| :--- | :---: | :--- |
| **[`index.html`](index.html)** | `HTML` | Giao diện khung Discord mô phỏng (Interactive Prototype) và phiên dùng thử CP5. Có task 10 phút, đồng hồ, feedback ẩn danh cục bộ; bấm 1 trong 6 câu hỏi gợi ý để xem luồng. Cột phải (**Hộp máy**) thể hiện bot quyết định qua 4 bước. |
| **[`cp3.html`](cp3.html)** | `HTML` | CP3: gọi OpenAI `gpt-4o-mini` qua local backend ở cổng quyết định, hiển thị JSON contract và tải trace không chứa API key. |
| **[`flow.html`](flow.html)** | `HTML` | Sơ đồ luồng hoạt động trực quan dạng Vector SVG từ tin nhắn đến điểm kết thúc, tô màu riêng cho từng đường đi. |
| **[`paths.md`](paths.md)** | `Markdown` | Bảng chi tiết 4 đường đi của trải nghiệm: kịch bản (kèm mã tin thật trong data pack) · hệ thống làm gì · kết thúc ở đâu · nguyên tắc áp dụng. |
| **[`hax.md`](hax.md)** | `Markdown` | Bảng tổng hợp các nguyên tắc Microsoft HAX / Google PAIR áp dụng trong bản mẫu, kèm **vị trí áp dụng cụ thể** và lý do lựa chọn. |
| **[`mock.md`](mock.md)** | `Markdown` | Bảng tự khai phân định mức độ Mock vs Thật (CP2 vs CP3) và các chỗ hổng phát hiện khi dựng luồng. |
| **[`README.md`](README.md)** | `Markdown` | Tài liệu hướng dẫn sử dụng và tổng quan cấu trúc thư mục `codebase/`. |

## CP3 — chạy AI thật

Từ thư mục gốc, đặt `OPENAI_API_KEY` trong `.env` rồi chạy `node eval/serve-cp3.mjs --port 8787`. Mở `http://localhost:8787/cp3.html` để xem trang đo CP3; UI CP5 real ở `http://localhost:8787/`. Key chỉ nằm trong local backend, không được ghi vào HTML, trace hoặc git. Bản đầy đủ 24 case chạy bằng `node eval/run-openai.mjs`; xem `../eval/README.md`.

## CP5 — willing user và demo

Để test thật, từ thư mục gốc đặt key trong `.env`, chạy `node eval/serve-cp3.mjs --port 8787`, rồi mở `http://localhost:8787/`. Bấm **Bắt đầu phiên**, giao đúng task trong khung màu xanh, để người thử tự thao tác, rồi bấm **Kết thúc & phản hồi**. UI gửi câu hỏi qua local backend, giữ tối đa 8 lượt history gần nhất và không đưa key vào browser. Chỉ tải JSON khi người thử đồng ý lưu feedback ẩn danh. Quy trình ghi log ở [`../validation/README.md`](../validation/README.md), hai case demo ở [`../demo/cp5-demo-cases.md`](../demo/cp5-demo-cases.md).
