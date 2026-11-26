# JayIT Studio 3.4 — AI Maker | Full source, nghiệm thu giai đoạn 0 + A

## Phạm vi
Đây là một gói mã nguồn tích lũy, không cần các bản PATCH trước. Không phải bản nghiệm thu hoàn chỉnh toàn bộ yêu cầu 0–E. Các bộ tạo mẫu hiện có chưa được thiết kế lại theo chất lượng thẩm mỹ MakerWorld. PETG là vật liệu in mặc định, không giới hạn loại sản phẩm. Nhóm Phụ kiện PETG đổi tên hiển thị thành Phụ kiện kỹ thuật. Không có chức năng giả lập AI để đưa vào sản xuất.

## Chạy thử trước khi đưa lên GitHub
1. Giải nén. Trên Windows có Python 3, chạy INSTALL_FONTS.bat để tải font chính thức vào assets/fonts (kèm giấy phép OFL và hash). Trình duyệt ưu tiên font dự án; khi thiếu font thử tải trực tiếp từ nguồn Google Fonts. Không phân phối font hệ thống trong ZIP. Nếu tất cả nguồn font lỗi, app báo rõ và vô hiệu hóa dựng chữ; các mẫu CAD không chữ vẫn có thể sử dụng.
2. Chạy START_JAYIT.bat; hoặc `python3 serve.py`. Vào http://127.0.0.1:8765/easy.html. Đây là chế độ thử thiết kế cục bộ, không gọi AI live vì mặc định Edge Function chỉ cho origin GitHub.
3. Chọn mẫu, nhập chữ, dùng góc nhìn Top, kiểm tra cảnh báo, xuất STL/3MF. Giữ file gốc, mở slicer trước khi in. Không cần tài khoản AI cho thiết kế thủ công.
4. Nếu quyết định triển khai ứng viên này, sao lưu dữ liệu JSON, giữ lại cấu hình cloud-config.js nếu đã sửa, đưa các file web ở thư mục gốc cùng previews/ và assets/fonts/ vào GitHub TK-JAY/IN3D. Không đưa secrets hoặc các file chứa dữ liệu khách hàng. Không cần đưa thư mục tests/, backend/ hoặc scripts/ lên Pages. Có thể dùng git commit/push một lần. Mở https://tk-jay.github.io/IN3D/easy.html sau khi Actions báo thành công. Không xóa IndexedDB/localStorage.
5. Người dùng muốn nghiệm thu cả B–E rồi mới deploy thì giữ ZIP này ở máy, chưa cập nhật website.

## Kích hoạt AI riêng cho chủ xưởng (chưa thực hiện trên máy chủ thật)
- Cần Supabase project đã tạo, tài khoản Authentication owner, API key OpenAI có billing API. ChatGPT Plus không bao gồm phí gọi API.
- Dùng Supabase CLI đăng nhập, liên kết project. Từ thư mục backend (chứa supabase/), chạy `supabase link --project-ref <project-ref>` và `supabase db push` sau khi đọc migration. Hoặc chạy SQL migration qua SQL Editor trước khi triển khai function. Không chạy lại setup SQL cũ nếu không cần.
- Trong Edge Functions Secrets, thiết lập OPENAI_API_KEY, JAYIT_LLM_MODEL (tên model API hỗ trợ Chat Completions structured outputs, xác nhận trong tài khoản), JAYIT_PUBLIC_KEY (publishable/anon), JAYIT_AI_OWNER_UID (UUID người dùng Authentication), JAYIT_ALLOWED_ORIGIN = https://tk-jay.github.io. SUPABASE_URL và SUPABASE_SERVICE_ROLE_KEY do Edge runtime cung cấp; không đưa secret vào frontend hay GitHub.
- Chạy `supabase functions deploy jayit-maker --no-verify-jwt` từ backend. Cấu hình này cho phép handler xác thực access token với Supabase Auth qua /auth/v1/user và kiểm tra owner UID trước khi gọi dịch vụ; không phải endpoint công khai cho mọi người. Kiểm tra xác thực trên project thực tế trước khi dùng. Mặc định quota 3/phút, 20/ngày UTC/owner, 100/ngày tổng. Lượt đã đặt quota vẫn tính nếu provider lỗi. SQL dùng khóa giao dịch; chưa kiểm thử database thật hoặc tính tiền thực tế.
- Trên easy.html, mở AI Maker, đăng nhập bằng tài khoản owner (public URL + publishable/anon key), nhập mô tả, đồng ý gửi dữ liệu/chi phí, bấm Tạo 1 thiết kế hoặc Gợi ý 3 thiết kế. Chọn phương án. Worker dựng và kiểm tra trước khi áp dụng. UI không tự gửi file khách hàng hoặc tự đặt in. Chi phí API phụ thuộc model, token, giá provider; giới hạn lượt không phải giới hạn tiền tuyệt đối. Cần thiết lập ngân sách ở tài khoản provider.
- AI chỉ hỗ trợ 8 mẫu có sẵn và danh sách thành phần; không phải AI text-to-mesh hoặc tự tạo mô hình tượng. Gợi ý 3 phương án cần được chọn thủ công, không tự ghi đè bản thiết kế.

