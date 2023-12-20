package com.cloudedutrack.cloudedutrack.Entity;

public class QuizResultDTO {

    private int score;
    private int totalScore;
    private boolean attempted;
    private int numberOfTimesTabSwitched;

    public QuizResultDTO(int score, int totalScore, boolean attempted, int numberOfTimesTabSwitched) {
        this.score = score;
        this.totalScore = totalScore;
        this.attempted = attempted;
        this.numberOfTimesTabSwitched = numberOfTimesTabSwitched;
    }

    // Getters and setters


    public QuizResultDTO() {
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(int totalScore) {
        this.totalScore = totalScore;
    }

    public boolean isAttempted() {
        return attempted;
    }

    public void setAttempted(boolean attempted) {
        this.attempted = attempted;
    }

    public int getNumberOfTimesTabSwitched() {
        return numberOfTimesTabSwitched;
    }

    public void setNumberOfTimesTabSwitched(int numberOfTimesTabSwitched) {
        this.numberOfTimesTabSwitched = numberOfTimesTabSwitched;
    }
}


