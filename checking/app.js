var questions = [];

    var request = new XMLHttpRequest();
    request.open('GET', 'https://opentdb.com/api.php?amount=5&type=multiple', true);
    request.onloadend = function () {

        // Begin accessing JSON data here
        var data = JSON.parse(this.response).results;
        if (request.status >= 200 && request.status < 400) {
            data.forEach(movie => {
                var question;
                var answers = [];
                var correctAnswer;
                question = movie.question;

                for(i=0;i<movie.incorrect_answers.length;i++){
                    answers.push(movie.incorrect_answers[i]);
                }
                answers.push(movie.correct_answer);
                correctAnswer = movie.correct_answer;
                var q = new Question (question, answers, correctAnswer);
                questions.push(q);
            });

        populate();
    }

    request.send();

}

var quiz = new Quiz(questions);

function populate() {
    showProgress()
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = (choices[i]);
            guess("btn" + i, choices[i]);

        }

    }

};

function onClickButton(e) {
    quiz.guess(e.target.textContent);
    populate();
}


function guess(id, guess) {
    var button = document.getElementById(id);
    button.value=guess;
}

function showProgress() {
    var currentQuestionNumber = quiz.questionsIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;

}


function showScores() {
    //when the game is over (all questions have been read, show this screen)
    var gameOverHTML = "<h1>Result</h1>";
    //show score
    gameOverHTML += "<h2 id='score'> Your score is: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;

}
