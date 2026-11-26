# JayIT Studio Pro 2.1 — Precision / PETG

## Cập nhật repository IN3D hiện có
1. Xuất JSON sao lưu từ Quản trị. Không đưa bản sao dữ liệu lên GitHub.
2. Giải nén gói cập nhật 4 file vào một thư mục. Tải trực tiếp 4 file `index.html`, `precision.js`, `earcut.js`, `sw.js` vào root nhánh `main` của TK-JAY/IN3D, ghi đè file cùng tên. Commit trực tiếp main.
3. Kiểm tra Actions có lần deploy mới thành công. Mở https://tk-jay.github.io/IN3D/?v=2.1 rồi Ctrl+F5. Nếu PWA vẫn hiển thị bản cũ, đóng các tab IN3D và mở lại; không xóa local storage/IndexedDB nếu chưa sao lưu.
4. Không thay đổi cloud-config.js, Supabase hay SQL. Gói đầy đủ có cloud-config.js mặc định trống; gói 4 file an toàn hơn cho repo hiện có. Cấu trúc lưu trữ cũ không đổi.

## Nâng cấp
- Key/charm/tag: tạo đường bao chữ từ font hệ thống bằng marching squares nội suy + giản lược, tam giác hóa đa giác bằng Earcut (ISC; thông báo giấy phép trong earcut.js). Không dựng cột pixel nữa; không kèm file font.
- 3 dáng nền, 5 kiểu font hệ thống, 3 độ chính xác đường bao, vát mép 45 độ, tùy chọn lỗ, bảng màu, tự tạo lại khi chỉnh thông số. Font thực tế tùy OS, không bảo đảm mọi ký tự/font hoặc nét nhỏ đều in được.
- STL hợp nhất một solid; 3MF thường giữ thuộc tính màu từng mặt. 3MF tách màu: một đối tượng component gồm nền và chữ riêng, có mặt tiếp giáp đồng phẳng, dùng để gán filament. Sau biến đổi hình học cần tạo lại trước khi xuất tách màu. Chưa kiểm thử nhập trong Bambu Studio/Orca.
- Bình/chậu và tô: bốn dáng, đường tròn 96/144 cạnh, 30 đoạn cao, đáy đặc, thành theo bán kính. Không bảo đảm độ dày đo vuông góc, không bảo đảm an toàn thực phẩm hoặc kín nước.
- Trình xem có bộ đệm chiều sâu CPU, không cần WebGL. Chỉ nâng cấp năm module; 35 module còn lại giữ nguyên. Không có CAD kernel đầy đủ, Boolean tổng quát, AI, slicer mới hoặc xử lý ảnh SVG mới. Không sửa chức năng đăng nhập.

## PETG
Gợi ý thử nozzle 0.4 mm, layer 0.16–0.20 mm, 3–4 tường, nền 2.4 mm, chữ 1 mm; lỗ treo cần đủ vật liệu quanh lỗ. Kiểm tra preview đường chạy, nét chữ nhỏ, độ dốc, nhiệt độ và độ bám dính; chỉnh profile theo nhựa/máy thực tế. Riêng Bambu PETG HF: hãng công bố nozzle 230–260°C, bàn 65–75°C, sấy 65°C/8h bằng tủ sấy phù hợp. Không áp dụng cố định cho mọi PETG.

## Kiểm thử
Chromium: sáu mẫu chữ (JAYIT, BẢO AN, Nguyễn, HELLO, A B O 8, ĐỖ), cả bốn dáng trên bình và tô, đều qua kiểm tra cạnh hở/cạnh lỗi/mặt suy biến/mặt trùng mặc định. STL JAYIT 70 × 30 × 3.4 mm, 1128 tam giác: trimesh xác nhận watertight, winding consistent, một khối liên thông, thể tích 5164.23 mm³. 3MF phổ thông và hai phần 3MF tách màu: từng mesh watertight, winding consistent, thể tích dương. Không kiểm tra toàn bộ tự giao cắt, tất cả thông số, thiết bị Windows, triển khai PWA thực tế hoặc in vật lý.
