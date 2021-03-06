package com.fazio.bib.repository;

import com.fazio.bib.entity.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends CrudRepository<Book, Integer> {
    Iterable<Book> findByTitle(String title);

    void deleteById(int id);

}