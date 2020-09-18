import { Board } from './board.js';
import { Block } from './block.js';
import { Puzzel } from './puzzel.js';

let board = new Board();
let boardElem = board.createBoard();
document.body.querySelector("#border-board").append(boardElem);

let block = new Block(board.height, board.width);