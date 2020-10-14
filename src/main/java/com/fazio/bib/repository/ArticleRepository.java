package com.fazio.bib.repository;

import com.fazio.bib.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface ArticleRepository extends CrudRepository<Article,Integer> {

    Page<Article> findByTitle(String title, Pageable pageable);
    Page<Article> findAll(Pageable paging);
}
