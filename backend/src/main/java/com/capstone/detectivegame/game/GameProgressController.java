package com.capstone.detectivegame.game;

import com.capstone.detectivegame.game.dto.GameProgressResponse;
import com.capstone.detectivegame.game.dto.SaveProgressRequest;
import com.capstone.detectivegame.game.dto.SaveProgressResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Game Progress API — Project.docx §4.3 (yêu cầu JWT theo §4.2). */
@RestController
@RequestMapping("/api/game")
public class GameProgressController {

    private final GameProgressService gameProgressService;

    public GameProgressController(GameProgressService gameProgressService) {
        this.gameProgressService = gameProgressService;
    }

    /** POST /api/game/save -> 200 {message, updatedAt} */
    @PostMapping("/save")
    public SaveProgressResponse save(@RequestBody SaveProgressRequest request) {
        return gameProgressService.save(request);
    }

    /** GET /api/game/load/{userId} -> 200 trạng thái game gần nhất */
    @GetMapping("/load/{userId}")
    public GameProgressResponse load(@PathVariable Long userId) {
        return gameProgressService.loadLatest(userId);
    }
}
