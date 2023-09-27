const buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userPattern = [];
var i=1;
started = false;

function randomButton(){
    userPattern = [];
    $("h1").text("Level "+i);
    var randomNumber = Math.floor((Math.random())*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("."+randomChosenColor).animate({opacity: 0},100);
    $("."+randomChosenColor).animate({opacity: 1},100);
    playSound(randomChosenColor);
    i++;
}

function restart(){
    gamePattern = [];
    started = false;
    i = 1;
}


$("button").click(function(){
    buttonid = $(this).attr("id");
    userPattern.push(buttonid);
    $(this).addClass("click");
    setTimeout(() => {$(this).removeClass("click");}, 100);
    checkAnswer(userPattern.length - 1);
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        console.log("success");
        playSound(buttonid);
        if (userPattern.length === gamePattern.length){
          setTimeout(function () {
            randomButton();
          }, 1000);
        }
      } else {
        console.log("wrong");
        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("gameover");
        setTimeout(() => {$("body").removeClass("gameover");}, 200);
        $("h1").text("Game Over. Press here to restart.");
        restart();
      }
}


$("h1").click(function(){
    if(!started){
        randomButton();
        started = true;
    }
})
    

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }