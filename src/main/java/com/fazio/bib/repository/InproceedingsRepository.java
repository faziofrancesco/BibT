package com.fazio.bib.repository;

import com.fazio.bib.entity.Article;
import com.fazio.bib.entity.Inproceedings;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface InproceedingsRepository  extends CrudRepository<Inproceedings,Integer> {
    Page<Inproceedings> findByTitle(String title, Pageable pageable);
    Page<Inproceedings> findAll(Pageable paging);

}


