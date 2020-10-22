package com.fazio.bib.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GoogleScholar {
    private String title;
    private String authors;
    private String introduction;
}
