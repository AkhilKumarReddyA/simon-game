
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$(document).keydown(function(){
    if(!started){
        $("h1").text("level "+level);
        nextSequence();
        started = true;
    }
    
});



$(".btn").click(function(){
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);

    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }

    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press a letter to restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        
        startOver();

    }
}

function nextSequence(){
    userClickedPattern =[];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("level "+level);

    
}

function startOver(){
    level = 0;
    gamePattern = [];
    started=false;
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();

}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");

    },100);

}



