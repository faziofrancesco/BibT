package com.fazio.bib.Service;

import com.fazio.bib.entity.Article;
import com.fazio.bib.entity.Book;
import com.fazio.bib.entity.Misc;
import com.fazio.bib.repository.ArticleRepository;
import com.fazio.bib.repository.BOOKRepository;
import com.fazio.bib.repository.MiscRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BookService {

    @Autowired
    ArticleRepository repository;

    @GetMapping(value = "/spatty")
    public Iterable<Article> ciccio(){
        return repository.findAll();
    }

}
