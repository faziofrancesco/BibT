package com.fazio.bib.Controller;

import com.fazio.bib.Service.Links;
import com.fazio.bib.Service.Nodes;
import com.fazio.bib.Service.ScrapingGoogleScholar;
import javafx.util.Pair;
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
            @RequestParam(name = "profondita", defaultValue = "3") int profondita) {
        try {
            ScrapingGoogleScholar s = new ScrapingGoogleScholar();
            // message = s.Scraping(profondita, title);
            Pair<ArrayList<Nodes>, ArrayList<Links>> Graph;
            Graph = s.Scraping(profondita, title);
            Map<String, Object> response = new HashMap<>();
            response.put("links", Graph.getValue());
            response.put("nodes", Graph.getKey());
            log.error(response.toString());


            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }
}
