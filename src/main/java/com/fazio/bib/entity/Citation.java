package com.fazio.bib.entity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME)

@JsonSubTypes(
        {
                @JsonSubTypes.Type(value = Article.class, name = "article"),
                @JsonSubTypes.Type(value = Book.class, name = "book"),
                @JsonSubTypes.Type(value = Inproceedings.class, name = "inproceedings"),
                @JsonSubTypes.Type(value = Misc.class, name = "misc")
        }

)

public interface Citation {
   public String getName();

}

