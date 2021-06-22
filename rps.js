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

  calculateMatchWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    if ((humanMove === 'rock' && computerMove === 'scissors') ||
        (humanMove === 'paper' && computerMove === 'rock') ||
        (humanMove === 'scissors' && computerMove === 'paper')) {
      this.human.score += 1;
      return 'human';
    } else if ((humanMove === 'rock' && computerMove === 'paper') ||
               (humanMove === 'paper' && computerMove === 'scissors') ||
               (humanMove === 'scissors' && computerMove === 'rock')) {
      this.computer.score += 1;
      return 'computer';
    }
    return 'tie';
  },

  displayMatchWinner() {
    let winner = this.calculateMatchWinner();

    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    switch (winner) {
      case 'human':
        console.log('You Win!');
        console.log(`The score is You: ${this.human.score}, Computer: ${this.computer.score}`);
        break;
      case 'computer':
        console.log('Computer Wins!');
        console.log(`The score is You: ${this.human.score}, Computer: ${this.computer.score}`);
        break;
      default:
        console.log("It's a tie.");
        console.log(`The score is You: ${this.human.score}, Computer: ${this.computer.score}`);
        break;
    }
  },

  calculateRoundWinner() {
    const MATCHES_NEEDED = 5;
    if (this.human.score === MATCHES_NEEDED) {
      return 'human';
    } else if (this.computer.score === MATCHES_NEEDED) {
      return 'computer';
    }
    return false;
  },

  displayRoundWinner() {
    let winner = this.calculateRoundWinner();

    switch (winner) {
      case 'human':
        console.log('You have won the Round!');
        break;
      case 'computer':
        console.log('The computer has won the Round.');
        break;
      default:
        break;
    }

    return false;
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
      this.displayMatchWinner();
      this.displayRoundWinner();
      if (this.calculateRoundWinner() && !this.playAgain()) break;
    }

    this.displayGoodbyeMessage();
  },
};

RPSGame.play();

function createPlayer() {
  return {
    move: null,
    score: 0,
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