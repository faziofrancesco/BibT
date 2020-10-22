package com.fazio.bib.Controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TreeB {
    private String name;
    private ArrayList<TreeB> children;
}
