package com.cloudedutrack.cloudedutrack.Repository;

import com.cloudedutrack.cloudedutrack.Entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findByUserId(Long userId);
}
