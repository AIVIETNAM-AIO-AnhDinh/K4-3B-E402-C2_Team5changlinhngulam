# Sơ đồ luồng — Từ tin nhắn đến điểm kết thúc

> **Trợ lý Discord — lát cắt `daily standup`**  
> CP2 · Luồng hoạt động | Mức prototype: MOCK  
> Nhóm `K4-3B-E402-C2_Team5changlinhngulam` · Track B1

Một tin nhắn tag bot đi qua ba cửa: **Phân loại intent** → **Truy nguồn chính thức** → **Cổng tự tin**.  
Cổng tự tin là chỗ duy nhất quyết định bot tự trả lời hay chuyển người. Đường 4 (sửa) gắn vào mọi câu trả lời.

---

## 📊 Sơ đồ luồng (Flowchart)

```mermaid
flowchart TD
    START["Học viên tag @Trợ lý trong #hỏi-trợ-lý\n(điểm bắt đầu — không form, không nút riêng)"] --> STEP1

    subgraph STEP1 ["① PHÂN LOẠI INTENT"]
        direction TB
        INTENT_CHECK["Phân loại: Chào hỏi · Hỏi bài · Logistics · Cá nhân/Thẩm quyền"]
    end

    STEP1 --> BRANCH_GREET["Chào hỏi / tin cụt\n(1 dòng + 3 câu hay gặp)"]
    STEP1 --> BRANCH_STUDY["Hỏi bài\n(ngoài lát cắt CP2: trả lời ngắn, không nguồn)"]
    STEP1 --> BRANCH_LOGISTICS["Logistics\n(daily standup)"]
    STEP1 --> BRANCH_AUTH["Cá nhân / ngoài thẩm quyền\n('điểm danh', 'XP của tôi')"]

    BRANCH_GREET --> END_GREET["Kết: Học viên biết cách hỏi"]
    BRANCH_AUTH --> END_AUTH["Từ chối + /ticket create + Chuyển TA"]

    BRANCH_LOGISTICS --> STEP2

    subgraph STEP2 ["② TRUY NGUỒN CHÍNH THỨC"]
        RETRIEVAL["Chỉ sổ tay + thông báo ghim của BTC/Mod\n(Loại bỏ: câu trả lời cũ của bot & tin của học viên khác)"]
    end

    STEP2 --> STEP3

    subgraph STEP3 ["③ CỔNG TỰ TIN"]
        CONFIDENCE["Đủ căn cứ? · Mâu thuẫn? · Không có gì?\n(Quyết định AI của lát cắt)"]
    end

    STEP3 -- "≥1 nguồn, không mâu thuẫn" --> PATH1
    STEP3 -- "2 nguồn lệch nhau / thiếu ngày" --> PATH2
    STEP3 -- "0 nguồn" --> PATH3

    subgraph PATH1 ["ĐƯỜNG 1 · HAPPY PATH"]
        P1_RESP["Trả lời ≤3 dòng, đúng cỡ câu hỏi\n+ Trích nguồn bấm xem được\n+ Một bước kế tiếp cụ thể"] --> P1_END["Kết: Học viên nộp đúng chỗ, đúng giờ\n(Luồng đóng tại đây)"]
    end

    subgraph PATH2 ["ĐƯỜNG 2 · THIẾU TỰ TIN"]
        P2_RESP["Nêu cả hai mốc kèm ngày, không chọn hộ\nHỏi lại đúng MỘT câu thu hẹp (G10)"] --> P2_END["Học viên chọn 1 nhánh\n(Quay lại ③ với input đã rõ)"]
    end
    P2_END -.->|Vòng lại| STEP3

    subgraph PATH3 ["ĐƯỜNG 3 · KHÔNG CĂN CỨ"]
        P3_RESP["Nói thẳng 'mình không có nguồn'\nSoạn sẵn tin cho TA — người bấm gửi\n(Bot không tự tag ai)"] --> P3_END["Kết: TA nhận việc trong thread\nHọc viên không nhận thông tin sai"]
    end

    subgraph PATH4 ["ĐƯỜNG 4 · SỬA (Gắn vào MỌI câu trả lời)"]
        P4_THUMB["👎 'Sai chỗ nào?' (chọn lý do: sai hạn, sai nơi nộp, dài quá, không đúng câu hỏi)\n→ Gỡ nhãn 'có căn cứ', đẩy vào hàng đợi TA, ghi log eval"]
        P4_EDIT["'Sửa câu hỏi': Đưa nguyên văn câu cũ trở lại ô nhập để sửa và hỏi lại"]
        P4_TA["'Hỏi TA luôn': Hiện sẵn để bỏ qua bot bất cứ lúc nào, không bị chặn flow (G8, G9, G15)"]
    end

    P1_RESP -.-> PATH4
    P2_RESP -.-> PATH4
    P3_RESP -.-> PATH4
```

---

## 🎨 Trú giải màu sắc các đường đi

- 🟩 **Đường 1 · Happy path**: Trả lời tự tin, kèm nguồn chính thức và hành động kế tiếp.
- 🟨 **Đường 2 · Thiếu tự tin**: Mâu thuẫn nguồn hoặc thông tin không rõ ràng, hỏi lại 1 câu thu hẹp phạm vi.
- 🟥 **Đường 3 · Không căn cứ / Ngoài thẩm quyền**: Dừng lại, không suy đoán, chuẩn bị nháp tin chuyển TA hoặc chỉ dẫn lệnh `/ticket create`.
- 🟪 **Đường 4 · Sửa**: Tích hợp dưới mọi output, giúp học viên phản hồi, sửa câu hỏi hoặc chuyển ngay sang TA.

---

📌 *Ghi chú: Bản mẫu CP2 không gọi AI thật, không khóa API, không sử dụng dữ liệu cá nhân. Nguồn hiển thị là fixture dựng từ các tin nhắn ẩn danh trong `discord-pack`.*

