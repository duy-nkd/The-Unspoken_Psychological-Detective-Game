package com.capstone.detectivegame.report;

import com.capstone.detectivegame.common.MessageResponse;
import com.capstone.detectivegame.report.dto.BugReportRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/** Bug Report API — Project.docx §4.3. */
@RestController
@RequestMapping("/api/reports")
public class BugReportController {

    private final BugReportService bugReportService;

    public BugReportController(BugReportService bugReportService) {
        this.bugReportService = bugReportService;
    }

    /** POST /api/reports/bug -> 201 Created: xác nhận ghi nhận báo cáo. */
    @PostMapping("/bug")
    @ResponseStatus(HttpStatus.CREATED)
    public MessageResponse create(@RequestBody BugReportRequest request) {
        bugReportService.create(request);
        return new MessageResponse("Đã ghi nhận báo cáo lỗi");
    }
}
