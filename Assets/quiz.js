// array with all the questions and answers
var myQuestions = [
{
    preguntas: "commonly used data types DO NOT include",
    possibilities: [
    "strings",
    "booleans",
    "alerts",
    "numbers"
    ],
    answer: "alerts"
},
{
    preguntas: "The condition in an if an if / else statement is enclosed with _____.",
    possibilities: [
    "quotes",
    "curly brackets",
    "parenthesis",
    "square brackets"
],
    answer: "parenthesis"
},
{
    preguntas: "Arrays in JavaScript can be used to store ___.",
    possibilities: [
    "numbers",
    "other arrays",
    "booleans",
    "all of the above"
],
    answer: "all of the above"
},
{
    preguntas: "String values must be enclosed within ___ when being assigned to variables",
    possibilities: [
    "commas",
    "curly brackets",
    "quotes",
    "paranthesis"
    ],
    answer: "quotes"
},
{
    preguntas: "A very useful tool used during development and debugging for printing content to the debugger is:",
    possibilities: [
    "JavaScript",
    "terminal / bash",
    "for loops",
    "console.log"
    ],
    answer: "console.log"
},
];

// all declared variables
var score = 0;
var correctAnswer = 0;
var currentTime = document.querySelector("#remainingTime");
var timer = document.querySelector("#start");
var quizquesDiv = document.querySelector("#quizquesDiv");
var wrapper = document.querySelector("#wrapper");
var secondsLeft = 100;
var holdInterval = 0;
var punishment = 20;
var ulCreate = document.createElement("ul");

// starts the quiz
timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(correctAnswer)
});


function render(correctAnswer) {
    // erases all data
    quizquesDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // For loops to loop through all info in array
    for (var i = 0; i < myQuestions.length; i++) {
        var userQuestion = myQuestions[correctAnswer].preguntas;
        var theseChoices = myQuestions[correctAnswer].possibilities;
        quizquesDiv.textContent = userQuestion;
    }

    // to move on to the next question
    theseChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        quizquesDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

// matching the answers with picked choice
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == myQuestions[correctAnswer].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + myQuestions[correctAnswer].answer;
            // Correct condition 
        } else {
            secondsLeft = secondsLeft - punishment;
            createDiv.textContent = "Wrong! The correct answer is:  " + myQuestions[correctAnswer].answer;
        }

    }
    // will add the number of correct questions by +1
    correctAnswer++;

    if (correctAnswer >= myQuestions.length) {
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + myQuestions.length + " Correct!";
    } else {
        render(correctAnswer);
    }
    quizquesDiv.appendChild(createDiv);

}


function allDone() {
    quizquesDiv.innerHTML = "";
    currentTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Finitooo You Completed The Quiz!"

    quizquesDiv.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    quizquesDiv.appendChild(createP);

    // time remaining will turn into the score 
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;
        quizquesDiv.appendChild(createP2);
    }

    // initials 
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    quizquesDiv.appendChild(createLabel);


    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    quizquesDiv.appendChild(createInput);


    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    quizquesDiv.appendChild(createSubmit);

    // localstorage will store the initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            window.location.replace("./highscore.html");
        }
    });

}


