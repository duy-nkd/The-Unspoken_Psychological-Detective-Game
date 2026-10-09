package com.capstone.detectivegame.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

/**
 * Bảng users — Project.docx §2.1 (SQL gốc: backend/src/main/resources/db/schema.sql).
 * created_at do MySQL tự điền (DEFAULT CURRENT_TIMESTAMP) -> insertable/updatable = false.
 */
@Entity
@Table(name = "users", indexes = @Index(name = "idx_users_username", columnList = "username"))
public class User {

    public static final String ROLE_PLAYER = "ROLE_PLAYER";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", length = 50, nullable = false, unique = true)
    private String username;

    @Column(name = "email", length = 100, nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", length = 255, nullable = false)
    private String passwordHash;

    @Column(name = "role", length = 20, nullable = false)
    private String role = ROLE_PLAYER;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    protected User() {
        // JPA
    }

    public User(String username, String email, String passwordHash) {
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public String getRole() {
        return role;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
