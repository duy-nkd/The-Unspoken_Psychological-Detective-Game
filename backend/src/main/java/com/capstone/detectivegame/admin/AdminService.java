package com.capstone.detectivegame.admin;

import com.capstone.detectivegame.admin.dto.AdminBugReportDto;
import com.capstone.detectivegame.admin.dto.AdminEvidenceDto;
import com.capstone.detectivegame.admin.dto.AdminOverviewResponse;
import com.capstone.detectivegame.admin.dto.AdminOverviewResponse.ChapterStatDto;
import com.capstone.detectivegame.admin.dto.AdminUserItemDto;
import com.capstone.detectivegame.admin.dto.AdminUserSaveDetailDto;
import com.capstone.detectivegame.admin.dto.SaveEvidenceRequest;
import com.capstone.detectivegame.common.ApiException;
import com.capstone.detectivegame.evidence.EvidenceMaster;
import com.capstone.detectivegame.evidence.EvidenceMasterRepository;
import com.capstone.detectivegame.game.GameSave;
import com.capstone.detectivegame.game.GameSaveRepository;
import com.capstone.detectivegame.report.BugReport;
import com.capstone.detectivegame.report.BugReportRepository;
import com.capstone.detectivegame.report.BugReportStatus;
import com.capstone.detectivegame.user.User;
import com.capstone.detectivegame.user.UserRepository;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Nghiệp vụ quản trị hệ thống (Project.docx §5.1, §5.2, §6.1 — DEC-024):
 * - Thống kê tài khoản hoạt động, tỷ lệ % hoàn thành Chương 1–5, phân tích uy tín
 * - Quản lý danh sách người chơi & kiểm tra chi tiết JSON Sổ tay (E2E §5.2)
 * - Quản lý báo cáo lỗi thời gian thực (PENDING <-> RESOLVED)
 * - Quản lý & nạp danh mục chứng cứ chuẩn (bảng evidence_master)
 */
@Service
public class AdminService {

    private static final List<ChapterMeta> CHAPTERS = List.of(
            new ChapterMeta(1, "Chương 1 — Án mạng trong phòng trọ"),
            new ChapterMeta(2, "Chương 2 — Con hẻm nơi quán bar"),
            new ChapterMeta(3, "Chương 3 — Phản bội"),
            new ChapterMeta(4, "Chương 4 — Mối đe dọa"),
            new ChapterMeta(5, "Chương 5 — Bằng chứng thép"));

    /** 12 vật chứng chuẩn của Chương 1 trích nguyên văn từ docs/sources/chapter1/data/evidence.json. */
    private static final List<EvidenceSeed> CHAPTER_1_EVIDENCE_SEEDS = List.of(
            new EvidenceSeed(1, "EV_LooseLock", "Ổ khóa cửa 204",
                    "Chốt tự động cửa 204 lỏng. Theo kiểm tra của cảnh sát, nếu không chủ động bấm chốt, tay nắm ngoài có thể mở cửa."),
            new EvidenceSeed(1, "EV_WetTowel", "Bồn rửa và khăn mặt",
                    "Khăn trên giá cạnh bồn còn ướt lạnh; vòi đóng chưa chặt. Dấu sử dụng phù hợp việc rửa mặt."),
            new EvidenceSeed(1, "EV_NeckScratches", "Vùng cổ và ngực áo Tùng",
                    "Ba vết cào đỏ rướm máu trên cổ, cổ áo xộc xệch. Phù hợp hướng tự cào trong cơn khó thở."),
            new EvidenceSeed(1, "EV_Inhaler", "Ống hít hen suyễn",
                    "Ống hít xanh nhạt nằm trên bàn, nắp mở. Có dấu chuẩn bị sử dụng, vật thật do cảnh sát quản lý."),
            new EvidenceSeed(1, "EV_InhalerBox", "Thùng rác và hộp thuốc đã bóc",
                    "Hộp giấy của một ống hít loại mới, đã bóc và bị nhàu, ở thùng rác dưới bàn. Có mép giấy rách."),
            new EvidenceSeed(1, "EV_RentReceipt", "Liên biên nhận thu tiền nhà",
                    "Biên nhận tiền phòng nằm trên bàn 204, dưới mép gạt tàn. Chữ ký Hòa ở mục người thu; ghi giờ 20:55."),
            new EvidenceSeed(1, "EV_MissingWatch", "Vòng trống trên lớp bụi mặt tủ",
                    "Khoảng sạch hình tròn trên bụi mặt tủ đầu giường, cỡ mặt đồng hồ đeo tay; đồng hồ báo thức nứt còn ở cạnh."),
            new EvidenceSeed(1, "EV_BoundaryCoin", "Đồng xu khắc mốc ranh giới",
                    "Đồng xu kim loại xỉn, nặng, khắc biểu tượng hình học giống mốc ranh giới; tìm dưới nệm Tùng."),
            new EvidenceSeed(1, "EV_PackagingMatch", "Mảnh hộp khớp",
                    "Mảnh nắp giấy trong đồ Minh giao kiểm tra khớp mép rách/họa tiết hộp thuốc ở 204."),
            new EvidenceSeed(1, "EV_OriginalInhaler", "Ống cũ thu theo chỉ dẫn",
                    "Ống cũ tìm đúng hốc chân cầu thang do Minh chỉ trước lúc tìm. Nhãn cá nhân đối chiếu hồ sơ thuốc Tùng."),
            new EvidenceSeed(1, "EV_MedicineAnalysis", "Báo cáo hai ống và nạn nhân",
                    "Ống bàn khác thuốc ghi nhãn (nhóm hóa chất vệ sinh); ống cũ phù hợp thuốc. Hồ sơ đối chiếu nạn nhân phù hợp."),
            new EvidenceSeed(1, "EV_KhangCertificate", "Ảnh giấy khen chữ ký Khang",
                    "Ảnh giấy khen hỗ trợ khu trọ, chữ ký Khang. Mẫu tài liệu công khai ở hành lang."));

