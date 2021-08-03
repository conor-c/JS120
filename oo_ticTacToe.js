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
  constructor(boardSize = 9) {
    this.reset(boardSize);
  }

  reset(boardSize = 9) {
    this.squares = {};
    for (let count = 1; count <= boardSize; count++) {
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
    this.board = new Board(TTTGame.BOARD_SIZE);
    this.human = new Human();
    this.computer = new Computer();
  }

  static SQUARES_FOR_MATCH_POINT = 2;
  static GAMES_TO_WIN_MATCH = 3;
  static CENTER_SQUARE = '5'; // for possible board expansion
  static BOARD_SIZE = 9;
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
  // Start Display Messages Section
  displayWelcomeMessage() {
    console.clear();
    console.log('Welcome to Tic Tac Toe!');
    console.log("");
  }

  displayGoodbyeMessage() {
    console.log(`Thanks for playing Tic Tac Toe! Goodbye!`);
  }

  displayGameResults() {
    if (this.isGameWinner(this.human)) {
      console.log("You won this game! Congratulations!");
    } else if (this.isGameWinner(this.computer)) {
      console.log("Ha! I've won this game! Take that silly Human!");
    } else {
      console.log("A tie game. *sighs*");
    }
  }

  displayMatchVictoryMessage() {
    if (this.isMatchWinner(this.human)) {
      console.log("Congratulations! You've won the match!")
    } else if (this.isMatchWinner(this.computer)) {
      console.log(`Better luck next time. But I've won the match with my ${this.computer.getScore()} game victories!`)
    }
  }

  displayMatchScore() {
    console.log('**********************************');
    console.log(`The score is:`);
    console.log(`You: ${this.human.getScore()}`);
    console.log(`Computer: ${this.computer.getScore()}`);
    console.log('**********************************');
  }
  // End Display Messages Section

  someoneWon() {
    return this.isGameWinner(this.human) || this.isGameWinner(this.computer);
  }

  increaseScore() {
    if (this.isGameWinner(this.human)) {
      this.human.increaseScore();
    } else if (this.isGameWinner(this.computer)) {
      this.computer.increaseScore();
    }
  }

  isGameWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

  isMatchWinner(player) {
    return player.getScore() >= TTTGame.GAMES_TO_WIN_MATCH;
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  matchOver() {
    return this.isMatchWinner(this.human) || this.isMatchWinner(this.computer);
  }

  playerMoves(player) {
    player === this.human ? this.humanMoves() : this.computerMoves();
  }
  
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

  // Start Computer Moves Logic
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
    return this.board.isUnusedSquare(TTTGame.CENTER_SQUARE) ? TTTGame.CENTER_SQUARE : null;
  }

  findRandomSquare() {
    let validChoices = this.board.unusedSquares();
    let randomChoice;

    do {
      randomChoice = Math.floor((TTTGame.BOARD_SIZE * Math.random()) + 1).toString();
    } while (!validChoices.includes(randomChoice)); 

    return randomChoice;
  }

  computerDefenseMove() {
    return this.findOptimalMoveFor(this.human);
  }

  computerOffenseMove() {
    return this.findOptimalMoveFor(this.computer)
  }

  findOptimalMoveFor(player) {
    let threatSquares = TTTGame.POSSIBLE_WINNING_ROWS.reduce((emptySquares, row) => {
      if (this.board.countMarkersFor(player, row) === TTTGame.SQUARES_FOR_MATCH_POINT) {
        let unmarkedSquare = row.find(square => this.board.isUnusedSquare(square));
        if (unmarkedSquare) {
          emptySquares.push(unmarkedSquare);
        }
      }
      return emptySquares;
    }, []);

    return threatSquares.length > 0 ? threatSquares[0] : null;
  }
  // End Computer Moves Logic

  getFirstPlayer() {
    let decision;

    while (true) {
      decision = readline.question('Would you like to start the match by going first? (y/n): ');
      if (['y', 'n'].includes(decision.toLowerCase())) break;

      console.log("Sorry that's not a valid decision");
    }

    console.clear();
    return decision === 'y' ? this.human : this.computer; 
  }

  toggleCurrentPlayer(currentPlayer) {
    return currentPlayer === this.human ? this.computer : this.human;
  }

  // Orchestration Engine
  play() {
    this.displayWelcomeMessage();
    this.playMatch();
    this.displayGoodbyeMessage();
  }

  playMatch() {
    console.log(`First to reach ${TTTGame.GAMES_TO_WIN_MATCH} game wins, wins the match.`);
    this.startingPlayer = this.getFirstPlayer(); // adds startingPlayer to TTTGame, located here in case we ever want to playAgain MATCHES

    while (true) {
      this.playAGame();
      this.increaseScore();
      this.displayMatchScore();

      if (this.matchOver()) break;
      if (!this.playAgain()) break;
      this.startingPlayer = this.toggleCurrentPlayer(this.startingPlayer);
    }

    this.displayMatchVictoryMessage();
  }

  playAGame() {
    this.board.reset(TTTGame.BOARD_SIZE);
    this.board.display();
    let currentPlayersTurn = this.startingPlayer;

    while (true) {
      this.playerMoves(currentPlayersTurn);
      if (this.gameOver()) break;

      this.board.displayAndClear();
      currentPlayersTurn = this.toggleCurrentPlayer(currentPlayersTurn);
    }

    this.board.displayAndClear();
    this.displayGameResults();
  }

  playAgain() {
    let choice;

    while (true) {
      choice = readline.question('Play again? (y/n): ');
      if (['y', 'n'].includes(choice.toLowerCase())) break;

      console.log("Sorry that's not a valid choice.");
    }

    console.clear();
    return choice === 'y';
  }
}

let game = new TTTGame();
game.play();