package com.jayesh.canthurtme.service;

import com.jayesh.canthurtme.dto.DailyStatsResponse;
import com.jayesh.canthurtme.dto.DayActivity;
import com.jayesh.canthurtme.dto.EnergyStateResponse;
import com.jayesh.canthurtme.dto.LogActionRequest;
import com.jayesh.canthurtme.model.LogEntry;
import com.jayesh.canthurtme.model.UserStats;
import com.jayesh.canthurtme.repository.LogEntryRepository;
import com.jayesh.canthurtme.repository.UserStatsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class EnergyService {
    
    private static final String DEFAULT_USER_ID = "default_user";
    private static final int INITIAL_POINTS = 100;
    
    private final LogEntryRepository logEntryRepository;
    private final UserStatsRepository userStatsRepository;
    
    // Action points configuration
    private static final Map<String, Integer> ACTION_POINTS = Map.of(
        "FOCUS_SESSION", 10,
        "WORKOUT", 5,
        "SPENDING", 0,
        "MAJOR_SETBACK", -15,
        "MODERATE_SETBACK", -10,
        "MINOR_SETBACK", -5
    );
    
    public EnergyStateResponse getEnergyState() {
        UserStats stats = getOrCreateUserStats();
        List<LogEntry> logs = logEntryRepository.findTop100ByOrderByTimestampDesc();
        return new EnergyStateResponse(stats.getTotalPoints(), logs, stats.getLastResetDate());
    }
    
    public LogEntry logAction(LogActionRequest request) {
        int pointChange = calculatePointChange(request.getType(), request.getAmount());
        
        LogEntry logEntry = new LogEntry();
        logEntry.setType(request.getType());
        logEntry.setPoints(pointChange);
        logEntry.setTimestamp(LocalDateTime.now());
        logEntry.setAmount(request.getAmount());
        
        LogEntry savedLog = logEntryRepository.save(logEntry);
        
        // Update user stats
        UserStats stats = getOrCreateUserStats();
        stats.setTotalPoints(stats.getTotalPoints() + pointChange);
        userStatsRepository.save(stats);
        
        return savedLog;
    }
    
    public DailyStatsResponse getDailyStats() {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX);
        
        List<LogEntry> todayLogs = logEntryRepository.findByTimestampBetweenOrderByTimestampDesc(startOfDay, endOfDay);
        
        int gains = todayLogs.stream()
            .filter(log -> log.getPoints() > 0)
            .mapToInt(LogEntry::getPoints)
            .sum();
            
        int losses = todayLogs.stream()
            .filter(log -> log.getPoints() < 0)
            .mapToInt(LogEntry::getPoints)
            .sum();
            
        int streakDays = calculateStreakDays();
        
        return new DailyStatsResponse(gains, losses, gains + losses, todayLogs.size(), streakDays);
    }
    
    public List<DayActivity> getActivityData() {
        // Only fetch logs from the last 365 days to limit memory usage
        LocalDate today = LocalDate.now();
        LocalDateTime startDate = today.minusDays(365).atStartOfDay();
        LocalDateTime endDate = today.atTime(LocalTime.MAX);
        List<LogEntry> recentLogs = logEntryRepository.findByTimestampBetweenOrderByTimestampDesc(startDate, endDate);
        
        Map<String, Integer> activityMap = new LinkedHashMap<>();
        
        // Generate last 365 days
        for (int i = 364; i >= 0; i--) {
            LocalDate date = today.minusDays(i);
            activityMap.put(date.toString(), 0);
        }
        
        // Count activities per day
        for (LogEntry log : recentLogs) {
            String dateStr = log.getTimestamp().toLocalDate().toString();
            if (activityMap.containsKey(dateStr)) {
                activityMap.merge(dateStr, 1, Integer::sum);
            }
        }
        
        // Convert to activity data with levels
        List<DayActivity> activities = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : activityMap.entrySet()) {
            int count = entry.getValue();
            int level = calculateLevel(count);
            activities.add(new DayActivity(entry.getKey(), count, level));
        }
        
        return activities;
    }
    
    public void deleteLog(String logId) {
        Optional<LogEntry> logOpt = logEntryRepository.findById(logId);
        if (logOpt.isPresent()) {
            LogEntry log = logOpt.get();
            // Revert the points
            UserStats stats = getOrCreateUserStats();
            stats.setTotalPoints(stats.getTotalPoints() - log.getPoints());
            userStatsRepository.save(stats);
            logEntryRepository.delete(log);
        }
    }
    
    private int calculatePointChange(String type, Integer amount) {
        if ("SPENDING".equals(type) && amount != null) {
            return -Math.abs(amount);
        }
        return ACTION_POINTS.getOrDefault(type, 0);
    }
    
    private int calculateLevel(int count) {
        if (count >= 5) return 4;
        if (count >= 3) return 3;
        if (count >= 2) return 2;
        if (count >= 1) return 1;
        return 0;
    }
    
    private int calculateStreakDays() {
        // Limit to last 3 years of data for streak calculation (supports up to 1095 day streak)
        LocalDate today = LocalDate.now();
        LocalDateTime startDate = today.minusDays(1095).atStartOfDay();
        LocalDateTime endDate = today.atTime(LocalTime.MAX);
        List<LogEntry> recentLogs = logEntryRepository.findByTimestampBetweenOrderByTimestampDesc(startDate, endDate);
        
        Set<LocalDate> datesWithPositiveAction = new HashSet<>();
        for (LogEntry log : recentLogs) {
            if (log.getPoints() > 0) {
                datesWithPositiveAction.add(log.getTimestamp().toLocalDate());
            }
        }
        
        if (datesWithPositiveAction.isEmpty()) {
            return 0;
        }
        
        int streak = 0;
        LocalDate current = today;
        int maxStreak = 1095; // 3 years max
        
        while (datesWithPositiveAction.contains(current) && streak < maxStreak) {
            streak++;
            current = current.minusDays(1);
        }
        
        return streak;
    }
    
    private UserStats getOrCreateUserStats() {
        return userStatsRepository.findById(DEFAULT_USER_ID)
            .orElseGet(() -> {
                UserStats newStats = new UserStats();
                newStats.setId(DEFAULT_USER_ID);
                newStats.setTotalPoints(INITIAL_POINTS);
                newStats.setLastResetDate(LocalDate.now().toString());
                return userStatsRepository.save(newStats);
            });
    }
}
