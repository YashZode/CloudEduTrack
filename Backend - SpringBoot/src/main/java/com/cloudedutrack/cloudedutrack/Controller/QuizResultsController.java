package com.cloudedutrack.cloudedutrack.Controller;

import com.cloudedutrack.cloudedutrack.Entity.QuizResultDTO;
import com.cloudedutrack.cloudedutrack.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/results")
public class QuizResultsController {

    @Autowired
    private QuizService quizService;
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/user/{userId}")
    public ResponseEntity<Map<String, List<QuizResultDTO>>> getResultsByUser(@PathVariable Long userId) {
        Map<String, List<QuizResultDTO>> results = quizService.getResultsByUserAndSubject(userId);
        return ResponseEntity.ok(results);
    }
}
