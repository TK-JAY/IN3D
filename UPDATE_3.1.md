# JayIT Studio 3.1 — Workshop / Model Hub

Cập nhật từ 3.0. Sao lưu JSON cục bộ trước. Tải 8 file trong PATCH (6 file web và 2 tài liệu) lên thư mục gốc nhánh main của TK-JAY/IN3D, ghi đè file trùng tên; chờ Actions xanh, mở https://tk-jay.github.io/IN3D/?v=3.1 rồi Ctrl+F5. Không cần cấu hình lại Supabase. Nếu chưa cài 3.0 đầy đủ, dùng FULL và giữ thư mục previews nguyên vẹn. Không tải JSON dữ liệu khách hàng lên GitHub công khai.

## Split Studio
- Nhập 3MF/STL/OBJ/GLB; giới hạn 180 MiB file, 320 MiB XML, 3 triệu mặt nhập. Kết quả sau cắt giới hạn 3,3 triệu mặt và 2.000 phần. Phụ thuộc RAM. Không đảm bảo mọi lưới lớn xử lý được.
- Thay thuật toán hàn đỉnh / kiểm tra cạnh / compact bằng TypedArray. Bỏ chặn 450.000/900.000 mặt. Tách vỏ liên thông theo đỉnh sau hàn, không tự nhận diện bộ phận. Cắt yêu cầu lưới kín và thể tích dương. Không kiểm tra tự giao, không tự vá lỗ.
- Chọn trục X/Y/Z (Z mặc định), chỉnh slider theo phần trăm hoặc mm tuyệt đối. Mặt phẳng nét đứt là chỉ dẫn xem trước, không phải clipping preview. Front/Top/ISO, bung chi tiết, chọn từng khối và solo. Dùng hoàn tác nếu cắt chưa đúng. Cắt lặp lại trên từng khối đã chọn. Nếu chỉ 1 màu hoặc 1 vỏ, công cụ giải thích thay vì tạo kết quả giả.
- Cắt kiểm tra lưới đầu vào và từng kết quả; kiểm tra bảo toàn thể tích. Nếu thất bại, giữ nguyên các khối. Mặt cắt có thể dịch cực nhỏ để tránh trùng đỉnh. Cắt các vật thể giao nhau, lưới hở, các nắp rất phức tạp có thể thất bại. Xuất STL/3MF/ZIP sau kiểm tra cạnh và thể tích; 3MF hình học chung, không phải project máy in hoặc profile AMS.
- Tách theo màu chỉ hỗ trợ vỏ kín hoặc ranh giới phẳng song song trục; không phân vùng theo ngữ nghĩa, không làm mượt đường sơn cong, không tạo khớp âm dương. Cảnh báo mã màu riêng hãng vẫn còn.

## Model Hub
10 mẫu CAD mặc định từ bản 3.0, ảnh dựng từ chính mô hình CAD; tìm kiếm, lọc danh mục, trang chi tiết kích thước / mặt / khối lượng lý thuyết; tải STL ngay, mở bộ thiết kế để sửa tham số và xuất 3MF; tải ghi chú PETG dạng JSON. JSON là ghi chú, không phải profile Bambu Studio. Chưa in vật lý. Không sao chép mô hình cộng đồng MakerWorld. Chưa có upload chia sẻ công khai, giấy phép nhà thiết kế, đánh giá, thanh toán, slicing thật hoặc đồng bộ máy in.

## Kiểm thử
1. Node V22: lưới cầu tổng hợp 1.500.000 mặt; hàn đỉnh, kiểm tra cạnh 0 hở/0 lỗi; cắt Z=1,234 mm thành 783.998 và 723.998 mặt; cả hai 0 cạnh hở/lỗi; sai lệch tổng thể tích khoảng 1,7e-9 mm³. Mẫu hai vỏ rời 1.501.520 mặt tách thành 1.500.000 và 1.520 mặt.
2. Chromium (mã HTML/JS nạp trực tiếp, Worker qua Blob; không kiểm tra hosting thật): nhập GLB 1.310.720 mặt, cắt Z ở 42,7% thành 2 khối 1.322.452 mặt tổng; kiểm tra thành công. Nhập 3MF 20 mặt hai màu, cắt 40%, xuất ZIP chứa 2 STL. Model Hub hiển thị 10 mẫu, tải STL quạt 26.584 mặt. Không có page error trong các luồng trên.
3. Chưa có file chibi 03 11.3mf của người dùng, chưa kiểm thử trực tiếp trên RTX 5060, Bambu Studio, in PETG vật lý, Supabase hoặc API Tencent. Không đánh đồng khả năng hiện tại với MakerWorld/Blender/Split3MF đầy đủ.
