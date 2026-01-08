package com.jayesh.canthurtme.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DailyStatsResponse {
    private int todayGains;
    private int todayLosses;
    private int netChange;
    private int todayActivities;
    private int streakDays;
}
