import { CustomHtmlElement } from '../custom-html-element';
import template from './tic-tac-toe-game.html';
import style from './tic-tac-toe-game.raw.scss';

const difficulty = {
  noob: Symbol('noob'),
  regular: Symbol('regular'),
  pro: Symbol('pro')
};

const difficulties = [difficulty.noob, difficulty.regular, difficulty.pro];

const player = {
  x: Symbol('x'),
  o: Symbol('o')
}

/**
 * This component is a fully functional Tic Tac Toe game. Include it anywhere
 * in your page with
 *
 * <tic-tac-toe-game></tic-tac-toe-game>
 *
 * The tag doesn't take any attributes.
 *
 * Upon loading, the game will automatically start. The user is always player
 * 'X'; the computer always 'O'.
 *
 * There are three difficulty settings: noob, regular and pro. The game starts
 * in 'regular' difficulty. If the user loses, the difficulty decreases by one,
 * if the user wins, the difficulty increases. Stalemates don't affect the
 * difficulty setting.
 *
 * When a game ends, a message about the outcome of the game is displayed and
 * the game restarts. Whoever was the second player in the previous round will
 * now start the game.
 */
export class TicTacToeGameElement extends CustomHtmlElement {
  static get template() {
    return template;
  }

  static get style() {
    return style;
  }

  static get elementTagName() {
    return 'tic-tac-toe-game';
  }

  constructor() {
    super();
    this._currentPlayer;
    this.startingPlayer;
    this.currentDifficulty;
    this.board;
    this.boardElements;

    this.rootElement = this.select('#game');
  }

  get currentPlayer() {
    return this._currentPlayer;
  }

  get canMove() {
    return this.currentPlayer === player.x
  }

  set currentPlayer(currentPlayer) {
    this._currentPlayer = currentPlayer;

    if (this.rootElement) {
      this.rootElement.classList = this.canMove
        ? 'can-move'
        : '';
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.boardElements = TicTacToeGameElement.createBoard();
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        this.boardElements[y][x] = this.select(`div[data-y="${y}"][data-x="${x}"]`);
      }
    }

    this.initClickListener();

