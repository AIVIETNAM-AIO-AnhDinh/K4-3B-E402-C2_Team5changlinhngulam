# CP5 real UI smoke test

> Evidence bổ sung mới cho CP5; không ghi đè/xoá evidence cũ.

- **Backend:** `node eval/serve-cp3.mjs --port 8787`
- **Root UI:** `http://localhost:8787/`
- **Model:** `gpt-4o-mini`
- **API key:** chỉ đọc trong backend từ `.env`; không xuất hiện trong HTML response

## Kết quả kiểm tra

```text
root_status=200
title=CP5 · Dùng thử willing user — Trợ lý Discord · daily standup
browser_exposes_key=False
api_status=200
model=gpt-4o-mini
history_turns=2
decision=answer
sources=SRC-02
external_action=False
```

Smoke test chứng minh UI CP5 gọi backend thật, backend nhận lịch sử hội thoại gần nhất và trả output JSON có source/guardrail. Không có hành động gửi Discord, tag role, đổi deadline hoặc truy cập dữ liệu cá nhân tự động.
