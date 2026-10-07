package com.capstone.detectivegame.repository;
import com.capstone.detectivegame.model.BugReport;
import org.springframework.data.jpa.repository.JpaRepository;
public interface BugReportRepository extends JpaRepository<BugReport, Long> {}