    this.reset(player.x, difficulty.regular);
  }

  initClickListener() {
    this.rootElement.addEventListener('click', event => {
      const target = event.target;
      if (target.attributes.getNamedItem('data-x') && target.attributes.getNamedItem('data-y')) {
        const x = Number(target.attributes.getNamedItem('data-x').value);
        const y = Number(target.attributes.getNamedItem('data-y').value);

        if (this.currentPlayer === player.x && !this.board[y][x]) {
          this.move(player.x, x, y);
        }
      }
    });
  }

  /**
   * Starts a new game
   * @param {symbol} startingPlayer The player who is supposed to go first in the new game
   * @param {symbol} newDifficulty The difficulty for the new game
   */
  reset(startingPlayer, newDifficulty) {
    this.board = TicTacToeGameElement.createBoard();
    this.currentDifficulty = newDifficulty;
    this.currentPlayer = startingPlayer;
    this.startingPlayer = startingPlayer;

    this.updateBoardElements();
  }

  /**
   * Makes board changes visible
   */
  updateBoardElements() {
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        const boardElement = this.boardElements[y][x];
        switch (this.board[y][x]) {
          case player.o:
            boardElement.classList = 'o';
            break;
          case player.x:
            boardElement.classList = 'x';
            break;
          default:
            boardElement.classList = '';
        }
      }
    }
  }

  /**
   * Conducts a move and checks whether the game has ended. If it has, it starts a new game.
   * @param {symbol} movingPlayer
   * @param {number} x
   * @param {number} y
   * @returns {void}
   */
  move(movingPlayer, x, y) {
    if (this.board[y][x]) {
      console.warn(`Tile x: ${x}, y: ${y} is already filled`);
      return;
    }
    if (movingPlayer !== this.currentPlayer) {
      console.warn('This player is not allowed to move yet.', movingPlayer);
      return;
    }

    this.board[y][x] = movingPlayer;
    this.updateBoardElements();

    let winner;
    if (winner = TicTacToeGameElement.checkWinner(this.board)) {
      let newDifficultyIndex = difficulties.indexOf(this.currentDifficulty);
      if (winner === player.x) {
        alert('Congratulations! You won!');
        newDifficultyIndex++;
      } else {
        if (this.currentDifficulty === difficulty.noob) {
          alert('How did you manage to lose? I was programmed to let you win this round!');
        } else {
          alert('Better luck next time!');
        }
        newDifficultyIndex--;
      }
      if (newDifficultyIndex < 0) {
        newDifficultyIndex = 0;
      }
      if (newDifficultyIndex >= difficulties.length) {
        newDifficultyIndex = difficulties.length - 1;
      }
      const startingPlayer = this.startingPlayer === player.x ? player.o : player.x;

      this.reset(startingPlayer, difficulties[newDifficultyIndex])
    } else if (TicTacToeGameElement.findFreeCells(this.board).length === 0) {
      alert('Stalemate! You\'re both losers!');
      const startingPlayer = this.startingPlayer === player.x ? player.o : player.x;
      this.reset(startingPlayer, this.currentDifficulty);
    } else {
      this.currentPlayer = movingPlayer === player.x ? player.o : player.x;
    }

    if (this.currentPlayer === player.o) {
      this.moveAiDelay();
    }
  }

  moveAiDelay() {
    setTimeout(() => {
      this.moveAi();
    }, 1000);
  }

  /**
   * Performs a move for the computer (O) player
   */
  moveAi() {
    let nextMove;

    switch (this.currentDifficulty) {
      case difficulty.noob:
        nextMove = this.predict(TicTacToeGameElement.copyBoard(this.board), player.o, 0, true).move;
        break;
      case difficulty.regular:
        if (Math.random() < 0.65) {
          nextMove = this.predict(TicTacToeGameElement.copyBoard(this.board), player.o).move;
        } else {
          nextMove = this.getRandomMove();
        }
        break;
      case difficulty.pro:
        nextMove = this.predict(TicTacToeGameElement.copyBoard(this.board), player.o).move;
        break;
    }

    const { x, y } = nextMove;

    this.move(player.o, x, y);
  }

  /**
   * Out of all possible moves, pick one randomly
   * @returns {Move}
   */
  getRandomMove() {
    const availableMoves = TicTacToeGameElement.findFreeCells(this.board);

    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  /**
   * Minimax algorithm that picks the next move for the computer (O) player.
   *
   * @typedef {{ x: number, y: number }} Move
   * @typedef {{ move: Move, score: number }} Prediction
   *
   * @param {Board} board
   * @param {symbol} currentPlayer
   * @param {number} depth
   * @param {boolean} stupid The 'stupid' flag turns this minimax algorithm into
   *                         'minimin', i.e. try to lose as fast as possible.
   * @returns {Prediction}
   */
  predict(board, currentPlayer, depth = 0, stupid = false) {
    let winner;
    if (winner = TicTacToeGameElement.checkWinner(board)) {
      if (winner === player.o) {
        return { score: 10 - depth };
      } else {
        return { score: depth - 10 };
      }
    }

    const availableMoves = TicTacToeGameElement.findFreeCells(board);

    if (availableMoves.length === 0) {
      return { score: 0 };
    }

    const moves = [];
    depth++;

    for (const availableMove of availableMoves) {
      const boardCopy = TicTacToeGameElement.copyBoard(board);
      const { x, y } = availableMove;
      boardCopy[y][x] = currentPlayer;

      const nextPlayer = currentPlayer === player.x ? player.o : player.x;

      const predictions = this.predict(boardCopy, nextPlayer, depth, stupid);
      moves.push({
        move: availableMove,
        score: predictions.score
      });
    }

    if (currentPlayer === player.o && !stupid) {
      // max calculation
      return moves.reduce(this.minimaxReducer((a, v) => v > a));
    } else {
      // min calculation
      return moves.reduce(this.minimaxReducer((a, v) => v < a));
    }
  }

  /**
   * @param {(accumulator: number, value: number) => boolean} comparatorFn
   * @returns {(accumulator: Prediction, value: Prediction) => Prediction}
   */
  minimaxReducer(comparatorFn) {
    return function(a, v) {
      if (comparatorFn(a.score, v.score)) {
        return v;
      } else if (v.score === a.score) {
        return Math.random() >= 0.5 ? v : a;
      } else {
        return a;
      }
    }
  }

  /**
   * @typedef {[symbol | null, symbol | null, symbol | null]} BoardRow
   * @typedef {[BoardRow, BoardRow, BoardRow]} Board
   * @returns {Board}
   */
  static createBoard() {
    return [[null, null, null], [null, null, null], [null, null, null]];
  }

  /**
   * @param {Board} board
   * @returns {Board}
   */
  static copyBoard(board) {
    return [[...board[0]], [...board[1]], [...board[2]]];
  }

  /**
   * @param {Board} board
   * @returns {symbol | null}
   */
  static checkWinner(board) {
    const checkWinnerReducer = (a, v) => a === v && v !== null ? v : null;
    let winner;

    // horizontals
    for (const row of board) {
      if (winner = row.reduce(checkWinnerReducer)) {
        return winner;
      }
    }

    // verticals
    for (let i = 0; i < 3; i++) {
      const column = [board[0][i], board[1][i], board[2][i]];
      if (winner = column.reduce(checkWinnerReducer)) {
        return winner;
      }
    }

    // diagonals
    const ascending = [board[2][0], board[1][1], board[0][2]];
    if (winner = ascending.reduce(checkWinnerReducer)) {
      return winner;
    }

    const descending = [board[0][0], board[1][1], board[2][2]];
    if (winner = descending.reduce(checkWinnerReducer)) {
      return winner;
    }

    return null;
  }

  /**
   * Returns all free cells in the board
   * @param {Board} board
   * @returns {[Move]}
   */
  static findFreeCells(board) {
    const result = [];

    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        if (!board[y][x]) {
          result.push({ x, y });
        }
      }
    }

    return result;
  }
}
