-- =====================================================================
-- Schema gốc — trích NGUYÊN VĂN Project.docx §2.1 và §2.2.
-- Đây là nguồn sự thật của cấu trúc CSDL. Entity JPA phải khớp file này
-- (application.yml dùng ddl-auto=validate để phát hiện lệch ngay khi khởi động).
--
-- Chạy một lần trên database rỗng, ví dụ:
--   mysql -u root -p detective_game < backend/src/main/resources/db/schema.sql
-- Thay đổi schema: phải được người dùng duyệt trước (PROJECT_MEMORY.md mục A).
-- =====================================================================

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'ROLE_PLAYER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE game_saves (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    current_chapter INT NOT NULL DEFAULT 1,
    credibility_score INT NOT NULL DEFAULT 100,
    save_data_json LONGTEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_game_saves_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE evidence_master (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    chapter_id INT NOT NULL,
    evidence_code VARCHAR(50) NOT NULL UNIQUE,
    evidence_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE bug_reports (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    report_content TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_bug_reports_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_game_saves_user_id ON game_saves(user_id);
CREATE INDEX idx_evidence_master_code ON evidence_master(evidence_code);