## Kiểm tra in
Đo quét ngang/dọc đường bao chữ, cảnh báo phân vị 10% dưới 0,8 mm; đáy/thành theo tham số dưới 2,4 mm, relief dưới 0,8 mm; mặt hướng xuống quá 45° phía trên đáy; vỏ rời không chạm sàn. Đây là heuristic cho Easy Maker, không phải đo thành mỏng 3D tổng quát, phân tích cầu nối hay slicer. Gợi ý sửa chỉ áp dụng khi dựng lại thành công và giảm số cảnh báo, có xác nhận và Undo. Cảnh báo không thay thế kiểm tra vật lý.

## Báo cáo kiểm thử 3.4
| Tính năng | Trạng thái | Bằng chứng | Hạn chế |
|---|---|---|---|
| Lõi mesh | Regression 14/14 PASS | tests/maker-mesh-regression.log | Giữ giới hạn 3.2; không kiểm thử lại slicer |
| Mẫu/biến thể | 10/10 + 216/216 PASS | tests/maker-geometry-regression.log | 8 mẫu, 18 họ hình × 12 kích thước, không phải 216 hình độc lập |
| Dựng chữ đúng chiều | PASS mẫu BÉ BẢO | maker-top-preview.png, maker-stl-top.png, maker-independent.log | Một mẫu, font fixture; chưa nghiệm thu mọi font/camera GPU |
| Font dự án | Loader + script | maker-browser.log | Test dùng font Noto cục bộ, Nunito thay bằng NotoSans fixture; tải chính thức/CDN chưa kiểm thử, không kèm font binary |
| Schema/handler/quota | 11/11 PASS | maker-test.log | Auth, DB RPC, LLM giả lập; chưa chạy Edge/SQL thật |
| Gợi ý 3 phương án + áp dụng | PASS Chromium | maker-browser.log | Upstream giả lập, worker thật, origin nội tuyến |
| Đo nét và sửa độ dày | PASS test đơn vị | maker-test.log | Chưa đo khoảng cách bề mặt tổng quát |
| STL/3MF | PASS độc lập | maker-independent.log | Chưa kiểm thử AMS/Orca thực tế |
| Undo/Redo, liên kết Studio | PASS test UI | maker-browser.log, maker-integration.log | Chưa kiểm thử lưu phiên thật trên GitHub |
| B: ảnh/logo, lithophane, chữ chìm/cong/viền | Chưa nâng cấp | — | Công cụ cũ giữ nguyên phạm vi trước |
| C: 30 mẫu, 100 hình độc lập, chốt âm/dương | Chưa đạt | — | Chưa triển khai mục tiêu mới |
| D: liên kết báo giá/AMS | Chưa nghiệm thu | — | Báo giá cũ còn, 3MF core; không có xác nhận profile AMS |
| E: VI/EN đầy đủ, mobile | Một phần | UI có song ngữ | Chưa dịch hết thông báo hệ thống, chưa test toàn diện bản mới trên mobile |

## Chạy test
Tại thư mục gốc: `node tests/maker.test.mjs`, `node tests/mesh.test.cjs`, `node tests/easy-geometry.test.cjs`. Python dependencies: playwright, pillow, trimesh, numpy; Chromium executable `/usr/bin/chromium` theo script môi trường Linux. Sau cài font chính thức, `python tests/maker-browser.py`, `python tests/maker-independent.py`, `python tests/easy-integration.py`. Browser test nội tuyến do môi trường thử nghiệm chặn origin. Có thể dùng biến JAYIT_TEST_FONTS cho các fixture Noto tương thích trong môi trường test; không phân phối các file font đó. Kết quả thực tế nằm trong tests/*.log. Các log cũ không phải nghiệm thu bản mới. Test browser lấy screenshot top 782×351, test độc lập đối chiếu đúng kích thước ảnh của fixture này.

## Checklist slicer trước khi sản xuất
Mở 3MF trong Bambu Studio hoặc OrcaSlicer, kiểm tra số part và material ID; nếu màu không tự ánh xạ, gán filament cho từng part. Chọn máy, nozzle, vật liệu PETG thật, kiểm tra đáy, support, khoảng cách, mối ghép và từng lớp sau slice. Đọc thời gian và gram từ slicer rồi nhập báo giá, in thử trước sản xuất. Đây là checklist, không phải xác nhận đã thử trong slicer.
