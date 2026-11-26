# JayIT Studio 3.2 — Mesh Core (Module A, bản kiểm thử)

Bản nâng cấp trên mã nguồn 3.1. Chỉ đánh dấu đạt khi có bằng chứng chạy. Chưa phải bản hoàn thiện toàn bộ Module A, và chưa thực hiện Module B–I trong lần nâng cấp này.

## Cài đặt
1. Sao lưu dữ liệu JSON trong Quản trị > Cấu hình & sao lưu; giữ tệp mô hình gốc trên máy.
2. Nếu đang dùng 3.1 đầy đủ: giải nén PATCH, đưa tất cả file runtime trong gói lên thư mục gốc nhánh `main` của repository `TK-JAY/IN3D`, thay file trùng tên; giữ các file cũ còn lại. Có thể tạo nhánh thử trước khi merge. Nếu chưa có bản 3.1 đầy đủ: dùng FULL, giữ nguyên cấu trúc `previews/`. `tests/` và tài liệu chỉ phục vụ kiểm thử; không cần đưa lên hosting.
3. Chờ GitHub Pages triển khai, vào https://tk-jay.github.io/IN3D/?v=3.2 rồi Ctrl+F5. Kiểm tra giao diện Studio 3.2. Nếu PWA còn bản cũ, đóng rồi mở lại sau khi cập nhật service worker. Không xóa site data, vì có thể mất dữ liệu cục bộ.
4. Chạy máy cá nhân: giải nén FULL, chạy `START_JAYIT.bat` (cần Python 3), hoặc `python serve.py`, truy cập URL localhost hiện ra. Không mở trực tiếp file:// nếu cần Worker/IndexedDB.
5. Không sửa cấu hình Supabase nếu đang dùng; không đưa JSON dữ liệu thật, khóa bí mật hoặc mô hình riêng tư lên repository công khai.

## Chức năng
- Split Studio: nhấn Kiểm tra để đọc cạnh hở, cạnh >2 mặt, hướng cạnh, vertex fan, thể tích. Sửa lưới để hàn đỉnh theo dung sai khoảng 0,00001 mm, bỏ mặt trùng và suy biến, định hướng mặt, vá lỗ đơn gần phẳng (đường chéo bbox tối đa 10 mm, lệch mặt phẳng tối đa 0,01 mm, tối đa 2048 đỉnh/vòng và 20.000 cạnh hở tổng). Từ chối lỗ lớn, biên phân nhánh, non-manifold phức tạp, vỏ âm nhiều thành phần có thể là khoang rỗng. Không có kiểm tra tự giao tổng quát.
- Cắt: chuẩn hóa trước khi cắt, tam giác hóa nắp và giữ cạnh biên; kiểm tra từng phần kín, vertex fan, hướng và bảo toàn thể tích. Fallback thử cắt lệch nhỏ; chỉ chấp nhận vị trí thực cách vị trí yêu cầu tối đa 0,01 mm; báo vị trí thực. Nếu thất bại không ghi đè mô hình nguồn.
- BVH: chọn một khối, tắt LOD, Shift + nhấp bề mặt để đặt tọa độ mặt phẳng theo trục đang chọn. BVH được xây khi cần và chạy ray trên lưới đầy đủ.
- LOD: bật checkbox để tạo lưới xem trước bằng gom cụm không gian; không sử dụng LOD để cắt/xuất. Tắt LOD để kiểm tra chi tiết. Có thể biến dạng nhỏ hoặc lẫn màu trên vùng hẹp.
- QEM: giữ 20–99% mặt, giới hạn 120.000 mặt mỗi khối. Co cạnh theo sai số quadric, giữ đỉnh đường biên màu, kiểm tra link condition, mặt lật, thể tích (≤1%) và giới hạn sai lệch bounding box. Không bảo đảm đạt số mặt yêu cầu hoặc sai số Hausdorff; không dùng cho chi tiết dung sai cao khi chưa đo lại.
- Undo/Redo nhiều bước (tối đa 12 bước, giảm nếu vượt ngân sách lịch sử 256 MiB; không bao gồm toàn bộ bộ nhớ tiến trình), phục hồi mô hình gốc, tải byte gốc cho file đã nhập. Phiên được tự lưu bằng IndexedDB sau thao tác; khi lưu lỗi, thông báo rõ, trạng thái trong RAM vẫn giữ. Một phiên active cho mỗi thư mục triển khai và browser; nhập mô hình mới xác nhận thay phiên trước. Không đồng bộ cloud, không khóa nhiều tab. Tránh mở nhiều tab cùng sửa. Khi reload, chọn Phục hồi phiên. Đừng xóa dữ liệu trình duyệt.
- Tạo normal và nhóm index vật liệu trong worker, truyền TypedArray cho viewer. GPU WebGL2 nếu khả dụng; CPU depth fallback. WASM dùng cho tích phân thể tích có compensated sum, không phải toàn bộ kernel CAD. Cắt/repair/BVH/QEM chạy JavaScript Worker.
- STL, OBJ, 3MF core geometry, ZIP từng STL. Xuất sau kiểm tra topology; không bảo đảm tất cả mesh kín đều không tự giao hoặc in được. 3MF chưa phải project Bambu/AMS. Xuất OBJ/STL không giữ metadata vật liệu.
- Giữ các công cụ hiện có của 3.1. Phạm vi Undo/Redo/autosave mới chỉ là Split Studio. Không thay đổi cơ sở dữ liệu hoặc cấu hình cloud.

