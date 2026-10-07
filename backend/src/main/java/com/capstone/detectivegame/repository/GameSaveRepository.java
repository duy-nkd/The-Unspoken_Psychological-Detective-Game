package com.capstone.detectivegame.repository;
import com.capstone.detectivegame.model.GameSave;
import org.springframework.data.jpa.repository.JpaRepository;
public interface GameSaveRepository extends JpaRepository<GameSave, Long> {}
