package com.cloudedutrack.cloudedutrack.Entity;

import java.util.List;

public class QuizSubmission {
    private List<Answer> answers;
    private int numberOfTimesTabSwitched;


    private Long userId;
    private String subjectName;

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public QuizSubmission() {
    }

//    public QuizSubmission(List<Answer> answers, int numberOfTimesTabSwitched) {
//        this.answers = answers;
//        this.numberOfTimesTabSwitched = numberOfTimesTabSwitched;
//    }

//    public QuizSubmission(List<Answer> answers, int numberOfTimesTabSwitched, Long userId) {
//        this.answers = answers;
//        this.numberOfTimesTabSwitched = numberOfTimesTabSwitched;
//        this.userId = userId;
//    }


    public QuizSubmission(List<Answer> answers, int numberOfTimesTabSwitched, Long userId, String subjectName) {
        this.answers = answers;
        this.numberOfTimesTabSwitched = numberOfTimesTabSwitched;
        this.userId = userId;
        this.subjectName = subjectName;
    }

    public List<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }

    public int getNumberOfTimesTabSwitched() {
        return numberOfTimesTabSwitched;
    }

    public void setNumberOfTimesTabSwitched(int numberOfTimesTabSwitched) {
        this.numberOfTimesTabSwitched = numberOfTimesTabSwitched;
    }
}
