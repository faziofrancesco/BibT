package com.fazio.bib;

import com.fazio.bib.entity.Citation;
import com.fazio.bib.entity.Book;
import com.fazio.bib.repository.BOOKRepository;
import com.fazio.bib.repository.InproceedingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class provo {
    @Autowired
    BOOKRepository repository;
    @Autowired
    InproceedingsRepository rep;
    @GetMapping(value = "/ciccio")
    public void ciccio() {
        Book Book = new Book("sdsdd", "sdsd", "sdsd", "sdsdas", 123);

        repository.save(Book);
    }
    @PostMapping(value = "/prova")
    public void add(@RequestBody Citation citation) {
        System.out.println(citation.getName());
    }
}
