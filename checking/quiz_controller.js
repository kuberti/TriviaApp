function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionsIndex = 0;
}

//get index of questions to ask user
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionsIndex];
}

//see if all of the questions are used up, so check to see if the game is over
Quiz.prototype.isEnded = function(){
    return this.questions.length === this.questionsIndex;
}

//increment score if answer is correct
Quiz.prototype.guess = function(answer){
    if (this.getQuestionIndex().correctAnswer(answer)) {
        this.score++;
    }
    //go to the next question
    this.questionsIndex++;
}
