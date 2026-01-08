package com.jayesh.canthurtme.controller;

import com.jayesh.canthurtme.dto.DailyStatsResponse;
import com.jayesh.canthurtme.dto.DayActivity;
import com.jayesh.canthurtme.dto.EnergyStateResponse;
import com.jayesh.canthurtme.dto.LogActionRequest;
import com.jayesh.canthurtme.model.LogEntry;
import com.jayesh.canthurtme.service.EnergyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class EnergyController {
    
    private final EnergyService energyService;
    
    @GetMapping("/state")
    public ResponseEntity<EnergyStateResponse> getEnergyState() {
        return ResponseEntity.ok(energyService.getEnergyState());
    }
    
    @PostMapping("/log")
    public ResponseEntity<LogEntry> logAction(@RequestBody LogActionRequest request) {
        return ResponseEntity.ok(energyService.logAction(request));
    }
    
    @GetMapping("/stats")
    public ResponseEntity<DailyStatsResponse> getDailyStats() {
        return ResponseEntity.ok(energyService.getDailyStats());
    }
    
    @GetMapping("/activity")
    public ResponseEntity<List<DayActivity>> getActivityData() {
        return ResponseEntity.ok(energyService.getActivityData());
    }
    
    @DeleteMapping("/log/{id}")
    public ResponseEntity<Void> deleteLog(@PathVariable String id) {
        energyService.deleteLog(id);
        return ResponseEntity.noContent().build();
    }
}
