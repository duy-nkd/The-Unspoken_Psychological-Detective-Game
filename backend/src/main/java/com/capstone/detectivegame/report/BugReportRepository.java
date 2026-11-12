package com.capstone.detectivegame.report;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BugReportRepository extends JpaRepository<BugReport, Long> {

    List<BugReport> findAllByOrderByCreatedAtDescIdDesc();

    List<BugReport> findByStatusOrderByCreatedAtDescIdDesc(String status);

    long countByStatus(String status);
}
