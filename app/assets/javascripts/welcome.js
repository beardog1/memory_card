

 // Make an array which has 2 of each, then randomize it
 var selected = [];
 var card1 = "";
 var card2 = "";
 score = 0;
 $(document).ready(function(){
   function shuffle(o){
     for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
     return o;}


  for (var i = 0; i < 8; i++) {
      faces = [1,2,3,4,5,6,7,8];
      // Randomly pick one from the array of remaining faces
      var randomInd = Math.floor(Math.random(faces.length));
      var face = i;
      // Push 2 copies onto array
      selected.push(face);
      selected.push(face);
      // Remove from array
      faces.splice(randomInd, 1);
  }
  shuffle(selected);

  var shuffleIndex = 0;
  $(".Square p").each(function(){
      $(this).text(selected[shuffleIndex]);
      shuffleIndex += 1;
    });

  $(".Square").click(function(){
    flipOver($(this).children());
  });


});

function delayedHide(card1, card2) {
  var $hide1 = $(card1);
  var $hide2 = $(card2);
  //card1.addClass("hide");
  //card2.addClass("hide");
  $hide1.delay(1000).fadeOut(500);
  $hide2.delay(1000).fadeOut(500);
}


function flipOver(card){
  if(card.hasClass("hide")){
    addScore();
    card.fadeIn(1);
    card.removeClass("hide");
    if(card1 == "") {
      card1 = card;
    }
    else if(card2 == "") {
      card2 = card;
    }
    if(card2 != "" && card1 != ""){
      if(card1.text() == card2.text()) {
        card1 = "";
        card2 = "";
        matchFound();

      }
      else {
        card1.addClass("hide");
        card2.addClass("hide");
        //change card1 from jquery object to javascript array to pass through the settimeout function
        delayedHide(card1, card2);
        noMatch();
        card1 = "";
        card2 = "";
      }

      }
      checkForWin();
  }
}

function checkForWin() {
  deck = 0
  $(".Square p").each(function() {
  if(!$(this).hasClass("hide")) {
    deck++;
  }
  })
  if(deck >= 16) {
    youWin();
  }
  }


function youWin() {
  $(".Win").text("You Win!");
}

function matchFound() {
  $(".Message").text("Match Found!");
}

function noMatch() {
  $(".Message").text("No Match.")
}

function addScore() {
  score++;
  $(".scoreboard").text(score);
}


