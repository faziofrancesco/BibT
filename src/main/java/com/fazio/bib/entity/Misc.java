package com.fazio.bib.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "misc")
@Entity

public class Misc implements Citation{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    @Column(name = "author")
    private String author;
    @Column(name = "title")
    private String title;
    @Column(name = "howpublished")
    private String howpublished;
    @Column(name = "year")
    private Integer year;
    @Column(name = "note")
    private String note;


    @Override
    public String getName() {
        return "misc";
    }
}
