let readline = require('readline-sync');

class Square {
  static UNUSED_SQUARE = ' ';
  static HUMAN_MARKER = 'X';
  static COMPUTER_MARKER = 'O';

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }

  toString() { // for method overriding from implicit type coercion
    return `${this.marker}`;
  }
}

class Board {
  constructor() {
    this.squares = {};
    for (let count = 1; count <= 9; count++) {
      this.squares[count] = new Square();
    }
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });
  
    return markers.length;
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.isUnusedSquare(key));
  }

  isUnusedSquare(key) {
    return this.squares[key].isUnused();
  }

  joinOr(movesAvailable, separatorPunctuation = ', ', separatorWord = 'or') {
    if (movesAvailable.length <= 2) { //.join will return single entries without the separator
      return movesAvailable.join(` ${separatorWord} `);
    } else if (movesAvailable.length > 2) {
      let lastEntry = movesAvailable[movesAvailable.length - 1];
      return movesAvailable.slice(0, -1).join(separatorPunctuation) + separatorPunctuation + separatorWord + ' ' + lastEntry;
    }
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }

  display() {
    console.log('');
    console.log("     |     |");
    console.log(`  ${this.squares['1']}  |  ${this.squares['2']}  |  ${this.squares['3']}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares['4']}  |  ${this.squares['5']}  |  ${this.squares['6']}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares['7']}  |  ${this.squares['8']}  |  ${this.squares['9']}`);
    console.log("     |     |");
    console.log("");
  }

  displayAndClear() {
    console.clear();
    console.log('');
    console.log('');
    this.display();
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
    this.score = 0;
  }

  getMarker() {
    return this.marker;
  }

  increaseScore() {
    this.score = this.score += 1;
  }

  getScore() {
    return this.score;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  static POSSIBLE_WINNING_ROWS = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['3', '5', '7'],
  ];

  static GAMES_TO_WIN_MATCH = 3;

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square (${this.board.joinOr(validChoices)}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;
      
      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    let choice = this.computerOffenseMove();

    if (!choice) {
      choice = this.computerDefenseMove();
    }

    if (!choice) {
      choice = this.findCenterSquare();
    }

    if (!choice) {
      choice = this.findRandomSquare();
    }

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  findCenterSquare() {
    return this.board.isUnusedSquare('5') ? '5' : null;
  }

  findRandomSquare() {
    let validChoices = this.board.unusedSquares();
    let randomChoice;

    do {
      randomChoice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!validChoices.includes(randomChoice)); 

    return randomChoice;
  }

  findOptimalMoveFor(player) {
    let threatSquares = TTTGame.POSSIBLE_WINNING_ROWS.reduce((emptySquares, row) => {
      if (this.board.countMarkersFor(player, row) === 2) {
        let unmarkedSquare = row.find(square => this.board.isUnusedSquare(square));
        if (unmarkedSquare) {
          emptySquares.push(unmarkedSquare);
        }
      }
      return emptySquares;
    }, []);

    return threatSquares.length > 0 ? threatSquares[0] : null;
  }

  computerDefenseMove() {
    return this.findOptimalMoveFor(this.human);
  }


  computerOffenseMove() {
    return this.findOptimalMoveFor(this.computer)
  }

  displayWelcomeMessage() {
    console.clear();
    console.log('Welcome to Tic Tac Toe!');
    console.log("");
  }

  displayGoodbyeMessage() {
    console.log(`Thanks for playing Tic Tac Toe! Goodbye!`);
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("You won this game! Congratulations!");
    } else if (this.isWinner(this.computer)) {
      console.log("Ha! I've won this game! Take that silly Human!");
    } else {
      console.log("A tie game. *sighs*");
    }
  }

  reportScore() {
    console.log('**********************************');
    console.log(`Games needed to win the match: ${TTTGame.GAMES_TO_WIN_MATCH}`);
    console.log(`The score is:`);
    console.log(`You: ${this.human.getScore()}`);
    console.log(`Computer: ${this.computer.getScore()}`);
    console.log('**********************************');
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  matchOver() {
    return this.human.getScore() === TTTGame.GAMES_TO_WIN_MATCH || this.computer.getScore() === TTTGame.GAMES_TO_WIN_MATCH;
  }

  winningMessage() {
    if (this.human.getScore() === TTTGame.GAMES_TO_WIN_MATCH) {
      console.log("Congratulations! You've won the match!")
    } else if (this.computer.getScore() === TTTGame.GAMES_TO_WIN_MATCH) {
      console.log(`Better luck next time. But I've won the match with my ${this.computer.getScore()} game victories!`)
    }
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  increaseScore() {
    if (this.isWinner(this.human)) {
      this.human.increaseScore();
    } else if (this.isWinner(this.computer)) {
      this.computer.increaseScore();
    }
  }

  play() {
    this.displayWelcomeMessage();
    this.board.display();

    while (true) {
      while (true) {
        this.humanMoves();
        this.reportScore();//test
        if (this.gameOver()) break;

        this.computerMoves();
        this.reportScore();//test
        if (this.gameOver()) break;
        
        this.board.displayAndClear();

        // this.board.display();
      }
  
      this.board.displayAndClear();
      this.displayResults();
      this.increaseScore();
      this.reportScore();

      if (this.matchOver()) break;
      if (!this.playAgain()) break;

      this.board = new Board();
      this.board.displayAndClear();
    }

    this.winningMessage();
    this.displayGoodbyeMessage();
  }

  playAgain() {
    let choice;

    while (true) {
      choice = readline.question('Play again? (y/n): ');
      if (['y', 'n'].includes(choice.toLowerCase())) break;

      console.log("Sorry that's not a valid choice.");
    }
    return choice === 'y';
  }
}

let game = new TTTGame();
game.play();