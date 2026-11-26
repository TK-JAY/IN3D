# JayIT Studio 3.0 — CAD Edition

## Triển khai thay thế
1. Trên website cũ, Quản trị → Cấu hình & sao lưu → Xuất JSON. Giữ tệp riêng, không tải lên GitHub.
2. Giải nén ZIP đầy đủ, tải các tệp và thư mục `previews` vào thư mục gốc nhánh `main` của TK-JAY/IN3D. Không tải nguyên ZIP hay thư mục cha. Không xóa repo cũ.
3. Commit, xem Actions cho đến khi Pages triển khai thành công. Mở https://tk-jay.github.io/IN3D/?v=3.0 và Ctrl+F5. Giữ nguyên origin và đường dẫn; không xóa dữ liệu trang. Nếu bản cũ còn hiện, kiểm tra commit và service worker trong DevTools (Unregister, không dùng Clear site data).
4. Kiểm tra dòng Studio 3.0 · CAD Edition, mở Quạt xòe điêu khắc, thay góc xòe, xuất STL, kiểm tra bằng slicer. Nếu bản cập nhật thiếu ảnh, kiểm tra đường dẫn previews/*.webp.

## Thay đổi
- Giao diện thư viện, phân nhóm, ảnh xem trước thật từ mô hình, tìm kiếm, yêu thích, workspace tham số mới.
- 10 bộ tạo CAD: quạt nếp cong, cây thông, khung ảnh, chụp LED xoắn, giá điện thoại, hộp mở, khay lục giác, ống nối côn, đế lót ly, tấm gá khe dài. 3 mẫu thay thế (fan/frame/box) và 7 mẫu mới.
- Các bộ chữ Precision, bình, 12 phụ kiện PETG, quản lý xưởng, Split Studio, Hunyuan AI và Cloud được giữ từ 2.4, không tuyên bố viết lại các engine này.
- 9 mẫu thử nghiệm (ảnh nổi, thời khóa biểu, keycap, chữ để bàn, logo cong, hộp nhạc, hoa văn, flexi, lithophane) được chuyển vào Mẫu cũ đã lưu trữ ở chân trang. Chúng chưa đạt tiêu chuẩn CAD mới. Thiết kế lưu cũ được mở bằng engine cũ khi nhận diện tham số cũ.
- Các key lưu trữ trình duyệt, IndexedDB, API Cloud và SQL không đổi; nên sao lưu trước. Dữ liệu không tự đồng bộ. Không có khóa Tencent trong gói.

## Kiểm thử
Chromium nạp HTML/JS/CSS trực tiếp vì điều hướng website bị chặn. Bộ nhớ localStorage được mô phỏng; IndexedDB không thử thật. 10 mẫu mặc định qua kiểm tra cạnh hở, cạnh không đa tạp, hướng mặt, mặt trùng, mặt suy biến và thể tích dương. UI mở và xuất STL/3MF mẫu quạt. STL kiểm tra độc lập với trimesh. Xem trước CPU depth thực tế; chưa xác nhận GPU, GitHub deployment, Cloud hoặc in PETG vật lý. Không có kiểm tra tự giao cắt toàn diện. Dung sai và độ bền cần in thử. Tách màu cong, chốt tự động, Slicer, sculpting và password recovery chưa được nâng cấp. Hunyuan API cần Edge Function và khóa như 2.4.
