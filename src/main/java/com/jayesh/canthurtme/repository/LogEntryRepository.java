package com.jayesh.canthurtme.repository;

import com.jayesh.canthurtme.model.LogEntry;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LogEntryRepository extends MongoRepository<LogEntry, String> {
    List<LogEntry> findAllByOrderByTimestampDesc();
    List<LogEntry> findByTimestampBetweenOrderByTimestampDesc(LocalDateTime start, LocalDateTime end);
    List<LogEntry> findTop100ByOrderByTimestampDesc();
}
