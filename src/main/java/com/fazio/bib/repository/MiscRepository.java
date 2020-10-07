package com.fazio.bib.repository;

import com.fazio.bib.entity.Misc;
import org.springframework.data.repository.CrudRepository;

public interface MiscRepository extends CrudRepository<Misc,Integer> {
    @Override
    Iterable<Misc> findAll();
}
