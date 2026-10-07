package com.capstone.detectivegame.repository;
import com.capstone.detectivegame.model.EvidenceItem;
import org.springframework.data.jpa.repository.JpaRepository;
public interface EvidenceRepository extends JpaRepository<EvidenceItem, Long> {}
