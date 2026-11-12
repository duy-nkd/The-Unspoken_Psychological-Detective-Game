package com.capstone.detectivegame.admin.dto;

/** Payload thêm mới hoặc chỉnh sửa một vật chứng trong bảng evidence_master. */
public record SaveEvidenceRequest(
        Integer chapterId,
        String evidenceCode,
        String evidenceName,
        String description,
        String imageUrl) {

    public SaveEvidenceRequest(Integer chapterId, String evidenceCode, String evidenceName, String description) {
        this(chapterId, evidenceCode, evidenceName, description, null);
    }
}

