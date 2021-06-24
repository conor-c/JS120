const readline = require('readline-sync');
const winningMoves = { // To add more moves, add move that wins as key, and moves that lose as value
  rock: ['lizard', 'scissors'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['spock', 'paper'],
  spock: ['scissors', 'rock'],
};

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),
  matchesNeededToWin: 5,
  moveHistory: [],
  gameName: getGameName(),

  displayWelcome() {
    informUser(`Welcome to ${this.gameName}.`);
  },

  displayGoodbye() {
    informUser(`Thanks for playing ${this.gameName}!`);
  },

  informRules() {
    let choice;
    while (true) {
      promptUser(`Would you like the rules? Enter 'yes' or 'no'.`);
      choice = readline.question();
      if (['yes', 'no'].includes(choice)) break;
      informUser(`Error. "${choice}" is not a valid input.`);
    }

    if (choice === 'yes') {
      for (let winSequence in winningMoves) {
        informUser(`${winSequence} beats ${winningMoves[winSequence].join(' and ')}.`);
      }
      informUser(`** First player to ${this.matchesNeededToWin} Match wins, wins the Round! **`);
    }
  },

  calculateMatchWinner(humanMove, computerMove) {
    if (winningMoves[humanMove].includes(computerMove)) {
      this.human.incrementScore();
      return 'human';
    } else if (winningMoves[computerMove].includes(humanMove)) {
      this.computer.incrementScore();
      this.computer.favorableMoves.push(computerMove);
      return 'computer';
    }

    return 'tie';
  },

  updateMoveHistory() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    this.moveHistory.push({
      human: humanMove,
      computer: computerMove,
      winner: this.calculateMatchWinner(humanMove, computerMove),
    });
  },

  displayMatchResult() {
    let matchResult = this.moveHistory[this.moveHistory.length - 1].winner;
    let humanScore = this.human.getScore();
    let computerScore = this.computer.getScore();

    informUser(`You chose: ${this.human.move}`);
    informUser(`The computer chose: ${this.computer.move}`);

    if (matchResult === 'human') {
      informUser('You Win!');
    } else if (matchResult === 'computer') {
      informUser('Computer Wins!');
    } else {
      informUser("It's a tie.");
    }

    informUser(`The score is You: ${humanScore}, Computer: ${computerScore}`);
  },

  checkForRoundWinner() {
    if (this.human.getScore() === this.matchesNeededToWin) {
      this.displayRoundWinner('human');
      return true;
    } else if (this.computer.getScore() === this.matchesNeededToWin) {
      this.displayRoundWinner('computer');
      return true;
    }
    return false;
  },

  displayRoundWinner(winner) {
    if (winner === 'human') {
      informUser('You have won the Round!');
    } else {
      informUser('The computer has won the Round.');
    }
  },

  playAgain() {
    let repeat;
    while (true) {
      promptUser('Would you like to play again? Enter ("yes" or "no")');
      repeat = readline.prompt();
      if (['yes', 'no'].includes(repeat)) break;
      informUser(`Error. "${repeat}" is not a valid input.`);
    }

    return repeat === 'yes';
  },

  play() {
    this.displayWelcome();
    this.informRules();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.updateMoveHistory();
      this.displayMatchResult();
      // console.log(this.moveHistory);
      // console.log(this.computer);

      if (this.checkForRoundWinner()) {
        this.human.resetScore();
        this.computer.resetScore();
        if (!this.playAgain()) break;
      }
    }

    this.displayGoodbye();
  },
};

RPSGame.play();

function getGameName() {
  return Object.keys(winningMoves).map(move => move[0].toUpperCase()).join('');
}

function promptUser(string) {
  console.log(`=> ${string}`);
}

function informUser(string) {
  console.log(`|| ${string} ||`);
}

function createPlayer() {
  return {
    move: null,
    score: 0,

    getScore() {
      return this.score;
    },

    incrementScore() {
      this.score += 1;
    },

    resetScore() {
      this.score = 0;
    },
  };
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    favorableMoves: Object.keys(winningMoves),

    choose() {
      let randomIndex = Math.floor(Math.random() * this.favorableMoves.length);
      this.move = this.favorableMoves[randomIndex];
    },
  };

  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;
      let possibleMoves = Object.keys(winningMoves);
      let lastMove = possibleMoves[possibleMoves.length - 1];

      while (true) {
        promptUser(`Please choose either: ${possibleMoves.slice(0, -1).join(', ')}, or ${lastMove}.`);
        choice = readline.question();
        if (possibleMoves.includes(choice)) break;
        informUser(`Error. "${choice}" is not a valid input.`);
      }

      this.move = choice;
    },
  };

  return Object.assign(playerObject, humanObject);
}