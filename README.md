# JayIT Studio 3.4 — AI Maker

Đọc [UPDATE_3.4.md](UPDATE_3.4.md) trước khi chạy hoặc triển khai. Đây là gói tích lũy nghiệm thu một phần 0 + A, không phải bản hoàn thành B–E.

# JayIT Studio 3.3 — Easy Maker

Đọc [UPDATE_3.3.md](UPDATE_3.3.md) để cập nhật và xem báo cáo nghiệm thu Module A + C. Vào `easy.html` để tạo nhanh; `index.html` giữ Studio chuyên gia 3.2.

# JayIT Studio 3.2 — Mesh Core (Module A, bản kiểm thử)

Xem [UPDATE_3.2.md](UPDATE_3.2.md) để cài đặt, đọc phạm vi nâng cấp, chạy test và các giới hạn chưa nghiệm thu. Báo cáo thực thi ở `tests/*.log`. Nội dung phiên bản trước được giữ bên dưới.

# JayIT Studio 3.1 — Workshop / Model Hub

Xem [UPDATE_3.1.md](UPDATE_3.1.md) trước khi cập nhật. Tách/cắt lưới lớn, Model Hub 10 mẫu CAD và ghi chú PETG.

# JayIT 3D Studio Pro 2.1 — Precision / PETG

Xem [UPDATE_2.1.md](UPDATE_2.1.md) để cập nhật 4 file và đọc giới hạn.

# JayIT 3D Studio Pro 2.0

Đọc [UPDATE_2.0.md](UPDATE_2.0.md) để cập nhật GitHub, cài PWA và cấu hình Supabase tùy chọn. Phần dưới mô tả nền tảng 1.0 được giữ lại.

# JayIT 3D Studio Pro 1.0 — Local-first

Bản nền tảng web tĩnh tiếng Việt, nâng cấp từ V0.1: 37 mục công cụ, bao gồm các bộ tạo mẫu thử, tiện ích lưới, quản lý sản xuất và kinh doanh. Không có phí API và không tải file lên máy chủ trong bản này.

## Cách chạy
- Giải nén toàn bộ. Mở `index.html` bằng Chrome hoặc Edge. Giữ `pro.js` cùng thư mục.
- Khuyến nghị dùng `START_JAYIT.bat` trên Windows nếu có Python 3: chạy tại http://127.0.0.1:8765 (chỉ máy của bạn). Nếu không dùng Windows: `python3 serve.py`.
- Hosting: tải `index.html` và `pro.js` lên Cloudflare Pages hoặc Vercel, chọn dự án static, không cần build. Chưa có deployment trực tuyến được tạo. Dữ liệu nằm ở từng origin và trình duyệt; không tự chuyển từ file:// sang hosting hoặc giữa thiết bị. Sao lưu JSON trước khi đổi.

## Quy trình
1. Tạo mẫu hoặc nhập STL/OBJ/3MF. Kiểm tra kích thước, cạnh hở, mặt trùng, mặt suy biến. Có xoay, đặt đáy, đổi tỉ lệ, chuyển mô hình giữa công cụ.
2. Tô màu từng mặt hoặc toàn bộ. Lưu mô hình/màu bằng IndexedDB; xuất STL hoặc OBJ hình học; xuất 3MF core có base material.
3. Bố trí bàn in mặc định 256 × 256 × 256 mm, chỉnh X/Y/Z, bản sao và khoảng cách. Xem giao tuyến tại Z.
4. Mở file trong slicer thật (Bambu Studio / OrcaSlicer / PrusaSlicer), kiểm tra mesh, màu, support, va chạm và profile máy trước khi slice. Đọc G-code văn bản để lấy metadata nếu có. Không gửi G-code trực tiếp từ web.
5. Báo giá với nhựa, điện, khấu hao, hao hụt, công, đóng gói, phí sàn và biên lợi nhuận. Chuyển sang đơn hàng, tạo lệnh sản xuất. Kho nhựa nhập/xuất thủ công; cảnh báo tồn thấp. Quản lý khách, SKU, máy, profile. Tổng quan chỉ tính doanh thu/lãi của đơn đã giao.
6. Sao lưu tại Quản trị > Cấu hình & sao lưu. Có CSV riêng từng bảng. File backup có thể chứa thông tin khách hàng; giữ riêng tư.

