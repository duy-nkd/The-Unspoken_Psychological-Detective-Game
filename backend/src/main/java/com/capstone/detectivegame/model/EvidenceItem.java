package com.capstone.detectivegame.model;

import jakarta.persistence.*;

@Entity
public class EvidenceItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private String name;
    private Integer chapter;
    protected EvidenceItem() {}
}
