package com.capstone.detectivegame.admin;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.capstone.detectivegame.admin.dto.AdminBugReportDto;
import com.capstone.detectivegame.admin.dto.AdminEvidenceDto;
import com.capstone.detectivegame.admin.dto.AdminOverviewResponse;
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
import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/** Unit test cho AdminService (không cần kết nối MySQL). */
class AdminServiceTest {

    private UserRepository userRepository;
    private GameSaveRepository gameSaveRepository;
    private BugReportRepository bugReportRepository;
    private EvidenceMasterRepository evidenceMasterRepository;
    private AdminService adminService;

    @BeforeEach
    void setUp() {
        userRepository = mock(UserRepository.class);
        gameSaveRepository = mock(GameSaveRepository.class);
        bugReportRepository = mock(BugReportRepository.class);
        evidenceMasterRepository = mock(EvidenceMasterRepository.class);
        adminService = new AdminService(
                userRepository, gameSaveRepository, bugReportRepository, evidenceMasterRepository);
    }

    @Test
    void overviewTinhDungSoTaiKhoanVaHoanThanhChuong() throws Exception {
        User admin = withId(new User("admin", "admin@k-estate.local", "hash", User.ROLE_ADMIN), 1L);
        User player1 = withId(new User("detective1", "d1@test.com", "hash"), 2L);
        User player2 = withId(new User("detective2", "d2@test.com", "hash"), 3L);

        GameSave save1 = new GameSave(player1);
        save1.updateProgress(1, 85, "{\"currentNodeId\":\"CH2_ENTRY\",\"ch1_complete\":true}");

        when(userRepository.findAllByOrderByIdAsc()).thenReturn(List.of(admin, player1, player2));
        when(gameSaveRepository.findAllByOrderByUpdatedAtDescIdDesc()).thenReturn(List.of(save1));
        when(bugReportRepository.countByStatus(BugReportStatus.PENDING)).thenReturn(2L);
        when(bugReportRepository.countByStatus(BugReportStatus.RESOLVED)).thenReturn(5L);
        when(evidenceMasterRepository.count()).thenReturn(12L);

        AdminOverviewResponse overview = adminService.getOverview();

        assertEquals(2L, overview.totalPlayers());
        assertEquals(1L, overview.activePlayers());
        assertEquals(85.0, overview.averageCredibility());
        assertEquals(2L, overview.pendingBugReports());
        assertEquals(5L, overview.resolvedBugReports());
        assertEquals(12L, overview.totalEvidenceMaster());
        assertEquals(5, overview.chapterStats().size());
        assertEquals(1L, overview.chapterStats().get(0).reachedCount());
        assertEquals(1L, overview.chapterStats().get(0).completedCount());
        assertEquals(100.0, overview.chapterStats().get(0).completedPercentage());
    }

    @Test
    void doiTrangThaiBugReportTuPendingSangResolved() throws Exception {
        User player = withId(new User("detective1", "d1@test.com", "hash"), 2L);
        BugReport report = withId(new BugReport(player, "Lỗi kẹt cửa phòng 204"), 10L);

        when(bugReportRepository.findById(10L)).thenReturn(Optional.of(report));
        when(bugReportRepository.save(any(BugReport.class))).thenAnswer(inv -> inv.getArgument(0));

        AdminBugReportDto updated = adminService.updateBugReportStatus(10L, "RESOLVED");

        assertEquals(BugReportStatus.RESOLVED, updated.status());
        assertEquals("detective1", updated.username());
    }

    @Test
    void doiTrangThaiBugReportKhongHopLeNemLoi400() {
        assertThrows(ApiException.class, () -> adminService.updateBugReportStatus(10L, "INVALID_STATUS"));
    }

    @Test
    void taoVaCapNhatVatChungThanhCong() throws Exception {
        when(evidenceMasterRepository.existsByEvidenceCode("EV_TestItem")).thenReturn(false);
        when(evidenceMasterRepository.save(any(EvidenceMaster.class))).thenAnswer(inv -> {
            EvidenceMaster entity = inv.getArgument(0);
            return withId(entity, 99L);
        });

        AdminEvidenceDto created = adminService.createEvidence(
                new SaveEvidenceRequest(2, "EV_TestItem", "Vật chứng thử nghiệm", "Mô tả chi tiết", "/assets/test.png"));

        assertEquals(99L, created.id());
        assertEquals(2, created.chapterId());
        assertEquals("EV_TestItem", created.evidenceCode());
        assertEquals("Vật chứng thử nghiệm", created.evidenceName());
        assertEquals("Mô tả chi tiết", created.description());
        assertEquals("/assets/test.png", created.imageUrl());
    }

    private static <T> T withId(T entity, Long id) throws Exception {
        Field field = entity.getClass().getDeclaredField("id");
        field.setAccessible(true);
        field.set(entity, id);
        return entity;
    }
}

