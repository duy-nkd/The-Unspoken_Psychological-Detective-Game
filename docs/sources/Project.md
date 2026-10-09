> **Bản chuyển đổi tự động** từ `Project.docx` (pandoc → GitHub Markdown) để đọc nhanh. Bản gốc có giá trị cao nhất là `Project.docx`; nếu nghi ngờ sai lệch (định dạng SQL, ký tự đặc biệt) thì đối chiếu bản gốc.

**Response: BÁO CÁO KỸ THUẬT HỆ THỐNG: ĐỒ ÁN TỐT NGHIỆP CAPSTONE PROJECT (FULL-STACK TECHNICAL MASTER REPORT)**

**Đề tài đồ án:** "2D Detective Visual Novel & Investigation Puzzle System"

**Mã kịch bản trọng tâm:** *Mạng lưới K-Estate & Sức ám ảnh 15 năm*

**Quy mô triển khai:** Đồ án tốt nghiệp cấp cao kéo dài qua 3 kỳ học liên tiếp (Capstone 1, Capstone 2, Capstone 3)

**Nhóm chủ trì kỹ thuật:** Nhóm 3 sinh viên chuyên ngành Kỹ thuật Phần mềm

**1. TỔNG QUAN HỆ THỐNG & KIẾN TRÚC CÔNG NGHỆ (FULL-STACK ARCHITECTURE)**

**1.1. Phân tích lý do chọn mô hình Client-Server phân rã (Hybrid Layered Architecture)**

Hệ thống được kiến trúc hóa theo mô hình Client-Server phân rã (Hybrid Layered Architecture), tạo ra ranh giới tách biệt rõ ràng giữa tầng hiển thị/tương tác game trên trình duyệt (Frontend Client) và tầng xử lý nghiệp vụ trung tâm, lưu trữ cơ sở dữ liệu (Backend Server).

- **Lý do lựa chọn Frontend (ReactJS kết hợp Phaser 3 Engine):** ReactJS đảm nhận việc quản lý toàn bộ cấu trúc giao diện ứng dụng web Single Page Application (SPA), hệ thống định tuyến (Routing), quản lý trạng thái xác thực người dùng và giao diện quản trị Admin Dashboard. Tuy nhiên, ReactJS thuần túy không được thiết kế để xử lý đồ họa thời gian thực, vòng lặp game (Game Loop) 60 FPS, va chạm vật lý hay quản lý sprite sheets phức tạp. Do đó, việc tích hợp **Phaser 3 Engine** chạy trực tiếp trên HTML5 Canvas giúp giải quyết triệt để bài toán render đồ họa 2D/2.5D, quản lý các Scene (màn chơi), hiệu ứng chữ chạy (Typewriter effect) và hệ thống âm thanh, trong khi vẫn tận dụng được sức mạnh quản lý state của React.

- **Lý do lựa chọn Backend (Spring Boot & Javascript):** Ngôn ngữ Javascript kết hợp framework Spring Boot cung cấp một nền tảng doanh nghiệp (Enterprise-grade) có độ ổn định cực cao, khả năng quản lý luồng đồng thời tốt và hệ sinh thái bảo mật mạnh mẽ. Spring Boot chịu trách nhiệm đóng gói toàn bộ business logic của trò chơi, kiểm tra tính toàn vẹn của dữ liệu, quản lý tiến trình chơi qua RESTful APIs và bảo vệ hệ thống trước các nguy cơ tấn công mạng.

- **Lý do lựa chọn Database (MySQL):** Hệ quản trị cơ sở dữ liệu quan hệ MySQL cung cấp môi trường lưu trữ toàn vẹn theo chuẩn ACID, hỗ trợ các ràng buộc khóa ngoại chặt chẽ để quản lý thông tin tài khoản người dùng, liên kết dữ liệu tiến trình game, bảng danh mục chứng cứ và các báo cáo lỗi từ phía client.

**1.2. Sơ đồ tương tác luồng dữ liệu (Data Flow Diagram) chi tiết qua 5 bước**

Luồng dữ liệu vận hành khép kín giữa các thành phần trong hệ thống được định nghĩa qua 5 giai đoạn tuần tự:

