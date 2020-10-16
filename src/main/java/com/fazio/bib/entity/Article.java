package com.fazio.bib.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "article")
@Entity
@ToString

public class Article implements Citation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_article")
    private Integer id;
    @Column(name = "author")
    private String author;
    @Column(name = "title")
    private String title;
    @Column(name = "journal")
    private String journal;
    @Column(name = "year")
    private Integer year;
    @Column(name = "volume")
    private String volume;
    @Column(name = "number")
    private String number;
    @Column(name = "pages")
    private String pages;

    @Override
    public String getName() {
        return "article";
    }
}
