package com.fazio.bib.Controller;

import com.fazio.bib.entity.*;
import com.fazio.bib.repository.ArticleRepository;
import com.fazio.bib.repository.BookRepository;
import com.fazio.bib.repository.InproceedingsRepository;
import com.fazio.bib.repository.MiscRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping(value = "/view")
    public ResponseEntity<Map<String, Object>> viewReferences(
            @RequestParam(required = false) String title,
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "pageSize", defaultValue = "3") int size) {
        try {

            List<Citation> cit = new ArrayList<>();

            Pageable paging = PageRequest.of(page - 1, size);
//            Page<Book> pageB;
//            Page<Inproceedings> pageI;
//            Page<Misc> pageM;
//            Page<Article> pageA;


            Iterable<Book> pageB;
            Iterable<Inproceedings> pageI;
            Iterable<Misc> pageM;
            Iterable<Article> pageA;

            if ("".equals(title)) {

                pageA = articleRepository.findAll(/*paging*/);
                pageB = repository.findAll(/*paging*/);
                pageM = miscRepository.findAll(/*paging*/);
                pageI = rep.findAll(/*paging*/);

            } else {
                pageA = articleRepository.findByTitle(title, paging);
                pageB = repository.findByTitle(title, paging);
                pageM = miscRepository.findByTitle(title, paging);
                pageI = rep.findByTitle(title, paging);


            }
            cit.addAll((Collection<? extends Citation>) pageA);
            cit.addAll((Collection<? extends Citation>) pageB);
            cit.addAll((Collection<? extends Citation>) pageM);
            cit.addAll((Collection<? extends Citation>) pageI);
            Map<String, Object> response = new HashMap<>();
            //qui e dove comincia non so come adeguarlo
            cit.forEach(e -> log.error(e.toString()));
            if (page == (int) Math.ceil(cit.size() / Double.valueOf(size)) && (cit.size()) % size != 0)
                response.put("tutorials", cit.subList(size * (page - 1), (size * (page - 1)) + ((cit.size()) % size)));
            else
                response.put("tutorials", cit.subList(size * (page - 1), (size * (page - 1)) + (size)));
            response.put("currentPage", page);//pageA.getNumber() + pageB.getNumber() + pageI.getNumber() + pageM.getNumber());
            response.put("totalItems", cit.size());
            response.put("totalPages", (int) Math.ceil(cit.size() / Double.valueOf(size)));
//            log.error(String.valueOf(pageA.getNumber() + pageB.getNumber() + pageI.getNumber() + pageM.getNumber()));
//            log.error(String.valueOf(pageA.getTotalElements() + pageB.getTotalElements() + pageI.getTotalElements() + pageM.getTotalElements()));
//            log.error(String.valueOf(pageA.getTotalPages() + pageB.getTotalPages() + pageI.getTotalPages() + pageM.getTotalPages()));
//lunghezza array mod 3

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    public static void main(String[] args) {
        int mostra = 3;
        int totalElements = 1;
        int totalPages = 1;
        System.out.print(
                (int) Math.ceil(totalElements / Double.valueOf(mostra)));
    }
}


