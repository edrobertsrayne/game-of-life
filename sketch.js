let columns = 50;
let rows = 50;

let cellWidth;
let cellHeight;

// arrays to hold the board state and next state
let board;
let next;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // set the cell dimensions
  cellWidth = windowWidth / columns;
  cellHeight = windowHeight / rows;

  // create the board arrays
  board = new Array(columns);
  next = new Array(columns);
  for (var i = 0; i < columns; i++) {
    board[i] = new Array(rows);
    next[i] = new Array(rows);
  }

  // randomise the initial board state
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      board[x][y] = floor(random(2));
    }
  }

  strokeWeight(1);
  stroke(0);
}

function calculateNextState(state, neighbours) {
  if (state == 1 && neighbours < 2) {
    return 0;
  } else if (state == 1 && neighbours > 3) {
    return 0;
  } else if (state == 0 && neighbours == 3) {
    return 1;
  } else {
    return state;
  }
}

function draw() {
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      // draw out the board as it stands
      fill(board[x][y] * 255);
      rect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
    }
  }

  for (let x = 1; x < columns - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
      let neighbours = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          neighbours += board[x + i][y + j];
        }
      }
      neighbours -= board[x][y];

      next[x][y] = calculateNextState(board[x][y], neighbours);
    }
  }

  // update the game board
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      board[x][y] = next[x][y];
    }
  }
}
