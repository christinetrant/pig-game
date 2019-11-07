/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

BONUS:
1.
  A player lose his ENTIRE (global?) score when he rolls two sixes in a row.  After that, it's the next player's turn.
  (HINT: Always save the previous dice roll in a separate variable.)
2.  
  Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100.
  (HINT: You can read that value with the .value property in javascript.  Use google!)
3.
  Add another dice to the game, so that there are two dices now.  The player loses their current score when one of them is a 1.  
  (HINT: You will need to use CSS to position the second dice, so look at the CSS for the first one)
  */

// screen.orientation.onchange = function () {
//  var type = screen.orientation.type;
//  if (type.match(/portrait/)) {
//    alert('Please flip to landscape, to use this app!');
//  }
// }
var orientation = screen.msOrientation || screen.mozOrientation || (screen.orientation || {}).type;

if (orientation === "landscape-primary") {
  console.log("That looks good.");
} else if (orientation === "landscape-secondary") {
  console.log("Mmmh... the screen is upside down!");
} else if (orientation === "portrait-secondary" || orientation === "portrait-primary") {
  console.log("Mmmh... you should rotate your device to landscape");
  alert('Please flip to landscape, to use this app!');
} else if (orientation === undefined) {
  console.log("The orientation API isn't supported in this browser :("); 
}


var scores, roundScore, activePlayer, gamePlaying, lastRoll, winScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  //gamePlaying - is our game over or still in play?
  //Need to do all this IF our game is still in play! if game play is true then:
  if (gamePlaying) {               
    // 1. Random Number
    var dice1 = Math.floor(Math.random()*6) + 1;
    var dice2 = Math.floor(Math.random()*6) + 1;

    // 2. Display result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'img/dice-' + dice1 + '.png'; 
    document.getElementById('dice-2').src = 'img/dice-' + dice2 + '.png'; 

    // 3. Update the round's score IF the rolled dice number is NOT a 1
    if(dice1 !== 1 && dice2 !== 1) {
      //Add score
      roundScore += dice1 + dice2;
      //This is displayed in players current score box
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      alert("You rolled a 1!");
      //NEXT PLAYER
      nextPlayer();
    }

    //4. BONUS: Player loses their ENTIRE (scores[activePlayer]) score when they roll two double sixes in a row
    if((dice1+dice2) === 12 && lastRoll === 12) {
      //Reset lastRoll to 0
      lastRoll=0;
      //Delete scores
      scores[activePlayer] = 0;
      alert("Two Sixes rolled in a row!");
      //NEXT PLAYER
      nextPlayer();
    } else {
      //lastRoll = 12
      lastRoll = 12;
    }
  } //else nothing             
});

//Button hold event listener:
document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {       
    //When player clicks button we want to:
    // 1. Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore; 
    //scores[activePlayer] = scores[activePlayer] + roundScore;

    // 2. Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Check if the player has input a winning score:
    var input = document.getElementById('set-score').value;
    //console.log(input);
    var winScore;

    // Undefined, 0, null or "" are COERCED to false
    // Anything else is coerced to true.
    if(input) {
      winScore = input;
    } else {
      winScore = 100;
    }

    // 3. Check if the player has won the game:
    if (scores[activePlayer] >= winScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      // document.getElementById('dice-1').style.display = 'none';
      // document.getElementById('dice-2').style.display = 'none';
      hideDice();
      // Winner css class - call it here & remove the active class
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      //As the game has been won - the game is over:
      gamePlaying = false;
    } else {
      //Instead of duplicating code we take the next player code from first event listener and create a separate global function so we can call it from both eventListeners
      nextPlayer();
    }
  }
});

//NEXT PLAYER FUNCTION
function nextPlayer() {
  // Ternary operator same as if statement
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  //As it is moving onto the next player, the last player loses their score and goesback to zero.
  roundScore = 0;
  //We want to reset all options back to zero
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  //Instead of the above removing and adding we can toggle:
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  hideDice();
}

// NEW GAME BUTTON
//We want to reset all buttons to initial code so we create an init function and use a callback function within the event listener.
document.querySelector('.btn-new').addEventListener('click', init);

//initialise game to start off at zero
function init() {
  //var score1 = 0; var score2 = 0; for each player - instead we use an array:
  scores =[0,0];
  roundScore = 0;   //one round at a time
  activePlayer = 0; //active current Player
  gamePlaying = true; // game is in play

  //Want game to start fresh with everything set to 0.
  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  hideDice();

  //change the text to Player 1 and Player 2 in case of Winners in previous game:
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  //remove winner and active classes and re-add active class to Player 1:
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

// Function to set dice display style to none:
function hideDice() {
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}

// HELP button to explain rules of game
document.querySelector('.help').addEventListener('click', function () {
  document.querySelector('.help-rules').classList.add('visible');
})

document.querySelector('.help-rules-close').addEventListener('click', function () {
  document.querySelector('.help-rules').classList.remove('visible');
})