package com.fazio.bib;

import com.fazio.bib.entity.*;
import com.fazio.bib.repository.ArticleRepository;
import com.fazio.bib.repository.BOOKRepository;
import com.fazio.bib.repository.InproceedingsRepository;
import com.fazio.bib.repository.MiscRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;

@RestController
public class ManageReferences {
    @Autowired
    BOOKRepository repository;
    @Autowired
    InproceedingsRepository rep;
    @Autowired
    MiscRepository miscRepository;
    @Autowired
    ArticleRepository articleRepository;

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
    @GetMapping(value = "/view")
    public ArrayList<Citation> viewReferences(){
        ArrayList<Citation> c=new ArrayList<Citation>();
        c.addAll((Collection<? extends Citation>) miscRepository.findAll());
        c.addAll((Collection<? extends Citation>) repository.findAll());
        c.addAll((Collection<? extends Citation>) rep.findAll());
        c.addAll((Collection<? extends Citation>) articleRepository.findAll());
        for(int i=0;i<c.size();i++){
            System.out.println(c.get(i));
        }
        return c;
    }

}
