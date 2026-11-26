# JayIT Studio 3.3 – Easy Maker (Module A + C)

## Cài đặt
- Nếu GitHub hiện đang chạy 3.2, tải 11 file trong PATCH vào thư mục gốc IN3D (không tải file ZIP nguyên vẹn). Các file cũ còn lại giữ nguyên.
- Trước cập nhật, dùng chức năng Xuất JSON của JayIT và giữ file gốc riêng. Không xóa Site Data / Local Storage.
- Patch không ghi đè cloud-config.js, dữ liệu kinh doanh, SQL hoặc bộ xử lý Split Studio 3.2. Không cần làm lại Supabase.
- Mở https://tk-jay.github.io/IN3D/easy.html sau khi GitHub Actions triển khai thành công. Từ trang cũ có mục Tạo nhanh / Easy Maker. Trang cũ vẫn là Studio chuyên gia để không làm gián đoạn luồng đang sử dụng.
- Full ZIP dùng cho cài mới, kiểm thử và lưu trữ mã nguồn. Không ghi đè cloud-config.js nếu đã cấu hình giá trị riêng. Không đưa secret key lên GitHub.
- Chạy thử cục bộ bằng Python 3: `python serve.py` rồi mở `http://127.0.0.1:8765/easy.html`. Không mở file trực tiếp bằng file:// vì Web Worker và cơ chế lưu phiên cần origin phù hợp.

## Phạm vi Module A: Tạo nhanh
8 mẫu: móc khóa, bảng tên, thẻ quà, bảng thời khóa biểu 5×4 ô trống, hộp mở, chụp đèn LED, quạt liền khối và cây thông phẳng. Wizard 3 bước. Mẫu phẳng có đường bao chữ nổi (5 lựa chọn font hệ thống), màu nền/chữ, kích thước, lỗ treo và các thành phần. Mẫu CAD có tham số riêng. Màu gợi ý từ bảng màu có sẵn, không phải AI. Xem trước bằng GPU nếu có, CPU dự phòng. Hình học dựng trong Web Worker; đường bao chữ và sơ đồ kéo-thả chạy ở UI thread. STL xuất là một khối hình học hợp nhất. 3MF là các solid riêng theo vật liệu (base materials trong 3MF core); chưa xác minh AMS. Khối lượng là thể tích đặc × 1,27 g/cm³, không phải lượng nhựa sau slicing.

## Phạm vi Module C: Thành phần
216 biến thể được tạo bởi 18 họ hình học × 12 kích thước. Tìm kiếm tên, mã, kích thước, nhóm. Nhấp để thêm vào vùng trống hoặc kéo vào sơ đồ mặt trên; chọn chi tiết để chỉnh X/Y, góc xoay, tỉ lệ, màu; kéo để di chuyển; xóa. Tất cả là chi tiết nổi trên nền phẳng; không phải thư viện 216 thiết kế hình học độc lập hoặc các module lắp ghép 3D tự do. Chốt vuông trong catalog chỉ là hình nổi, không phải bộ khớp âm dương cơ khí. Kiểm tra vùng chồng nhau theo hộp bao bảo thủ; từ chối chi tiết ngoài biên, hoặc gần lỗ. Khi lỗi, vô hiệu hóa xuất file, cho phép Undo.

