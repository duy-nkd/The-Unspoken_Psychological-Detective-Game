package com.capstone.detectivegame.game;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameSaveRepository extends JpaRepository<GameSave, Long> {

    /** Bản lưu gần nhất của người dùng (§4.3: "tải tiến trình chơi gần nhất"). */
    Optional<GameSave> findFirstByUser_IdOrderByUpdatedAtDescIdDesc(Long userId);
}
