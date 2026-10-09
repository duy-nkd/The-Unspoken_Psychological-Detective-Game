# The Unspoken — Psychological Detective Game

Đồ án Capstone **"2D Detective Visual Novel & Investigation Puzzle System"** — kịch bản *Mạng lưới K-Estate & Sức ám ảnh 15 năm*.

| Phần | Công nghệ |
|---|---|
| Frontend | React 19 + Vite + **Phaser 4.2.1** + Axios + React Router + Tailwind CSS (JavaScript) |
| Backend | Spring Boot 3.4 (Java 17) + Spring Security + JJWT + Spring Data JPA |
| CSDL | MySQL |

## Tài liệu trong repo
| File | Nội dung |
|---|---|
| `CLAUDE.md` | Hướng dẫn cho Claude Code: quy tắc làm việc, lệnh, cấu trúc — tự đọc khi chạy `claude` |
| `docs/sources/` | Tài liệu gốc: `Project.docx` (+ bản `.md`), `Story.txt`, `working-rules.md` — không sửa |
| `PROJECT_MEMORY.md` | Yêu cầu trích từ Project.docx/Story.txt, điểm chờ xác nhận (ISS), quyết định đã duyệt (DEC) |
| `PROGRESS_LOG.md` | Nhật ký tiến độ + điểm khôi phục |
| `docs/ARCHITECTURE.md` | Cấu trúc thư mục, luồng dữ liệu, bản đồ yêu cầu → mã nguồn |
| `docs/CONVENTIONS.md` | Quy ước đặt tên, thêm scene/endpoint, debug, git |

## Áp dụng tái cấu trúc T-002 (chỉ làm một lần)

> Cần làm khi thư mục `_migration/` còn tồn tại. Nếu `_migration/` đã biến mất thì bước này đã xong, bỏ qua mục này.
> Tất cả lệnh chạy trong **PowerShell**, tại thư mục gốc repo.

### Bước 0 — Kiểm tra công cụ
```powershell
node -v
npm -v
java -version
mvn -v
mysql --version
```
Cần **Node 20.19+** (khuyên dùng Node 22 LTS), **Java 17+**, Maven, MySQL.
- Không có `mvn` → dùng Maven cài theo mục "Cài Maven trên Windows" bên dưới, thay `mvn` bằng `& "$HOME\tools\apache-maven-3.9.11\bin\mvn.cmd"`.
- Không có `mysql` → dùng MySQL Workbench ở Bước 5.

### Bước 1 — Tạo điểm lưu git
```powershell
cd C:\The-Unspoken_Psychological-Detective-Game
if (Test-Path .\PROGRESS_LOG-1.md) { Remove-Item .\PROGRESS_LOG-1.md }   # bản sao thừa, nếu có
git add -A
git commit -m "chore: snapshot truoc khi ap dung tai cau truc T-002"
```
Cần quay lại trạng thái này: `git reset --hard HEAD` rồi `git clean -fd`.

### Bước 2 — Chạy thử script (không thay đổi gì)
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\apply-restructure.ps1 -DryRun
```
Đúng khi thấy danh sách `[dry-run] delete ...` (`frontend\src\api`, `frontend\src\pages`, `package.json` gốc, `backend\...\controller`…) và `[dry-run] copy ...` (khoảng 32 file Java). Có chữ đỏ báo lỗi → dừng lại, không chạy tiếp.

### Bước 3 — Chạy thật
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\apply-restructure.ps1
git add --renormalize .
```
Gõ **`YES`** khi được hỏi. Script xóa file cũ, chuyển Java vào package, xóa `_migration` và chạy `npm install`.
Nếu `npm install` báo **ERESOLVE**:
```powershell
cd frontend; npm install --legacy-peer-deps; cd ..
```

### Bước 4 — Kiểm tra frontend
```powershell
cd frontend
npm run check
cd ..
```
Đúng khi Vitest báo **21 tests passed** và Vite báo `✓ built in ...`. Chỉ lỗi `format:check` → chạy `npm run format` rồi chạy lại.

### Bước 5 — Tạo cơ sở dữ liệu
⚠️ Lệnh dưới **xóa database `detective_game` cũ** — sao lưu trước nếu có dữ liệu cần giữ.
```powershell
mysql -u root -p -e "DROP DATABASE IF EXISTS detective_game; CREATE DATABASE detective_game;"
Get-Content .\backend\src\main\resources\db\schema.sql | mysql -u root -p detective_game
mysql -u root -p -e "SHOW TABLES FROM detective_game;"
```
Đúng khi có 4 bảng: `bug_reports`, `evidence_master`, `game_saves`, `users`.
Dùng MySQL Workbench: tạo schema `detective_game` → File → Open SQL Script → `schema.sql` → bấm ⚡.

