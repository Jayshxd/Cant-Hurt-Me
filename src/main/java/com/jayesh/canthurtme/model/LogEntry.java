package com.jayesh.canthurtme.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "logs")
public class LogEntry {
    @Id
    private String id;
    
    private String type;
    private int points;
    private LocalDateTime timestamp;
    private Integer amount; // For SPENDING type
}
