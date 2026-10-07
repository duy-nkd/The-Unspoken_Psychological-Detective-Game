package com.capstone.detectivegame.model;

import jakarta.persistence.*;

@Entity
public class GameSave {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private Integer chapter;
    private Integer credibility;
    @Lob private String stateJson;
    protected GameSave() {}
}
