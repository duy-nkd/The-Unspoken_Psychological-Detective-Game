package com.capstone.detectivegame.admin.dto;

import com.capstone.detectivegame.evidence.EvidenceMaster;

/** Dòng danh mục bằng chứng chuẩn toàn hệ thống (bảng evidence_master — §2.1). */
public record AdminEvidenceDto(
        Long id,
        int chapterId,
        String evidenceCode,
        String evidenceName,
        String description,
        String imageUrl) {

    private static final String IMG_PREFIX = "[[IMG:";
    private static final String IMG_SUFFIX = "]]\n";

    public static AdminEvidenceDto from(EvidenceMaster entity) {
        String raw = entity.getDescription() != null ? entity.getDescription() : "";
        String imageUrl = null;
        String cleanDesc = raw;

        if (raw.startsWith(IMG_PREFIX)) {
            int endIdx = raw.indexOf(IMG_SUFFIX);
            if (endIdx > IMG_PREFIX.length()) {
                imageUrl = raw.substring(IMG_PREFIX.length(), endIdx).trim();
                cleanDesc = raw.substring(endIdx + IMG_SUFFIX.length());
            }
        }

        if ((imageUrl == null || imageUrl.isEmpty()) && "EV_NeckScratches".equals(entity.getEvidenceCode())) {
            imageUrl = "/assets/images/characters/Tung.png";
        }

        return new AdminEvidenceDto(
                entity.getId(),
                entity.getChapterId(),
                entity.getEvidenceCode(),
                entity.getEvidenceName(),
                cleanDesc,
                imageUrl);
    }

    public static String packDescriptionWithImage(String description, String imageUrl) {
        String cleanDesc = description != null ? description.trim() : "";
        String cleanImg = imageUrl != null ? imageUrl.trim() : "";
        if (cleanImg.isEmpty()) {
            return cleanDesc;
        }
        return IMG_PREFIX + cleanImg + IMG_SUFFIX + cleanDesc;
    }
}
