var startEl = document.querySelector("start-page")
var startBtn = document.getElementById("start-button")
var timer = document.getElementById("seconds")
// var display = document.querySelector("display")

var ttlSecs = 10

function secondsLeft() {
    var timerInterval = setInterval(function() {
        ttlSecs--;
        timer.textContent = ttlSecs + " seconds left";

        if(ttlSecs === 0) {
            clearInterval(timerInterval);
            endQuiz()
        }
    }, 1000);
}

function endQuiz() {
    var testEl = document.createElement("p")

    testEl.setAttribute = "test"
}

secondsLeft()
endQuiz()

startBtn.addEventListener("change", function() {
    // var clear = document.getElementById("display")
    // clear.innerHTML = "test";
    var questOne = document.createElement("div")
    questOne.innerHTML = "test";
    console.log("1")
});