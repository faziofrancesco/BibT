package com.fazio.bib.repository;

import com.fazio.bib.entity.Article;
import com.fazio.bib.entity.Misc;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface MiscRepository extends CrudRepository<Misc,Integer> {
    Page<Misc> findByTitle(String title, Pageable pageable);
    Page<Misc> findAll(Pageable paging);

}
