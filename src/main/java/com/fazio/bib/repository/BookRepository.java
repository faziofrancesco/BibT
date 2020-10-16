package com.fazio.bib.repository;

import com.fazio.bib.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends CrudRepository<Book, Integer> {
    Page<Book> findByTitle(String title, Pageable pageable);

    Page<Book> findAll(Pageable paging);


}