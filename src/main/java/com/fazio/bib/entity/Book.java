package com.fazio.bib.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "book")
@Entity

public  class Book implements Citation{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id_book")
    private Integer id;
    @Column(name = "author")
    private String author;
    @Column(name = "title")
    private String title;
    @Column(name = "publisher")
    private String publisher;
    @Column(name = "address")
    private String address;
    @Column(name = "year")
    private Integer year;
    public Book(String a, String t, String p, String add, Integer y)
    {
        this.author=a;
        this.title=t;
        this.publisher=p;
        this.address=add;
        this.year=y;
    }

    @Override
    public String getName() {
        return "book";
    }
}
