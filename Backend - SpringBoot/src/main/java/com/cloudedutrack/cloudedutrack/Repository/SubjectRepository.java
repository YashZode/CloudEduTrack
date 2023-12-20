package com.cloudedutrack.cloudedutrack.Repository;

import com.cloudedutrack.cloudedutrack.Entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
    Optional<Subject> findByName(String name);
}