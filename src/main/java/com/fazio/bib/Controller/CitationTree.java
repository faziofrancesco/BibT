package com.fazio.bib.Controller;

import com.fazio.bib.Service.ScrapingGoogleScholar;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@Slf4j
public class CitationTree {
    @GetMapping(value = "/tree")
    public ResponseEntity<Map<String, Object>> viewReferences(

            @RequestParam(required = true, name = "author", defaultValue = "") String title,
            @RequestParam(name = "profondita", defaultValue = "1") int profondita) {
        try {
            ScrapingGoogleScholar s = new ScrapingGoogleScholar();
            TreeB message;
            message = s.Scraping(profondita, title);
            Map<String, Object> response = new HashMap<>();
            response.put("message", message);


            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }
}