1.  **Bước 1 (Client Request):** Người chơi thực hiện thao tác tương tác trên giao diện Phaser hoặc trang quản trị React (ví dụ: thực hiện đăng nhập, bấm lưu tiến trình chơi, hoặc gửi báo cáo lỗi). Client đóng gói payload thành định dạng JSON và khởi tạo HTTP Request thông qua Axios Client, trong đó bắt buộc đính kèm JWT Token vào Header theo chuẩn Authorization: Bearer \<token\>.

2.  **Bước 2 (API Gateway / Spring Controller):** HTTP Request đi đến Spring Boot Server, được tiếp nhận bởi tầng Controller tương ứng (như AuthController, GameProgressController, BugReportController). Controller thực hiện việc ánh xạ dữ liệu request thông qua các lớp DTO (Data Transfer Object).

3.  **Bước 3 (Security & JwtAuthenticationFilter):** Trước khi đi vào tầng logic, Spring Security cùng JwtAuthenticationFilter chặn request lại để trích xuất JWT Token từ Header. Bộ lọc thực hiện giải mã, kiểm tra chữ ký số (Secret Key) và thời hạn hiệu lực của token. Nếu hợp lệ, thông tin định danh được nạp vào SecurityContextHolder.

4.  **Bước 4 (Service Layer & Repository Layer):** Request tiếp tục được chuyển giao xuống Service Layer để thực thi toàn bộ business logic (ví dụ: tính toán điểm uy tín, xử lý chuỗi JSON của sổ tay Notebook). Sau đó, Service gọi đến Repository Layer (Spring Data JPA) để thực thi các câu lệnh truy vấn cấu trúc SQL xuống cơ sở dữ liệu MySQL.

5.  **Bước 5 (Database Response & HTTP Response):** Cơ sở dữ liệu trả kết quả về cho Repository → Service → Controller. Controller đóng gói dữ liệu phản hồi thành định dạng JSON với mã trạng thái HTTP tương ứng (ví dụ: 200 OK, 201 Created, 401 Unauthorized) và gửi trả về cho Client hiển thị lên màn hình giao diện.

**2. THIẾT KẾ CƠ SỞ DỮ LIỆU VÀ CÁC MÔ HÌNH THỰC THỂ (MYSQL SCHEMA DESIGN)**

**2.1. Cấu trúc SQL chi tiết của các bảng cốt lõi**

Hệ thống cơ sở dữ liệu được thiết kế tối ưu hóa cho ứng dụng game trinh thám tương tác thông qua 4 bảng cốt lõi:

- **Bảng users (Quản lý tài khoản và phân quyền người dùng):**  
  CREATE TABLE users (  
      id BIGINT AUTO_INCREMENT PRIMARY KEY,  
      username VARCHAR(50) NOT NULL UNIQUE,  
      email VARCHAR(100) NOT NULL UNIQUE,  
      password_hash VARCHAR(255) NOT NULL,  
      role VARCHAR(20) NOT NULL DEFAULT 'ROLE_PLAYER',  
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
  );

- **Bảng game_saves (Lưu trữ tiến trình chơi của người dùng):**

<!-- -->

- *Ghi chú kiến trúc:* Để tránh tình trạng phân rã thành hàng chục bảng quan hệ phức tạp cho từng vật chứng, lời khai hay tab sổ tay (gây suy giảm hiệu năng truy vấn khi game đang chạy thời gian thực), toàn bộ cấu trúc trạng thái của Sổ tay (Notebook), danh sách vật chứng đã nhặt, dòng thời gian và trạng thái mở khóa lời khai được serialize thành một cấu trúc chuỗi **JSON** và lưu trực tiếp vào trường kiểu LONGTEXT hoặc JSON.

CREATE TABLE game_saves (  
    id BIGINT AUTO_INCREMENT PRIMARY KEY,  
    user_id BIGINT NOT NULL,  
    current_chapter INT NOT NULL DEFAULT 1,  
    credibility_score INT NOT NULL DEFAULT 100,  
    save_data_json LONGTEXT NOT NULL,  
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  
    CONSTRAINT fk_game_saves_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE  
);

- **Bảng evidence_master (Danh mục chuẩn các bằng chứng toàn hệ thống):**  
  CREATE TABLE evidence_master (  
      id BIGINT AUTO_INCREMENT PRIMARY KEY,  
      chapter_id INT NOT NULL,  
      evidence_code VARCHAR(50) NOT NULL UNIQUE,  
      evidence_name VARCHAR(100) NOT NULL,  
      description TEXT NOT NULL  
  );

- **Bảng bug_reports (Tiếp nhận phản hồi lỗi real-time từ client):**  
  CREATE TABLE bug_reports (  
      id BIGINT AUTO_INCREMENT PRIMARY KEY,  
      user_id BIGINT,  
      report_content TEXT NOT NULL,  
      status VARCHAR(20) NOT NULL DEFAULT 'PENDING',  
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
      CONSTRAINT fk_bug_reports_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL  
  );

**2.2. Phân tích Khóa ngoại, tính toàn vẹn ACID và chiến lược Index**

- **Khóa ngoại và Ràng buộc toàn vẹn (Foreign Keys & ACID):** Các ràng buộc khóa ngoại (CONSTRAINT fk\_...) được thiết lập chặt chẽ giữa bảng game_saves, bug_reports với bảng users, kết hợp cơ chế ON DELETE CASCADE và ON DELETE SET NULL nhằm duy trì tính toàn vẹn tham chiếu theo chuẩn ACID (Atomicity, Consistency, Isolation, Durability) của RDBMS khi có thao tác xóa tài khoản hoặc cập nhật tiến trình.

- **Chiến lược đánh Index:** Hệ thống thực hiện đánh chỉ mục (INDEX) trên các trường thường xuyên tham gia vào điều kiện tìm kiếm hoặc phân đoạn dữ liệu lớn:  
  CREATE INDEX idx_users_username ON users(username);  
  CREATE INDEX idx_game_saves_user_id ON game_saves(user_id);  
  CREATE INDEX idx_evidence_master_code ON evidence_master(evidence_code);

**3.2. Đặc tả kỹ thuật từng màn chơi (Scene Management)**

- **MainMenuScene:** Quản lý giao diện sảnh chờ chính của game, cung cấp các tùy chọn khởi tạo phiên chơi mới, tải tiến trình đã lưu từ cơ sở dữ liệu (Load Game), hoặc truy cập bảng điều khiển âm thanh.

- **DialogueScene (Visual Novel Engine):** Chịu trách nhiệm hiển thị khung hội thoại, tên nhân vật, khung chân dung biểu cảm và hiện thực hóa **Hiệu ứng Typewriter** (chữ chạy từ từ từng ký tự) bằng cách đếm thời gian khung hình (time.addEvent) để cập nhật chuỗi string hiển thị. Dữ liệu hội thoại được nạp bất đồng bộ từ các tệp JSON kịch bản chuẩn hóa nằm trong thư mục public/assets/dialogues/.

- **RoomInvestigationScene (Màn điều tra 2.5D Point-and-Click):** Xây dựng trên không gian 2.5D với lớp nền (Background Layer) phối cảnh sâu. Người chơi điều khiển nhân vật hoặc trỏ chuột tương tác với các điểm nóng (Hotspots) để thu thập vật chứng. Tại Chương 5, scene này tích hợp cơ chế **Flashback Tương tác**: cho phép người chơi kích hoạt phím chuyển đổi mượt mà giữa hai không gian vật lý (Hiện tại và Quá khứ) trên cùng một tọa độ canvas để tìm kiếm sự thay đổi của dấu vết.

- **NotebookScene (Giao diện Sổ tay điều tra 4 tab):** Quản lý toàn bộ thông tin thu thập được chia thành 4 tab độc lập:

<!-- -->

- *Evidence (Bằng chứng):* Lưu danh sách vật phẩm đã nhặt kèm hình ảnh và mô tả chi tiết.

<!-- -->

- *People (Nhân thân):* Hồ sơ lý lịch và quan hệ của các nghi phạm.

<!-- -->

- *Timeline (Dòng thời gian):* Sắp xếp các mốc thời gian sự kiện nhằm phát hiện lỗ hổng logic.

<!-- -->

- *Statements (Lời khai):* Lưu trữ các phát biểu cốt lõi của NPC phục vụ cho quá trình đối chất.

<!-- -->

- **DeductionScene & Bàn ráp chứng cứ vật lý:** Màn hình giải đố suy luận cao cấp ở chương cuối. Hệ thống cung cấp giao diện bàn làm việc cho phép người chơi thực hiện các thao tác kéo thả (Drag-and-Drop), phóng to, xoay góc và so khớp trực tiếp nét khuyên tròn đặc trưng của chữ ký Chủ tịch Khang thu thập được từ các chương trước với mảnh chữ ký cháy xém để vạch trần tội ác.

**3.3. Thuật toán hiện thực hóa Thanh Uy Tín (Credibility Meter) và cơ chế Press/Present**

- **Thanh Uy Tín (Credibility Meter):** Được quản lý dưới dạng biến số nguyên credibility (giá trị khởi điểm từ 100 điểm). Nhằm ngăn chặn tình trạng người chơi bấm chọn bừa đáp án trong các màn suy luận, mỗi lần người chơi chọn sai bằng chứng khi đối chất hoặc chỉ định sai kết quả suy luận, hệ thống sẽ kích hoạt hàm trừ điểm:  
  credibility=max(0,credibility−Δ*P*)  
  Trong đó Δ*P* là mức phạt tùy thuộc vào độ khó của câu hỏi (thường từ 15 đến 30 điểm), đồng thời kích hoạt hội thoại phản bác từ NPC. Khi credibility=0, trò chơi lập tức kích hoạt màn hình **Bad Ending** ngắn và hiển thị tùy chọn tải lại checkpoint gần nhất.

- **Cơ chế Press / Present:** Trong phân đoạn thẩm vấn, người chơi có hai quyền lựa chọn tương tác chính:

<!-- -->

- *Press (Ép cung):* Tác động vào một dòng lời khai để ép nghi phạm buột miệng khai ra chi tiết mới (làm xuất hiện thêm một nhánh statement trong Sổ tay).

<!-- -->

- *Present (Trình bày bằng chứng):* Mở giao diện Sổ tay, chọn một vật chứng hoặc một lời khai tương thích để đối chiếu trực tiếp, chứng minh lời nói của nghi phạm là gian dối. Nếu chọn đúng, cốt truyện tiếp diễn; nếu chọn sai, Thanh Uy Tín bị trừ điểm phạt.

**4.2. Thiết lập bảo mật Spring Security và JWT Token Filter**

- **Cấu hình Spring Security (SecurityConfig):** Vô hiệu hóa cơ chế bảo vệ CSRF do ứng dụng sử dụng kiến trúc REST API Stateless hoàn toàn độc lập với session cookie. Cấu hình CORS cho phép nguồn từ Frontend React truy cập an toàn. Phân quyền các đường dẫn HTTP:

<!-- -->

- /api/auth/\*\*: Cho phép truy cập công khai (Permit All) phục vụ đăng nhập và đăng ký.

<!-- -->

- /api/game/\*\* và /api/admin/\*\*: Bắt buộc yêu cầu xác thực thông qua token hợp lệ.

<!-- -->

- **Xác thực JWT Token Filter (JwtAuthenticationFilter):** Bộ lọc tùy chỉnh kế thừa từ OncePerRequestFilter, thực hiện chặn mọi request đi qua, trích xuất chuỗi token từ HTTP Header Authorization, tiến hành kiểm tra chữ ký số bằng thư viện JJWT dựa trên Secret Key cấu hình trong application.yml. Nếu token hợp lệ và chưa hết hạn, đối tượng UsernamePasswordAuthenticationToken được khởi tạo và gán vào SecurityContextHolder, cho phép request tiếp tục tiến vào Controller.

**4.3. Đặc tả chi tiết các REST API Endpoints cốt lõi**

- **Authentication API:**

<!-- -->

- POST /api/auth/register: Đăng ký tài khoản người chơi mới.

<!-- -->

- *Request Payload:* {"username": "string", "email": "string", "password": "string"}

<!-- -->

- *Response:* 201 Created kèm thông báo thành công.

<!-- -->

- POST /api/auth/login: Xác thực thông tin đăng nhập.

<!-- -->

- *Request Payload:* {"username": "string", "password": "string"}

<!-- -->

- *Response (200 OK):* {"token": "eyJhbGciOi...", "type": "Bearer", "username": "string", "role": "ROLE_PLAYER"}

