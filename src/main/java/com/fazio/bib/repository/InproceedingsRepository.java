package com.fazio.bib.repository;

import com.fazio.bib.entity.Inproceedings;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InproceedingsRepository extends CrudRepository<Inproceedings, Integer> {
    Iterable<Inproceedings> findByTitle(String title);


}


