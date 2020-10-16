package com.fazio.bib.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "misc")
@Entity
@ToString

public class Misc implements Citation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_misc")
    private Integer id;
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
