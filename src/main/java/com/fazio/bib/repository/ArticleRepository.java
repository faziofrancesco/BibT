package com.fazio.bib.repository;

import com.fazio.bib.entity.Article;
import org.springframework.data.repository.CrudRepository;

public interface ArticleRepository extends CrudRepository<Article, Integer> {

    Iterable<Article> findByTitle(String title);


}
