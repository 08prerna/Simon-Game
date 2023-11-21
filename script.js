var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = []; //randomChosenColour

var userClickedPattern = []; //userChosenColour

var started=false;

var level=0;

$(document).keypress(function () { 
    if(!started){
        $("#level-title").text("Level "+level);
        $("#direction").text("wait!")
        nextSequence();
        started=true
    }
});

$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
    userClickedPattern=[]
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(150).fadeOut(150).fadeIn(150);
    playSound(randomChosenColour);
    $("#direction").text("start!")

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
     setTimeout(function () {
         $("#" + currentColour).removeClass("pressed");
     }, 100);
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence()
            }, 100);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setInterval(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level=0;
    gamePattern=[];
    started=false;
}