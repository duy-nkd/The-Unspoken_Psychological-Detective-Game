package com.capstone.detectivegame.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/evidence")
public class EvidenceController {
    @GetMapping
    public List<String> list(@RequestParam(required = false) Integer chapter) { return List.of(); }
}
