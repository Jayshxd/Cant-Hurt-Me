package com.jayesh.canthurtme.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DayActivity {
    private String date;
    private int count;
    private int level; // 0-4
}
