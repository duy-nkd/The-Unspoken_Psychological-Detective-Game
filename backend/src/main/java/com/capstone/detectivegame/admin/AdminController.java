package com.capstone.detectivegame.admin;

import com.capstone.detectivegame.admin.dto.AdminBugReportDto;
import com.capstone.detectivegame.admin.dto.AdminEvidenceDto;
import com.capstone.detectivegame.admin.dto.AdminOverviewResponse;
import com.capstone.detectivegame.admin.dto.AdminUserItemDto;
import com.capstone.detectivegame.admin.dto.AdminUserSaveDetailDto;
import com.capstone.detectivegame.admin.dto.SaveEvidenceRequest;
import com.capstone.detectivegame.admin.dto.UpdateBugStatusRequest;
import com.capstone.detectivegame.common.MessageResponse;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST Controller cho Admin Dashboard — Project.docx §4.2 (/api/admin/**) & §5.1.
 * Chỉ tài khoản có quyền ROLE_ADMIN mới được phép truy cập (cấu hình trong SecurityConfig).
 */
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    /** GET /api/admin/overview -> Số liệu thống kê tổng quan & hoàn thành Chương 1–5 (§5.1). */
    @GetMapping("/overview")
    public AdminOverviewResponse getOverview() {
        return adminService.getOverview();
    }

    /** GET /api/admin/users -> Danh sách tài khoản kèm tóm tắt tiến trình chơi gần nhất. */
    @GetMapping("/users")
    public List<AdminUserItemDto> listUsers() {
        return adminService.listUsers();
    }

    /** GET /api/admin/users/{userId}/save -> Chi tiết bản lưu + saveDataJson để kiểm thử E2E (§5.2). */
    @GetMapping("/users/{userId}/save")
    public AdminUserSaveDetailDto getUserSaveDetail(@PathVariable Long userId) {
        return adminService.getUserLatestSave(userId);
    }

    /** GET /api/admin/reports/bugs?status=ALL|PENDING|RESOLVED -> Bảng báo cáo lỗi thời gian thực (§5.1). */
    @GetMapping("/reports/bugs")
    public List<AdminBugReportDto> listBugReports(
            @RequestParam(name = "status", required = false) String status) {
        return adminService.listBugReports(status);
    }

    /** PATCH /api/admin/reports/bugs/{id}/status -> Chuyển trạng thái PENDING <-> RESOLVED (§5.1). */
    @PatchMapping("/reports/bugs/{id}/status")
    public AdminBugReportDto updateBugStatus(
            @PathVariable Long id,
            @RequestBody UpdateBugStatusRequest request) {
        return adminService.updateBugReportStatus(id, request != null ? request.status() : null);
    }

    /** GET /api/admin/evidence -> Danh mục bằng chứng chuẩn toàn hệ thống. */
    @GetMapping("/evidence")
    public List<AdminEvidenceDto> listEvidence() {
        return adminService.listEvidenceMaster();
    }

    /** POST /api/admin/evidence -> Thêm mới một bằng chứng vào danh mục chuẩn. */
    @PostMapping("/evidence")
    @ResponseStatus(HttpStatus.CREATED)
    public AdminEvidenceDto createEvidence(@RequestBody SaveEvidenceRequest request) {
        return adminService.createEvidence(request);
    }

    /** PUT /api/admin/evidence/{id} -> Cập nhật thông tin bằng chứng. */
    @PutMapping("/evidence/{id}")
    public AdminEvidenceDto updateEvidence(
            @PathVariable Long id,
            @RequestBody SaveEvidenceRequest request) {
        return adminService.updateEvidence(id, request);
    }

    /** DELETE /api/admin/evidence/{id} -> Xóa một bằng chứng khỏi danh mục. */
    @DeleteMapping("/evidence/{id}")
    public MessageResponse deleteEvidence(@PathVariable Long id) {
        adminService.deleteEvidence(id);
        return new MessageResponse("Đã xóa bằng chứng khỏi danh mục");
    }

    /** POST /api/admin/evidence/seed-chapter1 -> Nạp 12 vật chứng Chương 1 vào bảng evidence_master. */
    @PostMapping("/evidence/seed-chapter1")
    public List<AdminEvidenceDto> seedChapter1Evidence() {
        return adminService.seedChapter1Evidence();
    }
}

