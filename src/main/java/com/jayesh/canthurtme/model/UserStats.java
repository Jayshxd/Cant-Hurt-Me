package com.jayesh.canthurtme.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "user_stats")
public class UserStats {
    @Id
    private String id;
    
    private int totalPoints;
    private String lastResetDate;
    
    public UserStats(int totalPoints) {
        this.totalPoints = totalPoints;
    }
}
