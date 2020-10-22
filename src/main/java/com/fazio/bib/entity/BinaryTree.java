package com.fazio.bib.entity;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.lang.reflect.Type;
import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BinaryTree {
    private GoogleScholar name;
    private GoogleScholar parent;
    private ArrayList<BinaryTree> children;

    public String toJson() {
        Gson gson = new Gson();
        Type fooType = new TypeToken<BinaryTree>() {
        }.getType();
        String json = gson.toJson(this, fooType);
        return json;
    }
}