    private final UserRepository userRepository;
    private final GameSaveRepository gameSaveRepository;
    private final BugReportRepository bugReportRepository;
    private final EvidenceMasterRepository evidenceMasterRepository;

    public AdminService(
            UserRepository userRepository,
            GameSaveRepository gameSaveRepository,
            BugReportRepository bugReportRepository,
            EvidenceMasterRepository evidenceMasterRepository) {
        this.userRepository = userRepository;
        this.gameSaveRepository = gameSaveRepository;
        this.bugReportRepository = bugReportRepository;
        this.evidenceMasterRepository = evidenceMasterRepository;
    }

    @Transactional(readOnly = true)
    public AdminOverviewResponse getOverview() {
        List<User> allUsers = userRepository.findAllByOrderByIdAsc();
        long totalPlayers = allUsers.stream()
                .filter(u -> !User.ROLE_ADMIN.equals(u.getRole()))
                .count();

        Map<Long, GameSave> latestSaveByUser = loadLatestSavesByUserId();
        List<GameSave> playerSaves = allUsers.stream()
                .filter(u -> !User.ROLE_ADMIN.equals(u.getRole()))
                .map(u -> latestSaveByUser.get(u.getId()))
                .filter(save -> save != null)
                .toList();

        long activePlayers = playerSaves.size();
        double avgCredibility = playerSaves.isEmpty()
                ? 100.0
                : Math.round(playerSaves.stream().mapToInt(GameSave::getCredibilityScore).average().orElse(100.0) * 10.0)
                        / 10.0;
        long lowCredibilityCount = playerSaves.stream()
                .filter(s -> s.getCredibilityScore() <= 30)
                .count();

        long denominator = Math.max(1L, activePlayers > 0 ? activePlayers : totalPlayers);
        List<ChapterStatDto> chapterStats = new ArrayList<>();
        for (ChapterMeta meta : CHAPTERS) {
            int ch = meta.chapter();
            long reached = playerSaves.stream()
                    .filter(s -> s.getCurrentChapter() >= ch)
                    .count();
            long completed = playerSaves.stream()
                    .filter(s -> isChapterCompleted(s, ch))
                    .count();
            double reachedPct = activePlayers == 0 && totalPlayers == 0
                    ? 0.0
                    : Math.round((reached * 1000.0) / denominator) / 10.0;
            double completedPct = activePlayers == 0 && totalPlayers == 0
                    ? 0.0
                    : Math.round((completed * 1000.0) / denominator) / 10.0;
            chapterStats.add(new ChapterStatDto(ch, meta.title(), reached, completed, reachedPct, completedPct));
        }

        long pendingBugs = bugReportRepository.countByStatus(BugReportStatus.PENDING);
        long resolvedBugs = bugReportRepository.countByStatus(BugReportStatus.RESOLVED);
        long totalEvidence = evidenceMasterRepository.count();

        return new AdminOverviewResponse(
                totalPlayers,
                activePlayers,
                avgCredibility,
                lowCredibilityCount,
                pendingBugs,
                resolvedBugs,
                totalEvidence,
                chapterStats);
    }

