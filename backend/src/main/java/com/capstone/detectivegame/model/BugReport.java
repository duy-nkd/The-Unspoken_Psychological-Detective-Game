package com.capstone.detectivegame.model;

import jakarta.persistence.*;

@Entity
public class BugReport {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Lob private String description;
    protected BugReport() {}
}
