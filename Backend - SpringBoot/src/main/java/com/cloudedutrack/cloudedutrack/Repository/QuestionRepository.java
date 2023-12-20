package com.cloudedutrack.cloudedutrack.Repository;

import com.cloudedutrack.cloudedutrack.Entity.Question;
import com.cloudedutrack.cloudedutrack.Entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findBySubject(Subject subject);
}
