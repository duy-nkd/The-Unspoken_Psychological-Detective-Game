package com.capstone.detectivegame.report;

import com.capstone.detectivegame.common.ApiException;
import com.capstone.detectivegame.report.dto.BugReportRequest;
import com.capstone.detectivegame.user.User;
import com.capstone.detectivegame.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Tiếp nhận báo cáo lỗi (Project.docx §4.3). Trạng thái mặc định PENDING (§2.1).
 * PENDING(ISS-10): danh sách + chuyển PENDING -> RESOLVED cho Admin (§5.1) chưa có API Contract.
 */
@Service
public class BugReportService {

    private final BugReportRepository bugReportRepository;
    private final UserRepository userRepository;

    public BugReportService(BugReportRepository bugReportRepository, UserRepository userRepository) {
        this.bugReportRepository = bugReportRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public void create(BugReportRequest request) {
        if (request.reportContent() == null || request.reportContent().isBlank()) {
            throw ApiException.badRequest("Thiếu reportContent");
        }
        User user = request.userId() == null
                ? null
                : userRepository.findById(request.userId())
                        .orElseThrow(() -> ApiException.notFound("Không tìm thấy userId " + request.userId()));
        bugReportRepository.save(new BugReport(user, request.reportContent()));
    }
}
