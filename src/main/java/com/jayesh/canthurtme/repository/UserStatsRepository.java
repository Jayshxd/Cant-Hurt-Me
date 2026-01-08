package com.jayesh.canthurtme.repository;

import com.jayesh.canthurtme.model.UserStats;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserStatsRepository extends MongoRepository<UserStats, String> {
}
