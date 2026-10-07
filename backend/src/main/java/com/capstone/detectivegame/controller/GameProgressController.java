package com.capstone.detectivegame.controller;

import com.capstone.detectivegame.dto.request.SaveProgressRequest;
import com.capstone.detectivegame.dto.response.GameProgressResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/game-progress")
public class GameProgressController {
    @GetMapping
    public GameProgressResponse load() { return new GameProgressResponse(1, 0, "{}"); }
    @PutMapping
    public GameProgressResponse save(@RequestBody SaveProgressRequest request) {
        return new GameProgressResponse(request.chapter(), request.credibility(), request.stateJson());
    }
}
