# JayIT Pro 2.3 — Technical PETG

Bản vá bổ sung 12 mẫu phụ kiện tham số (52 công cụ tổng cộng, bao gồm các module thử nghiệm cũ). Không sửa thuật toán Split 2.2 hoặc đăng nhập Cloud. Đế pin là ray cơ khí thụ động, không phải đế sạc điện. Không có khóa chống tuột, chỉ sử dụng thử nghiệm đặt nằm ngang. Chưa có mẫu theo chuẩn hãng vì chưa có số đo pin thật.

## Cập nhật GitHub
1. Xuất JSON dự phòng dữ liệu xưởng, lưu riêng.
2. Giải nén PATCH và tải `index.html`, `technical.js`, `sw.js` vào thư mục gốc repository TK-JAY/IN3D, branch main. Bản vá yêu cầu đã cài 2.2. Nếu thiếu file cũ, dùng bản FULL (không ghi đè cloud-config.js nếu đã cấu hình mặc định riêng).
3. Commit, kiểm tra Actions, mở https://tk-jay.github.io/IN3D/?v=2.3 và Ctrl+F5. Không cần cấu hình lại Supabase.
4. Chọn Phụ kiện PETG. Nhập kích thước thật, kiểm tra lưới rồi xuất STL hoặc 3MF phổ thông. Dữ liệu thiết kế tham số hiện chưa có chức năng lưu/khôi phục riêng; có thể lưu tệp xuất hoặc chuyển sang Split để xử lý.

## Đo pin
- Đo khoảng rộng ray dưới mép gài, chiều cao khoang dưới mép, chiều dài tiếp xúc, hình dạng và bề rộng mép gài. Các giá trị mặc định chỉ là ví dụ, không phải thông số chuẩn 21V.
- In thử, đo lại khe hở (mặc định 0,25 mm mỗi bên), kiểm tra trượt và độ bền. Không treo cao, không dùng để sạc hoặc chuyển đổi điện. Không che lỗ tản nhiệt.
- Ray mở hai đầu, có hai lỗ vít Ø5 mm mặc định. Lỗ xuyên, chưa có hốc đầu vít; nếu đầu vít cản ray, cần thay thiết kế hoặc vị trí gá, không ép pin vào.

## Kiểm thử
- 12 mẫu mặc định: kiểm tra cạnh, hướng mặt, mặt trùng bằng JS; kiểm tra độc lập bằng trimesh cho thấy 12/12 là một khối kín, thể tích dương, hướng mặt nhất quán. Không phải kiểm tra chịu tải hoặc va chạm toàn diện.
- Chromium: nạp mã trực tiếp vì môi trường chặn URL localhost; xác nhận 52 module, mở mẫu ray và mũi khoan, chỉnh rộng ray, xuất STL/3MF. STL và hình học 3MF mẫu ray được kiểm tra lại độc lập. Chưa kiểm thử deploy PWA, máy in thật, Bambu Studio, khớp pin thực tế. Split 2.2 với mô hình nhiều triệu mặt vẫn chưa được sửa.
- PETG: thông số gợi ý nozzle 0,4 mm, layer 0,20 mm, 4 vòng tường; support tùy hình học và slicer. Khối lượng hiển thị giả định in đặc, không phải ước tính G-code. Dùng profile theo loại PETG và máy thực tế.
