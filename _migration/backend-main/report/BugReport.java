package com.capstone.detectivegame.report;

import com.capstone.detectivegame.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

/**
 * Bảng bug_reports — Project.docx §2.1.
 * user_id cho phép NULL; FK fk_bug_reports_user ON DELETE SET NULL (db/schema.sql).
 */
@Entity
@Table(name = "bug_reports")
public class BugReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "report_content", columnDefinition = "TEXT", nullable = false)
    private String reportContent;

    @Column(name = "status", length = 20, nullable = false)
    private String status = BugReportStatus.PENDING;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    protected BugReport() {
        // JPA
    }

    public BugReport(User user, String reportContent) {
        this.user = user;
        this.reportContent = reportContent;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getReportContent() {
        return reportContent;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