    @Transactional(readOnly = true)
    public List<AdminUserItemDto> listUsers() {
        List<User> users = userRepository.findAllByOrderByIdAsc();
        Map<Long, GameSave> latestSaveByUser = loadLatestSavesByUserId();

        return users.stream().map(u -> {
            GameSave save = latestSaveByUser.get(u.getId());
            return new AdminUserItemDto(
                    u.getId(),
                    u.getUsername(),
                    u.getEmail(),
                    u.getRole(),
                    u.getCreatedAt(),
                    save != null,
                    save != null ? save.getCurrentChapter() : null,
                    save != null ? save.getCredibilityScore() : null,
                    save != null ? save.getUpdatedAt() : null);
        }).toList();
    }

    @Transactional(readOnly = true)
    public AdminUserSaveDetailDto getUserLatestSave(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> ApiException.notFound("Không tìm thấy người dùng ID " + userId));
        GameSave save = gameSaveRepository.findFirstByUser_IdOrderByUpdatedAtDescIdDesc(userId)
                .orElseThrow(() -> ApiException.notFound("Người dùng '" + user.getUsername() + "' chưa có bản lưu nào"));
        return new AdminUserSaveDetailDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                save.getId(),
                save.getCurrentChapter(),
                save.getCredibilityScore(),
                save.getSaveDataJson(),
                save.getUpdatedAt());
    }

    @Transactional(readOnly = true)
    public List<AdminBugReportDto> listBugReports(String statusFilter) {
        List<BugReport> reports;
        if (statusFilter != null && !statusFilter.isBlank() && !"ALL".equalsIgnoreCase(statusFilter.trim())) {
            reports = bugReportRepository.findByStatusOrderByCreatedAtDescIdDesc(statusFilter.trim().toUpperCase());
        } else {
            reports = bugReportRepository.findAllByOrderByCreatedAtDescIdDesc();
        }
        return reports.stream().map(this::toBugReportDto).toList();
    }

    @Transactional
    public AdminBugReportDto updateBugReportStatus(Long reportId, String rawStatus) {
        if (rawStatus == null || rawStatus.isBlank()) {
            throw ApiException.badRequest("Thiếu trạng thái status");
        }
        String normalized = rawStatus.trim().toUpperCase();
        if (!BugReportStatus.PENDING.equals(normalized) && !BugReportStatus.RESOLVED.equals(normalized)) {
            throw ApiException.badRequest("Trạng thái chỉ nhận PENDING hoặc RESOLVED");
        }
        BugReport report = bugReportRepository.findById(reportId)
                .orElseThrow(() -> ApiException.notFound("Không tìm thấy báo cáo lỗi #" + reportId));
        report.updateStatus(normalized);
        BugReport saved = bugReportRepository.save(report);
        return toBugReportDto(saved);
    }

    @Transactional(readOnly = true)
    public List<AdminEvidenceDto> listEvidenceMaster() {
        return evidenceMasterRepository.findAllByOrderByChapterIdAscIdAsc()
                .stream()
                .map(AdminEvidenceDto::from)
                .toList();
    }

    @Transactional
    public List<AdminEvidenceDto> seedChapter1Evidence() {
        for (EvidenceSeed seed : CHAPTER_1_EVIDENCE_SEEDS) {
            if (!evidenceMasterRepository.existsByEvidenceCode(seed.code())) {
                evidenceMasterRepository.save(
                        new EvidenceMaster(seed.chapterId(), seed.code(), seed.name(), seed.description()));
            }
        }
        return listEvidenceMaster();
    }

    @Transactional
    public AdminEvidenceDto createEvidence(SaveEvidenceRequest request) {
        ValidatedEvidence input = validateEvidenceRequest(request);
        if (evidenceMasterRepository.existsByEvidenceCode(input.code())) {
            throw ApiException.conflict("Mã vật chứng '" + input.code() + "' đã tồn tại");
        }
        String packedDesc = AdminEvidenceDto.packDescriptionWithImage(input.description(), input.imageUrl());
        EvidenceMaster saved = evidenceMasterRepository.save(
                new EvidenceMaster(input.chapterId(), input.code(), input.name(), packedDesc));
        return AdminEvidenceDto.from(saved);
    }

    @Transactional
    public AdminEvidenceDto updateEvidence(Long id, SaveEvidenceRequest request) {
        ValidatedEvidence input = validateEvidenceRequest(request);
        EvidenceMaster entity = evidenceMasterRepository.findById(id)
                .orElseThrow(() -> ApiException.notFound("Không tìm thấy vật chứng #" + id));
        evidenceMasterRepository.findByEvidenceCode(input.code())
                .filter(other -> !other.getId().equals(id))
                .ifPresent(other -> {
                    throw ApiException.conflict("Mã vật chứng '" + input.code() + "' đã được dùng ở bản ghi khác");
                });
        String packedDesc = AdminEvidenceDto.packDescriptionWithImage(input.description(), input.imageUrl());
        entity.updateDetails(input.chapterId(), input.code(), input.name(), packedDesc);
        return AdminEvidenceDto.from(evidenceMasterRepository.save(entity));
    }

    @Transactional
    public void deleteEvidence(Long id) {
        if (!evidenceMasterRepository.existsById(id)) {
            throw ApiException.notFound("Không tìm thấy vật chứng #" + id);
        }
        evidenceMasterRepository.deleteById(id);
    }

    private static ValidatedEvidence validateEvidenceRequest(SaveEvidenceRequest request) {
        if (request == null) {
            throw ApiException.badRequest("Dữ liệu vật chứng không hợp lệ");
        }
        int chapterId = request.chapterId() != null ? request.chapterId() : 1;
        if (chapterId < 1 || chapterId > 5) {
            throw ApiException.badRequest("Chương phải từ 1 đến 5");
        }
        String code = request.evidenceCode() != null ? request.evidenceCode().trim() : "";
        if (code.isEmpty() || code.length() > 50) {
            throw ApiException.badRequest("Mã vật chứng bắt buộc (tối đa 50 ký tự)");
        }
        String name = request.evidenceName() != null ? request.evidenceName().trim() : "";
        if (name.isEmpty() || name.length() > 100) {
            throw ApiException.badRequest("Tên vật chứng bắt buộc (tối đa 100 ký tự)");
        }
        String desc = request.description() != null ? request.description().trim() : "";
        if (desc.isEmpty()) {
            throw ApiException.badRequest("Mô tả vật chứng không được để trống");
        }
        String imageUrl = request.imageUrl() != null ? request.imageUrl().trim() : "";
        return new ValidatedEvidence(chapterId, code, name, desc, imageUrl);
    }

    private Map<Long, GameSave> loadLatestSavesByUserId() {
        List<GameSave> allSaves = gameSaveRepository.findAllByOrderByUpdatedAtDescIdDesc();
        Map<Long, GameSave> latestByUser = new HashMap<>();
        for (GameSave save : allSaves) {
            Long uid = save.getUser().getId();
            latestByUser.putIfAbsent(uid, save);
        }
        return latestByUser;
    }

    private static boolean isChapterCompleted(GameSave save, int chapter) {
        if (save.getCurrentChapter() > chapter) {
            return true;
        }
        if (save.getCurrentChapter() < chapter) {
            return false;
        }
        String json = save.getSaveDataJson();
        if (json == null || json.isBlank()) {
            return false;
        }
        if (chapter == 1) {
            return json.contains("\"CH2_ENTRY\"")
                    || json.contains("\"ch1_complete\":true")
                    || json.contains("\"ch1_complete\": true")
                    || json.contains("\"CH1_CONCLUSION_COMMITTED\"");
        }
        return json.contains("\"ch" + chapter + "_complete\":true");
    }

    private AdminBugReportDto toBugReportDto(BugReport report) {
        User reporter = report.getUser();
        return new AdminBugReportDto(
                report.getId(),
                reporter != null ? reporter.getId() : null,
                reporter != null ? reporter.getUsername() : "Ẩn danh",
                report.getReportContent(),
                report.getStatus(),
                report.getCreatedAt());
    }

    private record ChapterMeta(int chapter, String title) {
    }

    private record EvidenceSeed(int chapterId, String code, String name, String description) {
    }

    private record ValidatedEvidence(
            int chapterId, String code, String name, String description, String imageUrl) {
    }
}