### Bước 6 — Kiểm tra & chạy backend
```powershell
cd backend
$env:DB_PASSWORD = "mat_khau_mysql_cua_ban"   # bỏ qua nếu root không có mật khẩu
mvn clean test
mvn spring-boot:run
```
`mvn clean test` → `Tests run: 4, Failures: 0` + `BUILD SUCCESS`. `spring-boot:run` → log có `Tomcat started on port 8080`. Giữ cửa sổ này mở.

### Bước 7 — Chạy thử end-to-end
Mở PowerShell **thứ hai**:
```powershell
cd C:\The-Unspoken_Psychological-Detective-Game\frontend
npm run dev
```
Mở `http://localhost:5173`:
1. **Đăng ký** → tự chuyển sang trang đăng nhập.
2. **Đăng nhập** → vào trang chơi.
3. **New Game** → bấm qua hội thoại → màn điều tra.
4. **N** mở/đóng Sổ tay 4 tab.
5. **S** lưu → hiện *"Đã lưu tạm trên trình duyệt (offline)"* — **đúng** ở thời điểm này vì login chưa trả `userId` (ISS-29).
6. F12 → Console: không có lỗi đỏ. Phím `` ` `` bật/tắt bảng debug góc trên phải; **F9** xem thử chủ trọ đứng trái/phải và nhép miệng (hội thoại DEMO).

### Bước 8 — Commit kết quả
```powershell
cd C:\The-Unspoken_Psychological-Detective-Game
git add -A
git commit -m "refactor: tai cau truc du an theo chuan studio (T-002)"
```

### Lỗi thường gặp
| Thông báo | Cách xử lý |
|---|---|
| `running scripts is disabled` | Chạy đúng lệnh có `-ExecutionPolicy Bypass` |
| `Schema-validation: missing table` / `wrong column type` | Chưa tạo bảng hoặc bảng cũ → làm lại Bước 5 |
| `Access denied for user 'root'` | Đặt đúng `$env:DB_PASSWORD` (Bước 6) |
| `app.jwt.secret phải dài tối thiểu 32 byte` | Xóa biến `JWT_SECRET` hoặc đặt chuỗi ≥ 32 ký tự |
| Lỗi CORS khi đăng nhập | Frontend phải ở cổng 5173, hoặc đặt `$env:CORS_ALLOWED_ORIGINS` đúng cổng |
| `Port 8080 was already in use` | Tắt backend cũ, hoặc `$env:SERVER_PORT=8081` và sửa `VITE_API_URL` tương ứng |

## Chạy frontend
```powershell
cd frontend
npm install
copy .env.example .env.local   # tùy chọn
npm run dev                    # http://localhost:5173
```
Lệnh khác: `npm run lint` · `npm run format` · `npm test` · `npm run build` · `npm run check` (chạy tất cả).

## Khởi tạo CSDL (một lần)
Schema là SQL nguyên văn trong `backend/src/main/resources/db/schema.sql`. Backend chạy `ddl-auto=validate` nên **bảng phải tồn tại và khớp schema**.
```powershell
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS detective_game"
Get-Content backend\src\main\resources\db\schema.sql | mysql -u root -p detective_game
```
> Nếu database cũ đã có bảng do `ddl-auto=update` tạo trước đây: xóa các bảng cũ (hoặc tạo database mới) rồi chạy lại lệnh trên. Tạm thời có thể đặt biến `JPA_DDL_AUTO=update` để chạy được ngay, nhưng bảng khi đó có thể lệch Project.docx §2.1.

## Chạy backend
Yêu cầu Java 17+, Maven, MySQL.
```powershell
cd backend
mvn spring-boot:run
mvn test
```
Biến môi trường (đều có giá trị mặc định cho dev trong `application.yml`):

| Biến | Ý nghĩa |
|---|---|
| `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` | Kết nối MySQL |
| `JWT_SECRET` | Khóa ký JWT, **tối thiểu 32 ký tự** |
| `JWT_EXPIRATION_MS` | Thời hạn token |
| `CORS_ALLOWED_ORIGINS` | Origin frontend, mặc định `http://localhost:5173` |
| `JPA_DDL_AUTO` | Mặc định `validate` |
| `LOG_LEVEL_APP`, `LOG_SQL` | Mức log ứng dụng / câu SQL |

### Cài Maven trên Windows không cần quyền Administrator
```powershell
$version = "3.9.11"
$tools = Join-Path $HOME "tools"
New-Item -ItemType Directory -Force $tools | Out-Null
Invoke-WebRequest `
  -Uri "https://archive.apache.org/dist/maven/maven-3/$version/binaries/apache-maven-$version-bin.zip" `
  -OutFile (Join-Path $tools "maven.zip")
Expand-Archive (Join-Path $tools "maven.zip") -DestinationPath $tools -Force
& (Join-Path $tools "apache-maven-$version\bin\mvn.cmd") -version
```
Chạy test backend bằng Maven vừa cài:
```powershell
cd backend
& (Join-Path $HOME "tools\apache-maven-3.9.11\bin\mvn.cmd") test
```
