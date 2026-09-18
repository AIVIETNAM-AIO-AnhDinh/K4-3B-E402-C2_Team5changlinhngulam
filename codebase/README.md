# Bản mẫu CP2 — Trợ lý Discord · lát cắt `daily standup`

Nhóm **K4-3B-E402-C2_Team5changlinhngulam** · Track **B1 — Tối ưu trợ lý hiện có**

## 🚀 Cách mở và sử dụng

Mở `codebase/index.html` bằng trình duyệt web (double-click vào file).  
Trang web là phiên bản **Single-file HTML/CSS/JS** tự vận hành:
- **Không cần server**, không cần cài đặt thêm thư viện hay dependency.
- **Không gọi mạng**, không yêu cầu khóa API.

Nếu nộp qua link: bật GitHub Pages cho repo → `https://<user>.github.io/<repo>/codebase/`.

---

## 📂 Danh mục tài liệu và file trong thư mục `codebase/`

| File | Định dạng | Nội dung |
| :--- | :---: | :--- |
| **[`index.html`](index.html)** | `HTML` | Giao diện khung Discord mô phỏng (Interactive Prototype). Bấm 1 trong 6 câu hỏi gợi ý để đi hết một lượt. Cột phải (**Hộp máy**) thể hiện bot quyết định qua 4 bước. |
| **[`cp3.html`](cp3.html)** | `HTML` | CP3: gọi OpenAI `gpt-4o-mini` qua local backend ở cổng quyết định, hiển thị JSON contract và tải trace không chứa API key. |
| **[`flow.html`](flow.html)** | `HTML` | Sơ đồ luồng hoạt động trực quan dạng Vector SVG từ tin nhắn đến điểm kết thúc, tô màu riêng cho từng đường đi. |
| **[`paths.md`](paths.md)** | `Markdown` | Bảng chi tiết 4 đường đi của trải nghiệm: kịch bản (kèm mã tin thật trong data pack) · hệ thống làm gì · kết thúc ở đâu · nguyên tắc áp dụng. |
| **[`hax.md`](hax.md)** | `Markdown` | Bảng tổng hợp các nguyên tắc Microsoft HAX / Google PAIR áp dụng trong bản mẫu, kèm **vị trí áp dụng cụ thể** và lý do lựa chọn. |
| **[`mock.md`](mock.md)** | `Markdown` | Bảng tự khai phân định mức độ Mock vs Thật (CP2 vs CP3) và các chỗ hổng phát hiện khi dựng luồng. |
| **[`README.md`](README.md)** | `Markdown` | Tài liệu hướng dẫn sử dụng và tổng quan cấu trúc thư mục `codebase/`. |

## CP3 — chạy AI thật

Từ thư mục gốc, đặt `OPENAI_API_KEY` trong terminal rồi chạy `node eval/serve-cp3.mjs --port 8787`. Mở `http://localhost:8787/`, chọn case và bấm **Chạy AI thật**. Key chỉ nằm trong local backend, không được ghi vào HTML, trace hoặc git. Bản đầy đủ 24 case chạy bằng `node eval/run-openai.mjs`; xem `../eval/README.md`.
