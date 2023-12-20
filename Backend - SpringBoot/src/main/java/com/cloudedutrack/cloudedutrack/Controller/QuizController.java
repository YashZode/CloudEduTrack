package com.cloudedutrack.cloudedutrack.Controller;


import com.cloudedutrack.cloudedutrack.Entity.*;
import com.cloudedutrack.cloudedutrack.Repository.SubjectRepository;
import com.cloudedutrack.cloudedutrack.service.QuizService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @Autowired
    private SubjectRepository subjectRepository;

//    @Autowired
//    private AuthController authController;

    @Autowired
   // private UserService userService; // Assuming you have a UserService that can fetch user details

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/questions")
    public ResponseEntity<List<Question>> getQuestions() {
        // Return a list of questions
        List<Question> questions = quizService.getQuestions();
        return ResponseEntity.ok(questions);
    }
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/answers")
    public ResponseEntity<Result> submitAnswers( @RequestBody QuizSubmission submission) {


        String subjectName = submission.getSubjectName();
        Subject subject = subjectRepository.findByName(subjectName)
                .orElseThrow(() -> new EntityNotFoundException("Subject not found"));


        Map<Long, String> answerMap = submission.getAnswers().stream()
                .collect(Collectors.toMap(Answer::getQuestionId, Answer::getSelectedOption));
        int numberOfTimesTabSwitched = submission.getNumberOfTimesTabSwitched();
        Long userId = submission.getUserId();
//        // Calculate the score and return a result.
         //Long userId = 1L; // Placeholder for the actual user ID
        // Long userId = authController.yash;
        Result result = quizService.calculateScore(answerMap, userId, numberOfTimesTabSwitched, subject);
        return ResponseEntity.ok(result);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/questions/{subjectName}")
    public ResponseEntity<List<Question>> getQuestionsBySubject(@PathVariable String subjectName) {
        List<Question> questions = quizService.getQuestionsBySubject(subjectName);
        return ResponseEntity.ok(questions);
    }




}
