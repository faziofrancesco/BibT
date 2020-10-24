package com.fazio.bib.Service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Nodes {
    private String id;
    private String title;
    private String author;
    private String intro;
}