## Kiểm thử lại
- Node 22: `node --max-old-space-size=4096 tests/mesh.test.cjs` (14 test; tự tạo cube/sphere/torus/lưới lỗi/mẫu lớn).
- Độc lập: `python -m pip install trimesh lxml numpy` rồi `python tests/independent_test.py`.
- Browser thật trên localhost: `python -m pip install playwright`, `python -m playwright install chromium`, rồi `python tests/browser_test.py`. Script tự dựng server trên loopback; dùng môi trường trình duyệt sạch. Mục tiêu: xác nhận IndexedDB thật sau reload. Trong môi trường xây dựng hiện tại bước này bị chính sách chặn điều hướng localhost; chưa nghiệm thu.
- Test browser nội tuyến chuyên biệt: `python tests/generate_large_fixture.py`, rồi Linux/macOS `JAYIT_LARGE=1 python tests/browser_inline_test.py`; PowerShell `$env:JAYIT_LARGE='1'; python tests/browser_inline_test.py`. Có thể đặt biến môi trường `CHROMIUM` đường dẫn Chromium trên máy. Test này cố ý chạy origin bị giới hạn, xác minh thông báo lưu lỗi thay vì giả lập lưu thành công.
- Tệp GLB 1,5 triệu mặt sinh theo script, không đóng gói sẵn để giảm dung lượng ZIP. Các log, ảnh kiểm thử và file STL/OBJ/3MF nhỏ ở `tests/`.
- Biên dịch lại WASM nếu cần (Clang/wasm-ld): lệnh ở đầu `mesh-kernel.c`. JS chứa binary base64; xem `tests/build_wasm.py` để cập nhật nhúng cùng binary. Không cần compiler khi chạy bản phát hành.

## Tiêu chí A còn thiếu
- Tích hợp kernel Boolean tổng quát đã kiểm thử, xử lý tự giao, vá lỗ cong/lớn và non-manifold phức tạp, kiểm tra độ lệch bề mặt.
- QEM trên 1,5 triệu mặt, benchmark bộ nhớ/FPS dài hạn trên GPU thực và thiết bị người dùng; test 3 triệu mặt và mesh tự nhiên phức tạp.
- Nghiệm thu autosave IndexedDB trên origin thật, kiểm tra cache PWA và khôi phục sau crash thật; hiện mới kiểm thử logic bằng mock và thông báo lỗi ở origin bị hạn chế.
- Kiểm thử với model Chibi gốc, Bambu Studio/AMS và bản in vật lý. Chưa có file Chibi gốc trong môi trường làm việc.
