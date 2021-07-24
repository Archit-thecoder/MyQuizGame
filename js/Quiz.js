class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide();
    background("yellow");
    Contestant.getContestantInfo();
    if(allContestants !== undefined){
      var displayAnswer = 280
      fill("blue")
      textSize(20)
      text("contestant who answered corret will be highlighted in green ",150,250)
      text("contestant who answered wrong will be highlighted in red ",150,280)
      for(var plr in allContestants){
        var correctAns = "2"
        if(correctAns === allContestants[plr].answer){
          fill("green")
        }
        else{
          fill("red")
        }
        displayAnswer += 30
        textSize(20)
        text(allContestants[plr].name +":"+allContestants[plr].answer,300,displayAnswer)

      }
    }
  }

}
