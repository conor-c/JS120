let readline = require('readline-sync');

let Square = {
  UNUSED_SQUARE: ' ',
  HUMAN_MARKER: 'X',
  COMPUTER_MARKER: 'O',

  init(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
    return this; //return this for method chaining
  },

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  },

  setMarker(marker) {
    this.marker = marker;
  },

  getMarker() {
    return this.marker;
  },

  toString() {
    return this.marker;
  },
}

let Board = {
  init() {
    this.squares = {};
    for (let count = 1; count <= 9; count++) {
      this.squares[count] = Object.create(Square).init();
    }

    return this;
  },

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  },

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  },

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  },

  isFull() {
    return this.unusedSquares().length === 0;
  },

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
  },

  displayAndClear() {
    console.clear();
    console.log('');
    console.log('');
    this.display();
  },
};

const PlayerPrototype = {
  initialize(marker) {
    this.marker = marker;
    return this;
  },

  getMarker() {
    return this.marker;
  },
};

let Human = Object.create(PlayerPrototype);

Human.init = function() {
  return this.initialize(Square.HUMAN_MARKER);
};

let Computer = Object.create(PlayerPrototype);

Computer.init = function() {
  return this.initialize(Square.COMPUTER_MARKER);
};

let TTTGame = {
  POSSIBLE_WINNING_ROWS: [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['3', '5', '7'],
  ],

  init() {
    this.board = Object.create(Board).init();
    this.human = Object.create(Human).init();
    this.computer = Object.create(Computer).init();
    return this;
  },

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square (${validChoices.join(', ')}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;
      
      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  },

  computerMoves() {
    let choice;
    let validChoices = this.board.unusedSquares();

    while (true) { //Consider refactor to a do-while loop, for clarity
      choice = Math.floor((9 * Math.random()) + 1).toString();
      if (validChoices.includes(choice)) break;
    }
    this.board.markSquareAt(choice, this.computer.getMarker());
  },

  displayWelcomeMessage() {
    console.clear();
    console.log('Welcome to Tic Tac Toe!');
    console.log("");
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Tic Tac Toe! Goodbye!');
  },

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("You won! Congratulations!");
    } else if (this.isWinner(this.computer)) {
      console.log("Ha! I've won! Take that silly Human!");
    } else {
      console.log("A tie game. *sighs*");
    }
  },

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  },

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  },

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  },

  play() {
    // orchestrate the game play
    // SPIKE
    this.displayWelcomeMessage();
    this.board.display();

    while (true) {
      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();
      if (this.gameOver()) break;
      
      this.board.displayAndClear();
    }

    this.board.displayAndClear();
    this.displayResults();
    this.displayGoodbyeMessage();
  },
}

let game = Object.create(TTTGame).init();
game.play();