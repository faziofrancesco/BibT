package com.fazio.bib.Controller;

import com.fazio.bib.entity.*;
import com.fazio.bib.repository.ArticleRepository;
import com.fazio.bib.repository.BookRepository;
import com.fazio.bib.repository.InproceedingsRepository;
import com.fazio.bib.repository.MiscRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@Slf4j
public class ManageReferences {
    @Autowired
    BookRepository repository;
    @Autowired
    InproceedingsRepository rep;
    @Autowired
    MiscRepository miscRepository;
    @Autowired
    ArticleRepository articleRepository;

    @PostMapping(value = "/prova")
    public Citation add(@RequestBody Citation citation) {
        if (citation instanceof Misc) {
            Misc m = (Misc) citation;
            miscRepository.save(m);
        }
        if (citation instanceof Article) {
            Article c = (Article) citation;
            articleRepository.save(c);
        }
        if (citation instanceof Inproceedings) {
            Inproceedings c = (Inproceedings) citation;
            rep.save(c);
        }
        if (citation instanceof Book) {
            Book c = (Book) citation;
            repository.save(c);
        }
        return citation;
    }

    @GetMapping(value = "/vie")
    public ArrayList<Citation> viewReference() {

        ArrayList<Citation> c = new ArrayList<Citation>();
        c.addAll((Collection<? extends Citation>) miscRepository.findAll());
        c.addAll((Collection<? extends Citation>) repository.findAll());
        c.addAll((Collection<? extends Citation>) rep.findAll());
        c.addAll((Collection<? extends Citation>) articleRepository.findAll());
        for (int i = 0; i < c.size(); i++) {
            System.out.println(c.get(i));
        }
        return c;
    }

    @PostMapping(value = "/view")
    public ResponseEntity<Map<String, Object>> viewReferences(
            @RequestBody Pages pages) {
        try {

            List<Citation> cit = new ArrayList<>();
            Pageable paging = PageRequest.of(pages.getPage(), pages.getPageSize());
            Page<Book> pageB;
            Page<Inproceedings> pageI;
            Page<Misc> pageM;
            Page<Article> pageA;
            log.error(pages.getTitle());
            if (pages.getTitle().equals("")) {
                pageA = articleRepository.findAll(paging);
                pageB = repository.findAll(paging);
                pageM = miscRepository.findAll(paging);
                pageI = rep.findAll(paging);

            } else {
                pageA = articleRepository.findByTitle(pages.getTitle(), paging);
                pageB = repository.findByTitle(pages.getTitle(), paging);
                pageM = miscRepository.findByTitle(pages.getTitle(), paging);
                pageI = rep.findByTitle(pages.getTitle(), paging);


            }
            cit.addAll(pageA.getContent());
            cit.addAll(pageB.getContent());
            cit.addAll(pageM.getContent());
            cit.addAll(pageI.getContent());
            log.error(pages.toString());
            Map<String, Object> response = new HashMap<>();
            //qui e dove comincia non so come adeguarlo
            int currentPage = (int) ((pageA.getNumber() + pageB.getNumber() + pageI.getNumber() + pageM.getNumber()) / (pageA.getTotalElements() + pageB.getTotalElements() + pageI.getTotalElements() + pageM.getTotalElements()));
            int TotalPages = (int) ((pageA.getTotalPages() + pageB.getTotalPages() + pageI.getTotalPages() + pageM.getTotalPages()) / (pageA.getTotalElements() + pageB.getTotalElements() + pageI.getTotalElements() + pageM.getTotalElements()));
            response.put("tutorials", cit);
            response.put("currentPage", pageA.getNumber());
            response.put("totalItems", pageA.getTotalElements() + pageB.getTotalElements() + pageI.getTotalElements() + pageM.getTotalElements());
            response.put("totalPages", TotalPages);
            log.error(String.valueOf(currentPage));
            log.error(String.valueOf(TotalPages));

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}


