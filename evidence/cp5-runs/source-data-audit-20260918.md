# CP5 source-data audit — 2026-09-18

Đây là log mới cho lần cải thiện nguồn dữ liệu. Các evidence cũ không bị ghi đè hoặc xoá.

## Phạm vi đã đọc

- `data/README.md`, `data/DATA_DICTIONARY.md`, `data/k4_messages.csv`, `data/k4_daily_reports.md` của team.
- `tracks/track-b-discord-assistant.md` và các hướng dẫn CP của repo hackathon.
- Hai bộ slide trong `data/vlearn-pack/slides/`: Day 1 nhấn mạnh context có giới hạn, RAG/tra sổ và dữ liệu tốt; Day 2 nhấn mạnh hệ thống AI gồm Model + Context + Planning + Tools, chọn mức automation theo cost-of-error, baseline/evaluation/controls và HITL.

## Kết luận từ mining

Raw pack có các cụm câu hỏi thật lặp lại về nơi nộp, cú pháp, field `yesterday/today/blockers`, mốc XP, ticket và câu hỏi “cả nhóm hay cá nhân”. Câu trả lời bot cũ hữu ích để phát hiện wording/pitfall nhưng không được coi là nguồn chính thức (`is_bot=true`). Nguồn người/Mod và message trỏ tới sổ tay được giữ làm provenance.

Các lỗi đã khóa trong catalog:

1. Hỏi cách viết/ví dụ không còn rơi vào câu trả lời “không có nguồn”; `SRC-01` có template minh hoạ và ghi rõ không phải quy định bắt buộc.
2. Không biến câu trả lời bot “từng thành viên phải nộp”, “không cần tag” hoặc deadline tự suy diễn thành policy.
3. Không bịa channel/team ID khi raw pack không có tên kênh; trả lời ở mức “forum thread riêng của team” và chuyển TA/Mod nếu không thấy thread.
4. Tách mốc `0h–10h để được cộng XP` (`SRC-02`) khỏi mô tả lệnh không có ngày cập nhật (`SRC-03`), buộc hỏi rõ khi người dùng nói “deadline”.
5. Bổ sung đường hỗ trợ `/ticket create` (`SRC-05`) và mốc 14/9 trong snapshot lịch sử (`SRC-06`), có cảnh báo không trình bày mốc cũ như chính sách hiện hành.
6. Mở rộng retrieval cho các biến thể tự nhiên “ở nhóm/kênh nào”, “tất cả thành viên hay một người”, không chỉ khớp câu gợi ý.

## File mới/cập nhật

- `data/daily-standup-source-cards.json`: catalog 6 source card, coverage, provenance và `baseline_pitfalls`.
- `eval/ai-contract.mjs`: retrieval/guardrail cho SRC-01…SRC-06, câu hỏi nơi nộp và câu hỏi ai phải nộp.
- `eval/serve-cp3.mjs`, `eval/run-openai.mjs`: runtime/runner đọc catalog mới.
- `codebase/index.html`, `codebase/cp3.html`: hiển thị đúng source mới, không còn diễn đạt “mỗi thành viên” trong SRC-01.
- `eval/source-regression.json`, `eval/run-source-regression.mjs`: bộ regression mới từ message IDs thật.

## Kết quả đo sau thay đổi

Chạy backend live ngoài sandbox tại cổng thử `8789` với `gpt-4o-mini`:

```text
backend_overall=24/24 (100.0%); history=PASS; natural_submission=PASS
source_regression=9/9 (100.0%) live
```

Các case mới đã PASS gồm: M60122, M54695, M91027, M80778, M65205, M04103, M22827, M77407 và M61254. Trong đó M77407 chuyển đúng sang `refer_ta` không gắn source; M80778 giữ cả `SRC-02,SRC-03` và hỏi thu hẹp; M91027 trả forum thread mà không bịa tên channel.

## Cách dùng sau khi pull

Dừng process cũ nếu cần, rồi chạy lại từ repo team:

```powershell
node eval/serve-cp3.mjs --port 8787
```

Sau đó mở `http://localhost:8787/`. Process đang chạy trước khi catalog được nạp sẽ không tự reload file nguồn; cần restart để lấy thay đổi.