## Kiểm thử thực tế
- `node tests/easy-geometry.test.cjs`: Module A 10/10 (8 mẫu hình học chưa có chữ, 2 lỗi bố trí); Module C 216/216 biến thể gắn trên nền, kiểm tra cạnh hở, cạnh lỗi, mặt trùng, hướng mặt, thể tích. Log `tests/easy-geometry-test.log`.
- `JAYIT_INLINE=1 python tests/easy-browser.py`: Chromium, Playwright. Nạp nguyên mã UI, CSS, preview và Web Worker thật qua blob vì chính sách môi trường chặn URL. 8 mẫu mặc định có chữ (nếu có), mẫu “BÉ BẢO” qua 5 font, gợi ý màu, ngẫu nhiên, undo/redo, tải file thật, tìm kiếm, nhấp/thả, chỉnh X, xoay, scale, màu, giao diện Anh và khổ 390px không tràn ngang. Không có lỗi JS chưa xử lý. GPU không khả dụng nên kiểm thử CPU fallback. Log `tests/easy-browser-test.log`.
- `python tests/easy-independent.py`: Trimesh + XML/ZIP. STL mẫu key và components kín, một thành phần liên thông, hướng mặt nhất quán. Từng mesh 3MF kín; object tham chiếu hợp lệ; thể tích tổng khớp STL, vật liệu 2 và 3 màu. Log `tests/easy-independent-test.log`.
- `python tests/easy-integration.py`: link Tạo nhanh xuất hiện một lần và giữ khi điều hướng ở app cũ. Chỉ test link, localStorage legacy mô phỏng do origin bị chặn. Log `tests/easy-integration-test.log`.
- `node tests/mesh.test.cjs`: hồi quy lõi mesh 3.2 đạt 14/14. Log `tests/mesh-regression.log`. Các tệp lõi, kinh doanh, cloud, split và AI cũ được giữ nguyên byte.
- Đường dẫn cache SW 45/45 tồn tại; chưa kiểm thử cài PWA hoặc offline qua origin thật.
- `python tests/easy-browser.py` không đặt JAYIT_INLINE: bài kiểm thử origin HTTPS do Playwright phục vụ tài nguyên local (lưu thật, reload). Môi trường này chặn `Page.goto` (ERR_BLOCKED_BY_ADMINISTRATOR); log `tests/easy-browser-origin-blocked.log`. Cơ chế autosave localStorage và phục hồi đã viết, nhưng chưa xác nhận lưu bền trên origin thật. Bài inline kiểm tra báo lỗi đúng, không giả báo lưu thành công. Undo/redo lưu tối đa 24 trạng thái khi đang làm việc. Dữ liệu cục bộ độc lập với business/Supabase.

## Môi trường chạy test
Node.js 22, Python 3, Playwright Python, Chromium, trimesh, numpy. Browser scripts hiện sử dụng `/usr/bin/chromium`; sửa đường dẫn executable nếu máy dùng Windows. Cài thư viện test Python bằng `pip install playwright trimesh numpy`. Test origin trên máy cho phép duyệt web có thể chạy không cần JAYIT_INLINE. Cần xác nhận trên website thật: mở Tạo nhanh → tạo mẫu → tải lại trang → Tiếp tục thiết kế → kiểm tra tên, màu, Undo → mở STL/3MF trong Bambu Studio → Slice.

## Changelog / chưa đạt
- Thêm easy.html, CSS, bộ tạo hình/thư viện, worker, renderer riêng, link tích hợp; bump cache 3.3.1.
- Không thêm AI giả. Chưa có ảnh/logo-to-3D, chữ chìm/viền, chibi tự động, AI phân đoạn, tô màu cong, khớp âm dương sau cắt, slicer hoặc PDF báo giá mới.
- Tiếng Anh cho các điều khiển chính, một số thông số CAD và ghi chú/lỗi kỹ thuật còn tiếng Việt.
- Không bảo đảm mọi tổ hợp tham số/kiểu chữ đều thành công hoặc đủ dày để in: đã có kiểm tra topology và khóa xuất khi không đạt, không có phân tích độ dày nét chữ, tự giao tổng quát hoặc support. Font lấy từ hệ điều hành, chưa kiểm tra bộ dấu tiếng Việt toàn diện trên Windows/macOS/iOS.
- Kết quả thử trên Chromium CPU không phải chứng nhận tốc độ GPU, cảm ứng di động, Bambu Studio/AMS hoặc bản in PETG vật lý. Chưa kiểm thử lưu origin thật và chưa triển khai lên GitHub.
