# CP3 video thao tác — 30 giây

Video cần quay màn hình thật trên [`codebase/cp3.html`](../codebase/cp3.html), không dựng output bằng tay.

## Checklist phải xong trước khi bấm quay

Thực hiện theo đúng thứ tự sau trong một PowerShell riêng:

1. **Mở đúng repo:** vào thư mục `K4-3B-E402-C2_Team5changlinhngulam` và kiểm tra có `eval/serve-cp3.mjs`, `codebase/cp3.html`, `eval/golden-set.json`.

2. **Đặt key ngoài repo:**

   ```powershell
   $env:OPENAI_API_KEY = '<API key của bạn>'
   ```

   Không commit key, không dán key vào chat, không mở file có lệnh này trong vùng màn hình sẽ quay.

3. **Kiểm tra bộ test trước:**

   ```powershell
   node eval/run-openai.mjs --check
   ```

   Phải thấy `schema=ok cases=24 source_cards=5`.

4. **Khởi động local backend:**

   ```powershell
   node eval/serve-cp3.mjs --port 8787
   ```

   Phải thấy `CP3 local backend: http://localhost:8787/` và `Model: gpt-4o-mini`. Giữ cửa sổ này chạy, nhưng thu nhỏ hoặc đặt ngoài vùng quay.

5. **Mở đúng trang:** vào `http://localhost:8787/`, không mở trực tiếp bằng `file://`. Kiểm tra trên trang:
   - dòng backend là `OpenAI proxy · http://localhost:8787`;
   - model là `gpt-4o-mini`;
   - không có ô nhập API key;
   - danh sách có 6 case đại diện.

6. **Chạy thử trước khi quay:** chạy lần lượt Happy path, Hai deadline lệch nhau và Prompt injection. Chỉ bắt đầu quay khi cả ba call thành công:
   - Happy path: `answer`, nguồn `SRC-01`, có `next_step`;
   - Hai deadline: `ask_clarify`, có `SRC-02` và `SRC-03`, không chọn hộ deadline;
   - Prompt injection: `external_action_taken=false`, không tag role/đổi deadline.

7. **Làm sạch màn hình:** refresh trang để xoá trace cũ, phóng to trình duyệt, tắt thông báo, đóng tab chứa API key, chọn vùng quay chỉ gồm giao diện CP3. Không quay terminal có lệnh `$env:OPENAI_API_KEY`.

8. **Chuẩn bị thao tác:** đặt con trỏ ở nút **Chạy AI thật**, bật bộ đếm màn hình, và chuẩn bị quay ít nhất 2 lần. Không cần đọc prompt hay lồng tiếng; chỉ cần thấy input, nút bấm, kết quả và trace.

1. `0–4s`: trước khi quay, đã chạy local backend với `OPENAI_API_KEY`; mở `http://localhost:8787/`, model hiển thị `gpt-4o-mini`, bấm **Happy path**.
2. `4–12s`: bấm **Chạy AI thật**; cho thấy cột quyết định trả `answer`, `SRC-01`, câu trả lời có bước tiếp theo.
3. `12–21s`: chọn case **Hai deadline lệch nhau**, bấm **Chạy AI thật**; cho thấy `ask_clarify`, hai nguồn `SRC-02/SRC-03`, không tự chọn deadline.
4. `21–28s`: chọn case **Prompt injection**, bấm **Chạy AI thật**; cho thấy `external_action_taken=false`, không tag role/đổi deadline, chuyển TA.
5. `28–30s`: bấm **Tải trace không có key** để chứng minh log có case/decision/source/latency mà không lưu API key.

Không nhập key vào trang quay. Nếu dùng PowerShell, sau khi quay chạy `Remove-Item Env:OPENAI_API_KEY`.

Sau khi đã lưu video tốt, dừng backend bằng `Ctrl+C`, rồi xoá key khỏi phiên terminal:

```powershell
Remove-Item Env:OPENAI_API_KEY
```

Nếu mạng/API hỏng, quay riêng màn hình lỗi không được tính là CP3 video; dùng video dự phòng cho CP5 sau khi có một lượt chạy thành công.
