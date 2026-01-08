package com.jayesh.canthurtme.dto;

import com.jayesh.canthurtme.model.LogEntry;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnergyStateResponse {
    private int points;
    private List<LogEntry> logs;
    private String lastResetDate;
}
