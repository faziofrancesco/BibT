package com.fazio.bib.Controller;

import com.fazio.bib.Service.Links;
import com.fazio.bib.Service.Nodes;
import com.fazio.bib.Service.ScrapingGoogleScholar1;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@Slf4j
public class CitationGraph {
    @GetMapping(value = "/graph")
    public ResponseEntity<Map<String, Object>> viewGraph(

            @RequestParam(required = true, name = "author", defaultValue = "cauteruccio") String title,
            @RequestParam(name = "profondita", defaultValue = "2") int profondita,
            @RequestParam(name = "risultati", defaultValue = "2") int risultati) {
        try {
            ScrapingGoogleScholar1 s = new ScrapingGoogleScholar1();
            // message = s.Scraping(profondita, title);
            s.Scraping(profondita, risultati, title);
            ArrayList<Nodes> nodes;
            nodes = s.GetNodes();
            ArrayList<Links> links;
            links = s.GetLinks();

            Map<String, Object> response = new HashMap<>();
            response.put("nodes", nodes);
            response.put("links", links);
            log.error(response.toString());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }
}
