$(document).ready(function () {

    // initialize the game
    function initialScreen() {
        startScreen = 
            "<p class='text-center main-button-container'>" + 
            "<a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Trivia Game</a></p>";
        $(".mainArea").html(startScreen);
    }

    initialScreen();

    // Call a function, generateHTML(), 
    // that is triggered by the start button
    // and generates the game HTML
    $("body").on("click", ".start-button", function(event){
        generateHTML();
        timerControl();
    });
    
    $("body").on("click", ".answer", function(event){
        selectedAnswer = $(this).text();
        if (selectedAnswer === correctAnswers[questionNum]) {
            clearInterval(timeClock);
            generateWin();
        }
        else {
            clearInterval(timeClock);
            generateLoss();
        }
    });
    
    $("body").on("click", ".reset-button", function(event){
        resetGame();
    });
    
});  // document ready

// main variables
var startScreen; // initial screen
var gameHTML; // main game area
var counter = 30;
var questionNum = 0; // question counter
var selecterAnswer;
var timeClock;

var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;

// game timer interval
function timerControl() {

    timeClock = setInterval(thirtySeconds, 1000);
    
    function thirtySeconds() {
        if (counter === 0) {
            clearInterval(timeClock);
            generateLossDueToTimeOut();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}

function gamePause() {
    if (questionNum < questionArray.length-1) {
        questionNum++;
        generateHTML();
        counter = 30;
        timerControl();
    }
    else {
        finalScreen();
    }
}

function generateLossDueToTimeOut() {
    unansweredTally++;
    gameHTML = 
        "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + 
        "<p class='text-center'>You ran out of time! The correct answer was: " + correctAnswers[questionNum] + "</p>" + 
        "<img class='rounded mx-auto d-block img-wrong' src='images/wrong.png'>";
	
    $(".mainArea").html(gameHTML);
    setTimeout(gamePause, 4000);  //  4 seconds
}

function generateWin() {
    correctTally++;
    
    gameHTML = 
        "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" +
        "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionNum] + "</p>" + 
        imageArray[questionNum];

    $(".mainArea").html(gameHTML);
    setTimeout(gamePause, 4000);  //  4 seconds
}

function generateLoss() {
    incorrectTally++;

    gameHTML = 
        "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + 
        "<p class='text-center'>Wrong! The correct answer is: " + correctAnswers[questionNum] + "</p>" + 
        "<img class='rounded mx-auto d-block img-wrong' src='images/wrong.png'>";
    
    $(".mainArea").html(gameHTML);
    setTimeout(gamePause, 4000);  //  4 seconds
}

function generateHTML() {

    gameHTML = 
        "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionNum] + "</p>" +
        "<p class='answer'>A. " + answerArray[questionNum][0] + "</p>" +
        "<p class='answer'>B. " + answerArray[questionNum][1] + "</p>" +
        "<p class='answer'>C. " + answerArray[questionNum][2] + "</p>" +
        "<p class='answer'>D. " + answerArray[questionNum][3] + "</p>";

    $(".mainArea").html(gameHTML);
}

function finalScreen() {
    gameHTML = 
        "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + 
        "<p class='text-center'>All done, here's how you did!" + "</p>" + 
        "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + 
        "<p>Wrong Answers: " + incorrectTally + "</p>" + 
        "<p>Unanswered: " + unansweredTally + "</p>" + 
        "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $(".mainArea").html(gameHTML);
}

function resetGame() {
	questionNum = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerControl();
}

var questionArray = [
    "Which one of these wizards taught Defense Against the Dark Arts in book one?",
    "What creatures feed on positive human emotions?",
    "Which of Ron's brothers is a Gryffindor Prefect in Harry's first year?",
    "When is Harry Potter's birthday?",
    "Who is Ginny's first boyfriend?",
    "What is Lord Voldemort's real name?",
    "What is the only antidote to Basilisk venom?",
    "In Harry Potter and the Prisoner of Azkaban, where does the Knight Bus drop Harry off?"
];

var answerArray = [
    ["Quirinus Quirrell", "Dolores Umbridge", "Severus Snape", "Alastor Moody"],
    ["Mermaids", "Boggarts", "Dementors", "Grindylows"],
    ["Percy Weasley", "Bill Weasley", "George Weasley", "Fred Weasley"],
    ["30th July", "31st July", "31st August", "30th June"],
    ["Micheal Corner", "Zacharias Smith", "Harry Potter", "Dean Thomas"],
    ["Tom Marvolo Riddle", "Gellert Grindelwald", "Salazar Slytherin", "Morfin Gaunt"],
    ["Phoenix Tears", "Dragon's Blood", "Mandrake Draught", "A bezoar"],
    ["King's Cross Station", "Privet Drive", "The Leaky Cauldron", "Hogwarts"]
];

var imageArray = [
    "<img class='center-block img-right' src='images/HP1.gif'>",
    "<img class='center-block img-right' src='images/HP2.gif'>",
    "<img class='center-block img-right' src='images/HP3.gif'>",
    "<img class='center-block img-right' src='images/HP4.gif'>",
    "<img class='center-block img-right' src='images/HP5.gif'>",
    "<img class='center-block img-right' src='images/HP6.gif'>",
    "<img class='center-block img-right' src='images/HP7.gif'>",
    "<img class='center-block img-right' src='images/HP8.gif'>"
];

var correctAnswers = [
    "A. Quirinus Quirrell",
    "C. Dementors",
    "A. Percy Weasley",
    "B. 31st July",
    "A. Micheal Corner",
    "A. Tom Marvolo Riddle",
    "A. Phoenix Tears",
    "C. The Leaky Cauldron"
];


