package com.cloudedutrack.cloudedutrack.Entity;

import jakarta.persistence.*;

@Entity
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private int score;
    private int totalScore; // The total possible score
    private int numberOfTimesTabSwitched; // New field to store the count of tab switches

    private boolean quizAttempted;

    public boolean isQuizAttempted() {
        return quizAttempted;
    }

    public void setQuizAttempted(boolean quizAttempted) {
        this.quizAttempted = quizAttempted;
    }

    @ManyToOne
    @JoinColumn(name = "subject_id") // assuming 'subject_id' is the foreign key in the 'results' table
    private Subject subject;

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public int getNumberOfTimesTabSwitched() {
        return numberOfTimesTabSwitched;
    }

    public void setNumberOfTimesTabSwitched(int numberOfTimesTabSwitched) {
        this.numberOfTimesTabSwitched = numberOfTimesTabSwitched;
    }

    // Constructors, getters, and setters

    public int getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(int totalScore) {
        this.totalScore = totalScore;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public Result() {
    }

    public Result(Long id, Long userId, int score) {
        this.id = id;
        this.userId = userId;
        this.score = score;
    }
}
