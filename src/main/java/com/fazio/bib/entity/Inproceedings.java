package com.fazio.bib.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "inproceedings")
@Entity
public class Inproceedings implements Citation{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id_inproceedings")
    private Integer id;
    @Column(name = "author")
    private String author;
    @Column(name = "title")
    private String title;
    @Column(name = "booktitle")
    private String booktitle;
    @Column(name = "series")
    private String series;
    @Column(name = "year")
    private Integer year;
    @Column(name = "pages")
    private String pages;
    @Column(name = "publisher")
    private String publisher;
    @Column(name = "address")
    private String address;


    @Override
    public String getName() {
        return "inproceedings";
    }
}
