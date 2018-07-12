function Question(text, choices, answer) {
    this.text = text,
    this.choices = choices,
    this.answer = answer;
}

//see if answer is correct
Question.prototype.correctAnswer = function(choice){
    return choice === this.answer
}