# JayIT 3D Studio Pro 2.0 — Cập nhật IN3D

## 1. Cập nhật GitHub
1. Trên web 1.0 đang chạy, vào Quản trị → Cấu hình & sao lưu → Xuất JSON. Lưu file riêng tư, không đưa backup lên GitHub.
2. Giải nén ZIP. Vào https://github.com/TK-JAY/IN3D/upload/main.
3. Kéo toàn bộ các file bên trong thư mục ZIP vào thư mục gốc repository (không kéo cả thư mục bọc). Thay thế file trùng tên. Commit trực tiếp main.
4. GitHub Actions phải chạy thành công; mở https://tk-jay.github.io/IN3D/ và Ctrl+F5. Kiểm tra nhãn Studio Pro 2.0. Không cần thay đổi GitHub Pages.
5. Dữ liệu cục bộ giữ nguyên key/origin, không có migration. Không xóa cache/storage nếu chưa backup. Nếu trình duyệt báo có app cài đặt, dùng nút Cài app hoặc menu Install app. PWA cần HTTPS hoặc localhost. Sau lần tải thành công, service worker có thể lưu tài nguyên ứng dụng để dùng offline; cloud vẫn cần mạng.

## 2. Supabase tùy chọn
1. Tạo project tại https://supabase.com/dashboard. Giữ mật khẩu DB riêng.
2. SQL Editor → New query → dán toàn bộ nội dung `supabase_setup.sql` → Run. Bảng jayit_snapshots bật RLS; chỉ user sở hữu được đọc/thêm/xóa bản sao; không cấp quyền anon.
3. Authentication → URL Configuration: đặt Site URL thành https://tk-jay.github.io/IN3D/ và thêm URL này vào danh sách redirect được phép. Bật email/password theo chính sách project. Nếu yêu cầu xác nhận email, xác nhận xong rồi quay lại trang để đăng nhập.
4. Project Connect / Settings API Keys: lấy Project URL dạng https://xxxxx.supabase.co và Publishable key (hoặc legacy anon key). Tuyệt đối không dùng secret/service_role.
5. Website → Tài khoản → nhập URL và key → Lưu cấu hình. Nếu muốn dùng chung project cho tất cả thiết bị, có thể sửa cloud-config.js bằng hai giá trị công khai rồi commit; không đưa token, mật khẩu hay dữ liệu cá nhân lên GitHub. Cấu hình cục bộ đã lưu ưu tiên hơn file mặc định.
6. Đăng ký/đăng nhập → Lưu bản sao mới. Mỗi snapshot độc lập, không tự ghi đè bản trước. Danh sách 50 bản gần nhất, mỗi bản tối đa 3 MB phía client. Tải lại trang cần đăng nhập lại. Không lưu mật khẩu hoặc token vào localStorage. Trên máy dùng chung, dữ liệu xưởng vẫn có thể được người dùng trình duyệt nhìn thấy; đăng xuất chỉ xóa phiên cloud, không xóa dữ liệu local. Không dùng chung hồ sơ trình duyệt giữa các xưởng.
7. Thiết bị thứ hai: cùng Project URL và key, cùng tài khoản → Làm mới danh sách → Khôi phục. Khôi phục thay dữ liệu xưởng cục bộ, không tự gộp và không thay thư viện mesh. Sao lưu JSON trước. Mô hình 3D, yêu thích, preset vẫn chỉ nằm trên thiết bị.
8. Trước khi sử dụng dữ liệu thật, kiểm tra hai tài khoản khác nhau: A tạo bản sao, B không được nhìn thấy/xóa bản của A. Kiểm tra khôi phục và xuất JSON. Chưa kiểm thử với Supabase thật.

## 3. Phạm vi 2.0
Giữ 37 module cũ, thêm Tài khoản & Cloud, Báo giá theo lô, Thống kê màu mô hình. Có manifest/PWA, icon và metadata SEO cơ bản. Không có realtime sync, quyền nhân viên/admin toàn hệ thống, AI text-to-mesh, slicer engine, marketplace, thanh toán, tích hợp AMS riêng, điều khiển máy hay API sàn. Các hạn chế thiết kế và in thực tế từ README 1.0 vẫn áp dụng.

## 4. Kiểm thử
Node kiểm tra cú pháp JS. Chromium nạp mã nội tuyến: 40 module, báo giá 100 SP → 14 bàn theo mẫu, tạo đơn số lượng 100, thống kê diện tích 2 mm², giao diện tài khoản, mô phỏng auth/snapshot save/list/restore/delete/logout bằng API giả lập. Chưa kiểm thử RLS trên database thực, service worker trên site HTTPS, cài PWA thực tế, in vật lý hoặc toàn bộ chức năng cũ. GitHub Pages chỉ dùng demo; sản phẩm thương mại nên chuyển hosting phù hợp.
