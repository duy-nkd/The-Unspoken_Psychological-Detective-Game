# The Unspoken - Psychological Detective Game

## Cấu trúc

- `frontend/`: React + Vite + Phaser, các API client Axios và asset game.
- `backend/`: Spring Boot + Spring Data JPA + MySQL, cấu trúc controller/service/repository.

## Chạy frontend

```powershell
cd frontend
npm install
npm run dev
```

Có thể đổi URL backend bằng biến `VITE_API_URL` (mặc định `http://localhost:8080/api`).

## Chạy backend

Yêu cầu Java 17+, Maven và MySQL. Thiết lập `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET` nếu không dùng giá trị mặc định trong `application.yml`, sau đó:

```powershell
cd backend
mvn spring-boot:run
```

Các controller và Phaser scene hiện là skeleton để cả nhóm mở rộng theo từng chapter.

### Cài Maven trên Windows không cần quyền Administrator

Nếu `mvn` chưa có trong PATH và máy không cho cài Chocolatey/winget, có thể tải Maven vào thư mục user:

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

Sau đó chạy test backend bằng đường dẫn Maven vừa cài:

```powershell
cd backend
& (Join-Path $HOME "tools\apache-maven-3.9.11\bin\mvn.cmd") test
```
