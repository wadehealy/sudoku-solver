import React, { useState } from "react";

import _ from "lodash";

import "./styles.scss";

const squareMap = {
  0: [0, 1, 2],
  1: [0, 1, 2],
  2: [0, 1, 2],
  3: [3, 4, 5],
  4: [3, 4, 5],
  5: [3, 4, 5],
  6: [6, 7, 8],
  7: [6, 7, 8],
  8: [6, 7, 8]
};

let puzzle = [
  ["_", "_", "_", "_", "_", "_", 3, "_", "_"],
  [8, 2, "_", "_", 7, "_", "_", 6, 1],
  [3, 6, "_", 1, "_", 5, "_", "_", "_"],
  ["_", 5, "_", 4, "_", 6, "_", 3, "_"],
  ["_", 9, 3, 2, 1, 8, 7, "_", 5],
  [4, 8, 2, "_", "_", 3, "_", "_", "_"],
  [2, 7, "_", "_", 3, 1, 9, "_", "_"],
  ["_", "_", 5, "_", "_", 7, 6, 1, "_"],
  ["_", "_", "_", 6, "_", 9, 2, "_", 7]
];

function validInRow(value, puzzle, rowIndex) {
  return puzzle[rowIndex].filter(number => number === value).length === 0;
}

function validInColumn(value, puzzle, columnIndex) {
  let targetColumn = [];

  for (let i = 0; i < puzzle.length; i++) {
    targetColumn.push(puzzle[i][columnIndex]);
  }
  return targetColumn.filter(number => number === value).length === 0;
}

function validInSquare(value, puzzle, positionX, positionY) {
  const rowsToTest = squareMap[positionY];
  const columnsToTest = squareMap[positionX];

  for (let i = 0; i < rowsToTest.length; i++) {
    for (let j = 0; j < columnsToTest.length; j++) {
      if (puzzle[rowsToTest[i]][columnsToTest[j]] === value) {
        return false;
      }
    }
  }

  return true;
}

function checkIfValid(value, positionX, positionY) {
  console.log("checking if valid");

  if (validInRow(value, puzzle, positionY)) {
    if (validInColumn(value, puzzle, positionX)) {
      if (validInSquare(value, puzzle, positionX, positionY)) {
        return true;
      }
    }
  }

  return false;
}

function isComplete() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (puzzle[i][j] === "_") {
        return false;
      }
    }
  }

  return true;
}

function solvePuzzle(setSolution) {
  console.log("solving puzzle");

  if (isComplete()) {
    setSolution(_.cloneDeep(puzzle));
    return;
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (puzzle[i][j] === "_") {
        for (let k = 1; k < 10; k++) {
          if (checkIfValid(k, i, j)) {
            puzzle[i][j] = k;
            solvePuzzle(setSolution);
            puzzle[i][j] = "_";
          }
        }
      }
    }
  }
}

export function SudokuSolver() {
  const [solution, setSolution] = useState(puzzle);

  const displayPuzzle = puzzle.map((row, rowIndex) => {
    const rows = row.map((column, columnIndex) => {
      return (
        <div key={columnIndex} className="number">
          {column}
        </div>
      );
    });
    return (
      <div key={rowIndex} className="row">
        {rows}
      </div>
    );
  });

  const displaySolution = solution.map((row, rowIndex) => {
    const rows = row.map((column, columnIndex) => {
      return (
        <div key={columnIndex} className="number">
          {column}
        </div>
      );
    });
    return (
      <div key={rowIndex} className="row">
        {rows}
      </div>
    );
  });

  return (
    <div className="App">
      <button onClick={() => solvePuzzle(setSolution)}>Solve</button>
      <div className="puzzle-wrapper">
        <div className="original">{displayPuzzle}</div>
        <div className="solution">{displaySolution}</div>
      </div>
    </div>
  );
}
