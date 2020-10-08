package com.fazio.bib;

import com.fazio.bib.entity.*;
import com.fazio.bib.repository.ArticleRepository;
import com.fazio.bib.repository.BOOKRepository;
import com.fazio.bib.repository.InproceedingsRepository;
import com.fazio.bib.repository.MiscRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class provo {
    @Autowired
    BOOKRepository repository;
    @Autowired
    InproceedingsRepository rep;
    @Autowired
    MiscRepository miscRepository;
    @Autowired
    ArticleRepository articleRepository;
    @GetMapping(value = "/ciccio")
    public void ciccio() {
        Book Book = new Book("sdsdd", "sdsd", "sdsd", "sdsdas", 123);

        repository.save(Book);
    }
    @PostMapping(value = "/prova")
    public Citation add(@RequestBody Citation citation) {
        if(citation instanceof Misc) {
            Misc m = (Misc)citation;
            miscRepository.save(m);
        }
        if(citation instanceof Article) {
            Article c = (Article)citation;
            articleRepository.save(c);
        }
        if(citation instanceof Inproceedings) {
            Inproceedings c = (Inproceedings) citation;
            rep.save(c);
        }
        if(citation instanceof Book) {
            Book c = (Book)citation;
            repository.save(c);
        }
        return citation;
    }
}
