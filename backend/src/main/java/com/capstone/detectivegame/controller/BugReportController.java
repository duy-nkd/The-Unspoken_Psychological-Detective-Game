package com.capstone.detectivegame.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bug-reports")
public class BugReportController {
    @GetMapping
    public List<String> list() { return List.of(); }
    @PostMapping
    public String create(@RequestBody String report) { return report; }
}
