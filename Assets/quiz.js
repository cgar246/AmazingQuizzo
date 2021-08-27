// array with all the questions and answers
var myQuestions = [
{
    title: "commonly used data types DO NOT include",
    possibilities: [
    "strings",
    "booleans",
    "alerts",
    "numbers"
    ],
    answer: "booleans"
},
{
    title: "The condition in an if an if / else statement is enclosed with _____.",
    possibilities: [
    "quotes",
    "curly brackets",
    "parenthesis",
    "square brackets"
],
    answer: "parenthesis"
},
{
    title: "Arrays in JavaScript can be used to store ___.",
    possibilities: [
    "numbers",
    "other arrays",
    "booleans",
    "all of the above"
],
    answer: "all of the above"
},
{
    title: "String values must be enclosed within ___ when being assigned to variables",
    possibilities: [
    "commas",
    "curly brackets",
    "quotes",
    "paranthesis"
    ],
    answer: "curly brackets"
},
{
    title: "A very useful tool used during development and debugging for printing content to the debugger is:",
    possibilities: [
    "JavaScript",
    "terminal / bash",
    "for loops",
    "console.log"
    ],
    answer: "for loops"
},
];

// all declared variables
var score = 0;
var correctAnswer = 0;
var currentTime = document.querySelector("#remainingTime");
var timer = document.querySelector("#start");
var quizquesDiv = document.querySelector("#quizquesDiv");
var wrapper = document.querySelector("#wrapper");

// Seconds left is 15 seconds per question:
var secondsLeft = 75;
// Holds interval time
var holdInterval = 0;
// Holds penalty time
var penalty = 15;
// Creates new element
var ulCreate = document.createElement("ul");

// Triggers timer on button, shows user a display on the screen
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

// Renders questions and choices to page: 
function render(correctAnswer) {
    // Clears existing data 
    quizquesDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // For loops to loop through all info in array
    for (var i = 0; i < myQuestions.length; i++) {
        // Appends question title only
        var userQuestion = myQuestions[correctAnswer].title;
        var userChoices = myQuestions[correctAnswer].possibilities;
        quizquesDiv.textContent = userQuestion;
    }

    // New for each for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        quizquesDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

// Event to compare choices with answer
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
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + myQuestions[correctAnswer].answer;
        }

    }
    // Question Index determines number question user is on
    correctAnswer++;

    if (correctAnswer >= myQuestions.length) {
        // All done will append last page with user stats
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + myQuestions.length + " Correct!";
    } else {
        render(correctAnswer);
    }
    quizquesDiv.appendChild(createDiv);

}

// All done will append last page
function allDone() {
    quizquesDiv.innerHTML = "";
    currentTime.innerHTML = "";

    // Heading:
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    quizquesDiv.appendChild(createH1);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    quizquesDiv.appendChild(createP);

    // Calculates time remaining and replaces it with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;
        quizquesDiv.appendChild(createP2);
    }

    // Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    quizquesDiv.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    quizquesDiv.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    quizquesDiv.appendChild(createSubmit);

    // Event listener to capture initials and local storage for initials and score
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
            // Travels to final page
            window.location.replace("./highscore.html");
        }
    });

}


