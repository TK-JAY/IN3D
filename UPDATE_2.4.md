# JayIT 2.4 — GPU + Hunyuan AI

## Update website (from 2.3)
1. Export local JSON backup; keep it private.
2. Upload the eight files in PATCH to the repository root on main, replacing files with the same name. Keep other files. Commit and confirm GitHub Pages Actions is green.
3. Open https://tk-jay.github.io/IN3D/?v=2.4, hard reload. Header should show Studio Pro 2.4. The full package is for users missing earlier patches.
4. Open Xử lý mô hình → Tách khối 3D Pro. The new preview reports GPU or CPU depth, full triangle count, and smooth / sharp / clay modes. If WebGL is unavailable at initialization, CPU draws full triangles. If allocation fails later, the app may revert to the old sampled view and report the failure. Memory depends on geometry and hardware. The preview does not edit geometry or smooth color boundaries.
5. AI Studio → Hunyuan AI 3D. Use external Hunyuan studio, download a GLB/OBJ/STL, then import into Split. No Tencent API setup needed for this manual workflow. GLB imports static embedded triangle geometry, node transforms and base material color, converts meters to millimeters and Y-up to Z-up. Does not read texture, vertex colors, Draco, morphs, external buffers; check dimension before print. STL export/inspection/cutting limits from 2.2 remain. For models exceeding 900k faces use Blender to reduce/remesh before STL export. Do not use AI for exact technical parts without measuring. No automatic repair of self-intersections or conversion of texture into AMS colors.

## Optional direct API
See separate backend setup archive. Do not upload actual secrets to GitHub. The endpoint is restricted to one configured owner; direct generation is not yet live. Tencent API may cost money. Local modeling and import work without AI. Existing Supabase configuration and account data are unchanged; password recovery is not addressed here.

## Tests
JavaScript syntax checked. Chromium loaded inline app and worker via Blob (environment blocks normal navigation and WebGL); CPU preview displayed all 1,310,720 triangles of a synthetic GLB sphere at 100 mm, switched Clay shading, loaded a 2-color 3MF. GPU path and real Tencent calls, GitHub Pages deployment, slicer and physical prints not tested. No claim of full Blender parity.
