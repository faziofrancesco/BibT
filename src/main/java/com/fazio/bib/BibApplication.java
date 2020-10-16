package com.fazio.bib;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BibApplication {
    /*
        @Autowired
        private CityRepository repository;

        @Override
        public void run(String... args) throws Exception {
            repository.deleteAll();

            repository.save(new City("Bratislava", 432000));
            repository.save(new City("Budapest", 1759000));
            repository.save(new City("Prague", 1280000));

            repository.findAll().forEach((city) -> {
                logger.info("{}", city);
            });
        }
    */
    public static void main(String[] args) {
        SpringApplication.run(BibApplication.class, args);
    }

}
