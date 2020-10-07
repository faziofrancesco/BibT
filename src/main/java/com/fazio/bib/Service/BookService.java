package com.fazio.bib.Service;

import com.fazio.bib.entity.Book;
import com.fazio.bib.repository.BOOKRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BookService {

    @Autowired
    BOOKRepository repository;

    @GetMapping(value = "/spatty")
    public Iterable<Book> ciccio(){
        return repository.findAll();
    }

}
