
// The classical approach to planning an object-oriented application
// includes several steps:

// Write a textual description of the problem or exercise.
// Extract the significant nouns and verbs from the description.
// Organize and associate the verbs with the nouns.


// RPS is a two player game, where each player chooses one of three possible
// moves, rock, paper, or scissors. The winner is selected
// by comparing their chosen moves against each-other based on the rules.

// Rules:
// • Rock 'crushes' scissors (rock wins against scissors)
// • Scissors 'cuts' paper (scissors wins against paper)
// • Paper 'wraps' rock (paper wins against rock)
// • If the moves are the same, a tie ensues

// Nouns: player, move, rule
// Verbs: choose, compare

// Associate
// Player - choose
// Move - Rule


// ? compare
const readline = require('readline-sync');
const RPSGame = {
  human: createHuman(),
  computer: createComputer(),

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors!');
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  },

  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    if ((humanMove === 'rock' && computerMove === 'scissors') ||
        (humanMove === 'paper' && computerMove === 'rock') ||
        (humanMove === 'scissors' && computerMove === 'paper')) {
      console.log('You Win!');
    } else if ((humanMove === 'rock' && computerMove === 'paper') ||
               (humanMove === 'paper' && computerMove === 'scissors') ||
               (humanMove === 'scissors' && computerMove === 'rock')) {
      console.log('Computer Wins!');
    } else {
      console.log("It's a tie");
    }
  },

  playAgain() {
    let repeat;
    while (true) {
      console.log('Would you like to play again? Enter ("yes" or "no")');
      repeat = readline.prompt();
      if (['yes', 'no'].includes(repeat)) break;
      console.log('Please enter "yes" or "no".');
    }

    return repeat === 'yes';
  },

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (!this.playAgain()) break;
    }

    this.displayGoodbyeMessage();
  },
};

RPSGame.play();

function createPlayer() {
  return {
    move: null,
  };
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
      const choices = ['rock', 'paper', 'scissors'];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    },
  };

  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;

      while (true) {
        console.log('Please choose rock, paper, or scissors:');
        choice = readline.question();
        if (['rock', 'paper', 'scissors'].includes(choice)) break;
        console.log('Sorry, choice is invalid.');
      }

      this.move = choice;
    },
  };

  return Object.assign(playerObject, humanObject);
}

// function createMove() {
//   return {
//     // state: type of move (rock, paper, scissors)
//   }
// }

// function createRule() {
//   return {
//     // state? do rules need a state?
//   }
// }

// let compare = function(move1, move2) {
//   // compares moves
// }