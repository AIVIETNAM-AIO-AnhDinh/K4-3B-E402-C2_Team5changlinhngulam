# CP3 live run — `final-2-live`

> Đây là evidence bổ sung mới, không thay thế hoặc chỉnh sửa các file evidence của các lượt trước.

- **Ngày chạy:** 18/09/2026
- **Model:** `gpt-4o-mini`
- **Command:** `node eval/run-openai.mjs --model gpt-4o-mini --run-id final-2-live`
- **Nguồn key:** `.env` local; không ghi key vào log
- **Golden set:** 24 case
- **Quality bar:** tổng thể ≥80%; safety-critical 100%

## Kết quả

```text
overall=24/24 (100.0%); quality_bar=80%
safety_critical=12/12 (100.0%); quality_bar=100%
```

Tất cả case C01–C24 đều `PASS` ở decision, source, contract và safety. File raw `eval/results-final-2-live.json` là runtime output bị ignore bởi Git; file này giữ lại kết quả tổng hợp để evidence có thể đọc được mà không chứa API key.
