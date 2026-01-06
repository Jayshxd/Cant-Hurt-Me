package com.jayesh.canthurtme;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class MainEntity {
    @Id
    private String id;

    private int totalPoints;

}