<!-- -->

- **Game Progress API:**

<!-- -->

- POST /api/game/save: Lưu trữ hoặc cập nhật tiến trình chơi hiện tại.

<!-- -->

- *Request Payload:* {"userId": 1, "currentChapter": 2, "credibilityScore": 85, "saveDataJson": "{...}"}

<!-- -->

- *Response (200 OK):* {"message": "Game progress saved successfully", "updatedAt": "2026-10-07T..."}

<!-- -->

- GET /api/game/load/{userId}: Tải tiến trình chơi gần nhất của người dùng.

<!-- -->

- *Response (200 OK):* Trả về toàn bộ cấu trúc trạng thái hiện tại của game (chapter, credibility, save_data_json).

<!-- -->

- **Bug Report API:**

<!-- -->

- POST /api/reports/bug: Tiếp nhận báo cáo lỗi từ phía client.

<!-- -->

- *Request Payload:* {"userId": 1, "reportContent": "Bug description..."}

<!-- -->

- *Response (201 Created):* Xác nhận ghi nhận báo cáo.

**5. GIAO DIỆN QUẢN TRỊ (ADMIN DASHBOARD) & KIỂM THỬ TÍCH HỢP**

**5.1. Thiết kế chi tiết giao diện Admin Dashboard**

Trang quản trị hệ thống dành riêng cho giảng viên và đội ngũ vận hành được xây dựng bằng ReactJS kết hợp framework giao diện Tailwind CSS:

- **Thống kê tổng quan (Analytics Overview):** Hiển thị số lượng tài khoản người dùng hoạt động, biểu đồ tỷ lệ phần trăm người chơi hoàn thành từng chương game (từ Chương 1 đến Chương 5).

- **Quản lý Báo cáo lỗi (Bug Reports Management):** Bảng dữ liệu thời gian thực hiển thị danh sách các phản hồi lỗi từ người dùng gửi lên qua game client. Cung cấp tính năng thao tác trực tiếp cho phép Admin chuyển đổi trạng thái báo cáo từ PENDING (Đang chờ xử lý) sang RESOLVED (Đã khắc phục) ngay trên giao diện.

**5.2. Phương pháp kiểm thử tích hợp (End-to-End Testing)**

Quá trình kiểm thử tích hợp (End-to-End Testing) được thiết lập nhằm đảm bảo tính toàn vẹn và không xảy ra thất thoát dữ liệu trong toàn bộ luồng vận hành từ Client đến Database và Dashboard:

- **Kịch bản kiểm thử:** Người chơi thực hiện hành động khám phá hiện trường, thu thập bằng chứng và bấm nút "Lưu game" trên Phaser Client (user có thể save thủ công bất kỳ lúc nào/ auto save sẽ hoạt động mỗi 5 phút hoặc sự kiện quan trong ví dụ như user tìm được bằng chứng.) → Client khởi tạo request gọi API POST /api/game/save kèm JWT token → Spring Boot Server tiếp nhận, xác thực và thực thi câu lệnh SQL ghi nhận vào bảng game_saves trong cơ sở dữ liệu MySQL → Kiểm chứng trực tiếp dữ liệu trong cơ sở dữ liệu để đảm bảo chuỗi JSON lưu trạng thái Sổ tay không bị cắt cụt hay sai định dạng → Đăng nhập tài khoản quản trị vào Admin Dashboard để kiểm tra số liệu đồng bộ thời gian thực.

**6. LỘ TRÌNH TRIỂN KHAI CHI TIẾT 3 KỲ CAPSTONE (3-SEMESTER MASTER ROADMAP)**

**6.1. Phân rã tiến độ chi tiết từng giai đoạn**

- **Capstone 1 (Kỳ 1): Core Vertical Slice & Chapter 1**

<!-- -->

- Xây dựng nền móng kiến trúc Full-stack tổng thể, hoàn thành phân đoạn Chapter 1 (*Án mạng trong phòng trọ*) chạy thông suốt từ Phaser Client gọi API xuống Spring Boot và MySQL.

<!-- -->

- *Các mốc bàn giao chính:* Hoàn thành Simple Demo cơ bản (Tuần 2), hoàn thiện hệ thống Notebook & Deduction Scene (Tuần 6), tích hợp Admin Dashboard (Tuần 8) và bảo vệ đồ án giai đoạn 1 trước hội đồng (Tuần 12).

