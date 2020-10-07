package com.fazio.bib.repository;

import com.fazio.bib.entity.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BOOKRepository extends CrudRepository<Book,Integer> {
    @Override
    Iterable<Book> findAll();
}