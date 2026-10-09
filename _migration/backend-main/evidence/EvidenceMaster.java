package com.capstone.detectivegame.evidence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;

/**
 * Bảng evidence_master — danh mục chuẩn bằng chứng toàn hệ thống (Project.docx §2.1).
 * PENDING(ISS-19): chưa có API đọc và chưa có dữ liệu seed vật chứng.
 */
@Entity
@Table(name = "evidence_master", indexes = @Index(name = "idx_evidence_master_code", columnList = "evidence_code"))
public class EvidenceMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "chapter_id", nullable = false)
    private int chapterId;

    @Column(name = "evidence_code", length = 50, nullable = false, unique = true)
    private String evidenceCode;

    @Column(name = "evidence_name", length = 100, nullable = false)
    private String evidenceName;

    @Column(name = "description", columnDefinition = "TEXT", nullable = false)
    private String description;

    protected EvidenceMaster() {
        // JPA
    }

    public Long getId() {
        return id;
    }

    public int getChapterId() {
        return chapterId;
    }

    public String getEvidenceCode() {
        return evidenceCode;
    }

    public String getEvidenceName() {
        return evidenceName;
    }

    public String getDescription() {
        return description;
    }
}
