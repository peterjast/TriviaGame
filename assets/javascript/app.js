$(document).ready(function () {

    var Questions = [{
      
        question: "Who wrote the Communist Manifesto?",
        answerList: ["Immanuel Kant", "David Hume", "Adolf Hiter", "Karl Marx"],
        answer: 3
    }, {
        
        question: "Who wrote Critique of Pure Reason?",
        answerList: ["Friedrich Neitshce", "Al Pacino", "Immanuel Kant", "John Locke"],
        answer: 2
    }, {
      
        question: "Who wrote On Liberty?",
        answerList: ["Thomas Aquinas", "David Hume", "John Stuart Mill", "Gottfried Leibniz"],
        answer: 2
    }, {
       
        question: "The word philosophy is derived from the greek word philosophia, which means:",
        answerList: ["Love of wisdom", "Love of reason", "Love of questions", "Love of pie"],
        answer: 0
    }, {
      
        question: "Plato was a student of which Philosopher?",
        answerList: ["Aristotle", " Rene Descartes", "Soren Kirkegaard", "Socrates"],
        answer: 3
    }, {
        
        question: "Socrates believed that the soul is harmed by a lack of:",
        answerList: ["wealth", "knowledge", "community", "snacks"],
        answer: 1
    }, {
        
        question: "Who wrote the Republic?",
        answerList: ["Plato", "Socrates", "Aristotle", "Pythagorus"],
        answer: 0
    }]


    var correctChoices = 0;
    var wrongChoices = 0;

    var currentQuestion = 0;

    var unanswered = 0;
    var answered = 0;
    var userSelect = 0;

    var sec = 0;
    var time = 0;

    var messages = {
        correct: "Good Job!",
        incorrect: "Wrong Choice!",
        endTime: "TIME'S UP!",
        finished: "Game Over"
    }

    function startGame() {
        
        $('#finalMessage').empty();
        $('#correctAnswers').empty();
        $('#wrongAnswers').empty();
        $('#unanswered').empty();
       
        currentQuestion = 0;
        correctChoices = 0;
        WrongChoices = 0;
        unanswered = 0;
        
        newQuestion()
    }

    
    function countDown() {
        sec = 10;
        $('#timer').html('<h3> Time Left: ' + sec + '</h3>');
        answered = true;
        time = setInterval(showCountdDown, 1000);
    }


    function showCountdDown() {
        sec--;
        $('#timer').html('<h3>Time Left: ' + sec + '</h3>');
        if (sec < 1) {
            clearInterval(time);
            answered = false;
            answerPage()
        }
    }

    function newQuestion() {
        $('#message').empty();
        $('#correctedAnswer').empty();
        $('.answerList').empty();
        answered = true;

        $('#currentQuestion').show();
        $('.question').show();
        $('.answerList').show();
        $('#timer').show();

        $('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' + Questions.length);
        $('.question').html('<h2>' + Questions[currentQuestion].question + '</h2>');
        for (var i = 0; i < 4; i++) {
            var choices = $('<div>');
            choices.text(Questions[currentQuestion].answerList[i]);
            choices.attr({ 'data-index': i });
            choices.addClass('thisChoice');
            $('.answerList').append(choices);
        }
    
        countDown();

        $('.thisChoice').on('click', function () {
            userSelect = $(this).data('index');
            clearInterval(time);
            answerPage()
        });
    }


    function answerPage() {
        
        $('#currentQuestion').empty();
        $('.thisChoice').empty();
        $('.question').empty();

        $('#currentQuestion').hide();
        $('.question').hide();
        $('.answerList').hide();
        $('#timer').hide();

        var rightAnswerText = Questions[currentQuestion].answerList[Questions[currentQuestion].answer];

        var rightAnswerIndex = Questions[currentQuestion].answer;

        if ((userSelect == rightAnswerIndex) && (answered == true)) {
            
            correctChoices++;
           
            $('#message').html(messages.correct);
          
        } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
            wrongChoices++;
            $('#message').html(messages.incorrect);
          
            $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        } else {
            unanswered++;
            $('#message').html(messages.endTime);
            $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
            answered = true;
        }
        if (currentQuestion == (Questions.length - 1)) {
            setTimeout(scoreBoard, 1000)
        } else {
            currentQuestion++;
            setTimeout(newQuestion, 2000);
        }
    }

    function scoreBoard() {
        $('#timer').empty();
        $('#message').empty();
        $('#correctedAnswer').empty();
        $('#finalMessage').html(messages.finished);
        $('#correctAnswers').html("Correct Answers: " + correctChoices);
        $('#wrongAnswers').html("Wrong Answers: " + wrongChoices);
        $('#unanswered').html("Unanswered: " + unanswered);
        $('#startAgainBtn').addClass('reset');
        $('#startAgainBtn').show();
        $('#startAgainBtn').html('Start Over?');
    }

    $('#startBtn').on('click', function () {
        $(this).hide();
        $('#startAgainBtn').hide();
        startGame();
    });

    $('#startAgainBtn').on('click', function () {
        $(this).hide();
        startGame();
    });

});
