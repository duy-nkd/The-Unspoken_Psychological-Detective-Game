package com.capstone.detectivegame.game;

import com.capstone.detectivegame.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

/**
 * Bảng game_saves — Project.docx §2.1.
 * save_data_json LONGTEXT: Notebook / vật chứng / timeline / lời khai serialize thành JSON.
 * FK fk_game_saves_user ON DELETE CASCADE được định nghĩa trong db/schema.sql.
 * updated_at do MySQL quản lý (DEFAULT ... ON UPDATE CURRENT_TIMESTAMP).
 */
@Entity
@Table(name = "game_saves", indexes = @Index(name = "idx_game_saves_user_id", columnList = "user_id"))
public class GameSave {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "current_chapter", nullable = false)
    private int currentChapter = 1;

    @Column(name = "credibility_score", nullable = false)
    private int credibilityScore = 100;

    @Column(name = "save_data_json", columnDefinition = "LONGTEXT", nullable = false)
    private String saveDataJson;

    @Column(name = "updated_at", columnDefinition = "TIMESTAMP", insertable = false, updatable = false)
    private LocalDateTime updatedAt;

    protected GameSave() {
        // JPA
    }

    public GameSave(User user) {
        this.user = user;
    }

    public void updateProgress(int currentChapter, int credibilityScore, String saveDataJson) {
        this.currentChapter = currentChapter;
        this.credibilityScore = credibilityScore;
        this.saveDataJson = saveDataJson;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public int getCurrentChapter() {
        return currentChapter;
    }

    public int getCredibilityScore() {
        return credibilityScore;
    }

    public String getSaveDataJson() {
        return saveDataJson;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
