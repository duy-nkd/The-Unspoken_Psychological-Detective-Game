package com.capstone.detectivegame.game;

import com.capstone.detectivegame.common.ApiException;
import com.capstone.detectivegame.game.dto.GameProgressResponse;
import com.capstone.detectivegame.game.dto.SaveProgressRequest;
import com.capstone.detectivegame.game.dto.SaveProgressResponse;
import com.capstone.detectivegame.user.User;
import com.capstone.detectivegame.user.UserRepository;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Lưu / tải tiến trình (Project.docx §4.3, §1.2 Bước 4).
 * §4.3: "Lưu trữ hoặc cập nhật tiến trình chơi hiện tại" -> cập nhật bản gần nhất nếu đã có, ngược lại tạo mới.
 * PENDING(ISS-05): mỗi user 1 hay nhiều bản lưu / checkpoint.
 * PENDING(ISS-08): chưa kiểm tra userId trong payload có trùng người đăng nhập (token) hay không.
 */
@Service
public class GameProgressService {

    private final GameSaveRepository gameSaveRepository;
    private final UserRepository userRepository;
    private final EntityManager entityManager;

    public GameProgressService(GameSaveRepository gameSaveRepository, UserRepository userRepository,
            EntityManager entityManager) {
        this.gameSaveRepository = gameSaveRepository;
        this.userRepository = userRepository;
        this.entityManager = entityManager;
    }

    @Transactional
    public SaveProgressResponse save(SaveProgressRequest request) {
        validate(request);
        User user = userRepository.findById(request.userId())
                .orElseThrow(() -> ApiException.notFound("Không tìm thấy userId " + request.userId()));

        GameSave save = gameSaveRepository.findFirstByUser_IdOrderByUpdatedAtDescIdDesc(user.getId())
                .orElseGet(() -> new GameSave(user));
        save.updateProgress(request.currentChapter(), request.credibilityScore(), request.saveDataJson());

        GameSave persisted = gameSaveRepository.saveAndFlush(save);
        entityManager.refresh(persisted); // đọc lại updated_at do MySQL sinh
        return SaveProgressResponse.saved(persisted.getUpdatedAt());
    }

    @Transactional(readOnly = true)
    public GameProgressResponse loadLatest(Long userId) {
        return gameSaveRepository.findFirstByUser_IdOrderByUpdatedAtDescIdDesc(userId)
                .map(GameProgressResponse::from)
                .orElseThrow(() -> ApiException.notFound("Chưa có bản lưu cho userId " + userId));
    }

    private static void validate(SaveProgressRequest request) {
        if (request.userId() == null) throw ApiException.badRequest("Thiếu userId");
        if (request.currentChapter() == null) throw ApiException.badRequest("Thiếu currentChapter");
        if (request.credibilityScore() == null) throw ApiException.badRequest("Thiếu credibilityScore");
        if (request.saveDataJson() == null) throw ApiException.badRequest("Thiếu saveDataJson");
        // §3.3: uy tín không âm (max(0, ...)); khởi điểm 100
        if (request.credibilityScore() < 0) throw ApiException.badRequest("credibilityScore không được âm");
    }
}
