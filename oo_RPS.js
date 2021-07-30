let readline = require('readline-sync');





// With classes

class Player {
  constructor() {
    this.move = null;
  }
}

class Computer extends Player {
  constructor() {
    super();
  }

  choose() {
    const choices = ['rock', 'paper', 'scissors'];
    let randomIdx = Math.floor(Math.random() * choices.length);
    this.move = choices[randomIdx];
  }
}

class Human extends Player {
  constructor() {
    super();
  }

  choose() {
    let choice;

    while (true) {
      console.log('Please choose rock, paper, or scissors:');
      choice = readline.question();
      if (['rock', 'paper', 'scissors'].includes(choice)) break;
      console.log('Sorry, invalid choice.');
    }
    this.move = choice;
  }
}

class RPSGame {
  constructor() {
    this.human = new Human();
    this.computer = new Computer();
  }

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors!');
  }

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  }

  displayWinner() {
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    if ((humanMove === 'rock' && computerMove === 'scissors') ||
        (humanMove === 'paper' && computerMove === 'rock') ||
        (humanMove === 'scissors' && computerMove === 'paper')) {
      console.log('You win!');
    } else if ((humanMove === 'rock' && computerMove === 'paper') ||
              (humanMove === 'paper' && computerMove === 'scissors') ||
              (humanMove === 'scissors' && computerMove === 'rock')) {
      console.log('Computer wins!');
    } else {
      console.log("It's a tie");
    }
  }

  playAgain() {
    console.log('Would you like to play again? (y/n)');
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  }

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (!this.playAgain()) break;
    }
    this.displayGoodbyeMessage();
  }
}

let rpsGame = new RPSGame();
rpsGame.play();

// With constructors and prototypes
// function Player() {
//   this.move = null;
// }

// function Computer() {
//   Player.call(this);
// }

// Computer.prototype.choose = function() {
//   const choices = ['rock', 'paper', 'scissors'];
//   let randomIdx = Math.floor(Math.random() * choices.length);
//   this.move = choices[randomIdx];
// }

// function Human() {
//   Player.call(this);
// }

// Human.prototype.choose = function() {
//   let choice;

//   while (true) {
//     console.log('Please choose rock, paper, or scissors:');
//     choice = readline.question();
//     if (['rock', 'paper', 'scissors'].includes(choice)) break;
//     console.log('Sorry, invalid choice.');
//   }
//   this.move = choice;
// }

// function RPSGame() {
//   this.human = new Human();
//   this.computer = new Computer();
// }

// RPSGame.prototype.displayWelcomeMessage = function() {
//   console.log('Welcome to Rock, Paper, Scissors!');
// }

// RPSGame.prototype.displayGoodbyeMessage = function() {
//   console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
// }

// RPSGame.prototype.displayWinner = function() {
//   console.log(`You chose: ${this.human.move}`);
//   console.log(`The computer chose: ${this.computer.move}`);
//   let humanMove = this.human.move;
//   let computerMove = this.computer.move;

//   if ((humanMove === 'rock' && computerMove === 'scissors') ||
//       (humanMove === 'paper' && computerMove === 'rock') ||
//       (humanMove === 'scissors' && computerMove === 'paper')) {
//     console.log('You win!');
//   } else if ((humanMove === 'rock' && computerMove === 'paper') ||
//              (humanMove === 'paper' && computerMove === 'scissors') ||
//              (humanMove === 'scissors' && computerMove === 'rock')) {
//     console.log('Computer wins!');
//   } else {
//     console.log("It's a tie");
//   }
// }

// RPSGame.prototype.playAgain = function() {
//   console.log('Would you like to play again? (y/n)');
//   let answer = readline.question();
//   return answer.toLowerCase()[0] === 'y';
// }

// RPSGame.prototype.play = function() {
//   this.displayWelcomeMessage();
//   while (true) {
//     this.human.choose();
//     this.computer.choose();
//     this.displayWinner();
//     if (!this.playAgain()) break;
//   }
//   this.displayGoodbyeMessage();
// }

// RPSGame.prototype.constructor = RPSGame;
// let game = new RPSGame();
// game.play();

// const RPSGame = {
  // human: new Human(),
  // computer: new Computer(),

  // displayWelcomeMessage() {
  //   console.log('Welcome to Rock, Paper, Scissors!');
  // },

  // displayGoodbyeMessage() {
  //   console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  // },

  // displayWinner() {
  //   console.log(`You chose: ${this.human.move}`);
  //   console.log(`The computer chose: ${this.computer.move}`);

  //   let humanMove = this.human.move;
  //   let computerMove = this.computer.move;

  //   if ((humanMove === 'rock' && computerMove === 'scissors') ||
  //       (humanMove === 'paper' && computerMove === 'rock') ||
  //       (humanMove === 'scissors' && computerMove === 'paper')) {
  //     console.log('You win!');
  //   } else if ((humanMove === 'rock' && computerMove === 'paper') ||
  //              (humanMove === 'paper' && computerMove === 'scissors') ||
  //              (humanMove === 'scissors' && computerMove === 'rock')) {
  //     console.log('Computer wins!');
  //   } else {
  //     console.log("It's a tie");
  //   }
  // },

  // playAgain() {
  //   console.log('Would you like to play again? (y/n)');
  //   let answer = readline.question();
  //   return answer.toLowerCase()[0] === 'y';
  // },

//   play() {
//     this.displayWelcomeMessage();
//     while (true) {
//       this.human.choose();
//       this.computer.choose();
//       this.displayWinner();
//       if (!this.playAgain()) break;
//     }

//     this.displayGoodbyeMessage();
//   },
// };

// RPSGame.play();