package com.cloudedutrack.cloudedutrack.service;

import com.cloudedutrack.cloudedutrack.Entity.Question;
import com.cloudedutrack.cloudedutrack.Entity.QuizResultDTO;
import com.cloudedutrack.cloudedutrack.Entity.Result;
import com.cloudedutrack.cloudedutrack.Entity.Subject;
import com.cloudedutrack.cloudedutrack.Repository.QuestionRepository;
import com.cloudedutrack.cloudedutrack.Repository.ResultRepository;
import com.cloudedutrack.cloudedutrack.Repository.SubjectRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class QuizService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private ResultRepository resultRepository;


    public List<Question> getQuestionsBySubject(String subjectName) {
        Subject subject = subjectRepository.findByName(subjectName)
                .orElseThrow(() -> new EntityNotFoundException("Subject not found"));
        return questionRepository.findBySubject(subject);
    }

    // Method to retrieve all questions for the quiz
    public List<Question> getQuestions() {
        return questionRepository.findAll();
    }

    // Method to calculate the score based on submitted answers
    public Result calculateScore(Map<Long, String> submittedAnswers, Long userId, int numberOfTimesTabSwitched, Subject subject) {

        // Make sure to filter or retrieve the questions based on the subject passed in
        List<Question> questions = questionRepository.findBySubject(subject);


        int score = 0;
        List<Question> allQuestions = questionRepository.findAll();
        int totalScore = allQuestions.size(); // The total possible score is the number of questions

        for (Question question : allQuestions) {
            String submittedAnswer = submittedAnswers.get(question.getId());
            if (submittedAnswer != null && submittedAnswer.equals(question.getCorrectAnswer())) {
                score++;
            }
        }

        // Save the result for the user
        Result result = new Result();
        result.setUserId(userId);
        result.setScore(score);
        result.setTotalScore(totalScore); // result.setTotalScore(totalScore); //
        result.setQuizAttempted(true);
        result.setSubject(subject);
        result.setNumberOfTimesTabSwitched(numberOfTimesTabSwitched); // Set the number of times the tab was switched

        resultRepository.save(result);

        return result;
    }


    public Map<String, List<QuizResultDTO>> getResultsByUserAndSubject(Long userId) {
        List<Result> results = resultRepository.findByUserId(userId);
        return results.stream()
                .collect(Collectors.groupingBy(
                        result -> result.getSubject().getName(),
                        Collectors.mapping(result -> new QuizResultDTO(
                                        result.getScore(),
                                        result.getTotalScore(),
                                        true,
                                        result.getNumberOfTimesTabSwitched()),
                                Collectors.toList())
                ));
    }
}
