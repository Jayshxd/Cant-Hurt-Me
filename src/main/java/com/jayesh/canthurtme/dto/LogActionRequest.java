package com.jayesh.canthurtme.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LogActionRequest {
    private String type;
    private Integer amount; // For SPENDING type
}
