const readline = require('readline-sync');
const winningMoves = {
  scissors: ['paper', 'lizard'],
  paper: ['rock', 'spock'],
  rock: ['lizard', 'scissors'],
  lizard: ['spock', 'paper'],
  spock: ['scissors', 'rock'],
};
const RPSGame = {
  human: createHuman(),
  computer: createComputer(),

  displayWelcomeMessage() {
    console.log('Welcome to RPSLS, first to 5 match wins, wins the round!');
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing RPSLS. Goodbye!');
  },

  calculateMatchWinner() {
    let humanMove = this.human.move;
    this.human.moveHistory[humanMove] += 1;
    let computerMove = this.computer.move;
    this.computer.moveHistory[computerMove] += 1;

    if (winningMoves[humanMove].includes(computerMove)) {
      this.human.score += 1;
      return 'human';
    } else if (winningMoves[computerMove].includes(humanMove)) {
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
        return this.resetScore();
      case 'computer':
        console.log('The computer has won the Round.');
        return this.resetScore();
      default:
        break;
    }

    return false;
  },

  resetScore() {
    this.human.score = 0;
    this.computer.score = 0;
    return true;
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
      console.log(this.computer);
      console.log(this.human);
      if (this.displayRoundWinner() && !this.playAgain()) break;
    }

    this.displayGoodbyeMessage();
  },
};

RPSGame.play();

function createPlayer() {
  return {
    move: null,
    score: 0,
    moveHistory: {
      rock: 0,
      paper: 0,
      scissors: 0,
      lizard: 0,
      spock: 0,
    }
  };
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
      const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
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
        console.log('Please choose rock, paper, scissors, lizard, or spock:');
        choice = readline.question();
        if (Object.keys(winningMoves).includes(choice)) break;
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