## Phạm vi và hạn chế
- 37 mục không đồng nghĩa 37 engine CAD/slicer đầy đủ. Mô hình dạng relief tạo từ raster và lưới tam giác, không phải CAD tham số B-rep. Thời khóa biểu, logo cong, fan, khung và keycap là mẫu cơ bản. Keycap chưa có stem; Flexi là mẫu vòng đan chưa kiểm tra giao cắt; hộp nhạc chỉ vỏ; dung sai chỉ 5 trụ; tách khối chỉ tách thành phần liên thông theo cạnh.
- Sửa lưới chỉ loại mặt trùng/suy biến hoặc đảo hướng mặt toàn bộ. Không tự vá lỗ, không bảo đảm manifold, không phát hiện mọi giao cắt, không bảo đảm hướng mặt đúng. Cần kiểm tra bằng slicer và in thử. Kiểm tra cạnh không đồng nghĩa kiểm tra khả năng in. Dữ liệu thể tích hình học không phải lượng nhựa thực tế.
- 3MF nhập hỗ trợ một model XML, core mesh/components nội bộ, đơn vị và base materials, ZIP stored/deflate. Không hỗ trợ đầy đủ extension hoặc external component, texture, paint metadata riêng của hãng. Chuyển định dạng hình học không phải chuyển profile máy hoặc G-code giữa các hãng. STL/OBJ xuất không mang màu; 3MF core có màu nhưng chưa kiểm chứng ánh xạ AMS. Không dùng G-code từ máy khác nếu chưa kiểm tra.
- Bố trí theo hộp bao, chưa tính support, brim, vùng cấm hoặc xoay tối ưu; lát cắt chỉ là giao tuyến không phải toolpath. Giới hạn nhập 30 MB và 250.000 mặt; file lớn có thể làm trình duyệt chậm. G-code tối đa 100 MB, chỉ đọc metadata nhận diện, không tự tính thời lượng nếu thiếu.
- Quản trị cục bộ không phải admin phân quyền. Không có tài khoản, DB cloud, thanh toán, marketplace công khai, đồng bộ Shopee/TikTok Shop, điều khiển máy từ xa, AI text/image-to-mesh đầy đủ, slicer engine, CAM hay Boolean chính xác. Hồ sơ in là bản ghi nội bộ, không phải profile có thể nạp trực tiếp vào slicer. Kho và tình trạng máy được cập nhật thủ công. Không phải phần mềm kế toán thuế.

## Kiến trúc phiên bản thương mại tiếp theo (chưa triển khai)
- Frontend TypeScript/React + Three.js/WebGL; geometry worker với kernel manifold/OCCT/WASM và task queue; giữ nguyên API xuất STL/3MF.
- API server có xác thực, phân quyền owner/staff/customer, PostgreSQL cho đơn hàng/sản phẩm/vật liệu, object storage cho mô hình, versioning, backup và audit log.
- Slicing service sandbox riêng với PrusaSlicer/Orca engine, cấu hình máy/vật liệu đã kiểm thử, giới hạn CPU/RAM, job queue. Chỉ cho tải G-code sau kiểm tra; không tự điều khiển máy.
- Cửa hàng công khai, giỏ hàng, thanh toán qua nhà cung cấp, webhook xác thực, kiểm soát tải xuống, quyền sở hữu trí tuệ, đánh giá, theo dõi sản xuất. API bán hàng chỉ sau khi được cấp quyền.
- AI 3D theo provider riêng (tách nền, phân màu, sinh mesh, kiểm tra hình học), chi phí/quota rõ ràng; không nhúng khóa API vào frontend.

## Kiểm thử trong môi trường hiện tại
Mã JS chạy trên Chromium bằng cách nạp HTML nội tuyến (điều hướng trực tiếp bị chính sách môi trường chặn). Đã thử các mẫu mặc định, hộp kín 28 mặt, xuất STL/3MF, nhập lại 3MF, bố trí 4 bản, tách vỏ, giao tuyến Z, luồng báo giá → đơn hàng, kho và dashboard trong bộ nhớ. Chưa kiểm thử lưu trữ thực tế qua origin triển khai, tương thích slicer/AMS, in vật lý, hoặc toàn bộ tổ hợp tham số. Các ảnh dashboard sử dụng dữ liệu thử, không chứa dữ liệu thật.