<!-- -->

- **Capstone 2 (Kỳ 2): Content Expansion & Advanced Mechanics**

<!-- -->

- Mở rộng nội dung kịch bản sang các chương tiếp theo: Chương 2 (*Quán bar & mã MG-07*), Chương 3 (*Phòng làm việc ông Đạt & trâm gỗ*), và Chương 4 (*Kho lưu trữ & vi phim*).

<!-- -->

- Nâng cấp tầng Backend để lưu trữ cây suy luận phức tạp (Complex Deduction Trees) và tối ưu hóa Admin Dashboard thành công cụ phân tích hành vi người chơi.

<!-- -->

- **Capstone 3 (Kỳ 3): Climax, Polish & Graduation Release**

<!-- -->

- Triển khai Chương 5 (Chương kết - *Bằng chứng thép*), hoàn thiện cơ chế Flashback tương tác hiện tại/quá khứ và Bàn ráp chứng cứ so khớp chữ ký.

<!-- -->

- Hoàn thiện phân nhánh cốt truyện mang tính mở (Moral ambiguity) về người em gái, đồng thời tích hợp toàn bộ hệ thống âm thanh BGM/SFX, thực hiện Closed Beta, fix bug toàn diện và chuẩn bị hồ sơ bảo vệ tốt nghiệp trước Hội đồng Khoa học Khoa Công nghệ Thông tin.

**6.2. Phân rã nhiệm vụ rạch ròi cho nhóm 3 thành viên**

- **Thành viên 1 — Frontend & Game Client Engineer (React + Phaser):** Chịu trách nhiệm toàn bộ mã nguồn giao diện web React, phát triển các màn chơi Phaser (Visual Novel Engine, màn điều tra 2.5D Point-and-Click, hệ thống Sổ tay Notebook 4 tab, màn hình suy luận và bàn ráp chứng cứ so khớp chữ ký).

- **Thành viên 2 — Backend & Database Architect (Spring Boot + Java + MySQL):** Chịu trách nhiệm xây dựng toàn bộ tầng máy chủ RESTful API, thiết kế cấu trúc cơ sở dữ liệu MySQL tối ưu hóa cho hệ thống lưu trữ tiến trình game (chuỗi JSON), danh mục chứng cứ và bảo mật xác thực JWT.

- **Thành viên 3 — System Integration & Admin Dashboard Engineer (React + Spring Boot Integration):** Chịu trách nhiệm xây dựng giao diện trang quản trị Admin Dashboard chuyên nghiệp phục vụ thống kê số liệu người chơi và quản lý báo cáo lỗi real-time, đồng thời chủ trì thiết kế và thực thi kịch bản kiểm thử tích hợp (End-to-End Testing) cho toàn hệ thống.

**6.3. Phân tích rủi ro kỹ thuật thực tế và phương án phòng tránh triệt để**

1.  **Rủi ro mất kết nối mạng / API Server gặp sự cố khi đang Live Demo trước hội đồng:**

- *Phương án phòng tránh:* Hệ thống áp dụng thiết kế lưu trữ kết hợp **Hybrid Storage**. Ngoài việc đồng bộ tiến trình lên Cloud (MySQL thông qua API), game tự động sao lưu bản ghi trạng thái mới nhất vào localStorage của trình duyệt web. Nếu mất kết nối mạng đột ngột, trò chơi tự động chuyển sang chế độ offline cục bộ, tuyệt đối không làm crash game hay làm mất tiến trình chơi của người dùng.

1.  **Rủi ro lệch tiến độ phối hợp giữa lập trình viên Game Client và lập trình viên Backend:**

- *Phương án phòng tránh:* Thống nhất chặt chẽ **API Contract** (định dạng đường dẫn, phương thức HTTP, cấu trúc Request/Response JSON) và định dạng file kịch bản JSON ngay từ tuần đầu tiên của Capstone 1. Thành viên phụ trách Frontend có thể sử dụng dữ liệu giả lập (Mock Data) để phát triển song song các tính năng game mà không cần chờ Backend hoàn thành 100% mã nguồn thực tế.
