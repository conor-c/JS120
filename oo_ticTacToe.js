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
    return keys.filter(key => this.squares[key].isUnused());
  }

  joinOr(movesAvailable, separatorPunctuation = ', ', separatorWord = 'or') {
    if (movesAvailable.length <= 2) { //.join will return single entries without the separator
      return movesAvailable.join(` ${separatorWord} `);
    } else if (movesAvailable.length > 2) {
      let lastEntry = movesAvailable.pop();
      return movesAvailable.join(separatorPunctuation) + separatorPunctuation + separatorWord + ' ' + lastEntry;
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
  }

  getMarker() {
    return this.marker;
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
    let choice;
    let validChoices = this.board.unusedSquares();

    do {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!validChoices.includes(choice));

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  displayWelcomeMessage() {
    console.clear();
    console.log('Welcome to Tic Tac Toe!');
    console.log("");
  }

  displayGoodbyeMessage() {
    console.log('Thanks for playing Tic Tac Toe! Goodbye!');
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("You won! Congratulations!");
    } else if (this.isWinner(this.computer)) {
      console.log("Ha! I've won! Take that silly Human!");
    } else {
      console.log("A tie game. *sighs*");
    }
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  play() {
    this.displayWelcomeMessage();
    this.board.display();

    while (true) {
      while (true) {
        this.humanMoves();
        if (this.gameOver()) break;
  
        this.computerMoves();
        if (this.gameOver()) break;
        
        this.board.displayAndClear();
      }
  
      this.board.displayAndClear();
      this.displayResults();

      if (!this.playAgain()) break;

      this.board = new Board();
      this.board.displayAndClear();
    }

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