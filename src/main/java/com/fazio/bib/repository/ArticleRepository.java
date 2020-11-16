package com.fazio.bib.repository;

import com.fazio.bib.entity.Article;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ArticleRepository extends CrudRepository<Article, Integer> {

    Iterable<Article> findByTitle(String title);

    void deleteById(int id);

    @Modifying
    @Query("update Article a set a.author = ?1, a.journal= ?2 ,a.number=?3,a.pages=?4,a.title=?5,a.volume=?6,a.year=?7 where a.id = ?8")
    void setArticleInfoById(String author, String journal, String number, String pages, String title, String volume, Integer year, Integer id);
}
