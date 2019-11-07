/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, gamePlaying;

//All the code we created to start the game off at zero also needs to be used when the new game button is clicked - we create an initial function and call it to save repeating code - DRY
init();

// EVENTS - An EVENT LISTENER is a function that performs an action based on a certain event.  It waits for a specific event to happen.
//ROLL DICE BUTTON:  for more options look up MDN EVENT REFERENCE
//This is a callback function where the function is called once the btn-roll button is clicked
/*function btn() {
  //Do something
}
btn();
document.querySelector('.btn-roll').addEventListener('click', btn) {
  //Do something
}*/

  //In this case we only use the function once the btn-roll button is clicked so we use an anonymous function which is within the event listener
  document.querySelector('.btn-roll').addEventListener('click', function() {
    //gamePlaying - is our game over or still in play?
    //Need to do all this IF our game is still in play! if game play is true then:
    if (gamePlaying) {               

      // 1. Random Number
      //Calculate Dice Roll Result   
      //.floor removes the decimal   //.random creates a random number
      //Dice doesn't need to be globally defined so we move it in here
      var dice = Math.floor(Math.random()*6) + 1;

      // 2. Display result
      var diceDOM = document.querySelector('.dice');
      diceDOM.style.display = 'block'; // once dice is rolled we want to display result
      diceDOM.src = 'img/dice-'+dice+'.png'; // selects png of dice number we've calculated

      // 3. Update the round's score IF the rolled dice number is NOT a 1
      if(dice !== 1) {
        //Add score
        roundScore += dice;
        //This is displayed in players current score box
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
      } else {
        //NEXT PLAYER
        nextPlayer();
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

    // 3. Check if the player has won the game:
    if (scores[activePlayer] >=10) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
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

  //we want the css active class to be on the active player(in html it is in player-0-panel):
    //document.querySelector('player-0-panel').classList.remove('active');
    //document.querySelector('player-1-panel').classList.add('active');

  //Instead of the above removing and adding we can toggle:
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  //When the player rolls 1 we want to hide the dice for the next user to roll:
  document.querySelector('.dice').style.display = 'none';
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

  //can change the css of dice class - we want to hide the dice class at the beginning of the game
  document.querySelector('.dice').style.display = 'none';

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

/*
//querySelector selects Id or class but the first one it finds
//textContent changes the text to show the dice result
    //document.querySelector('#current-0').textContent = dice;
//We can change current player to alternate between players by the following:
document.querySelector('#current-' + activePlayer).textContent = dice;

//To change content of HTML as well as text:
    //document.querySelector('#current-' + activePlayer).innerHTML = '<em>' +dice+ '</em>';

//reads the value of  ID score-0 - this is called a GETTER instead of above which are SETTERS
var x = document.querySelector('#score-0').textContent;
console.log(x);

*/