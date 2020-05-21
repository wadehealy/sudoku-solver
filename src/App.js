import React from "react";

import _ from "lodash";

import "./styles.scss";
export class App extends React.Component {
  constructor(props) {
    super(props);

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

    let startingPuzzle = [
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

    // let startingPuzzle = [
    //   [0, 0, 0, 0, 0, 0, 3, 0, 0],
    //   [8, 2, 0, 0, 7, 0, 0, 6, 1],
    //   [3, 6, 0, 1, 0, 5, 0, 0, 0],
    //   [0, 5, 0, 4, 0, 6, 0, 3, 0],
    //   [0, 9, 3, 2, 1, 8, 7, 0, 5],
    //   [4, 8, 2, 0, 0, 3, 0, 0, 0],
    //   [2, 7, 0, 0, 3, 1, 9, 0, 0],
    //   [0, 0, 5, 0, 0, 7, 6, 1, 0],
    //   [0, 0, 0, 6, 0, 9, 2, 0, 7]
    // ];

    this.state = {
      initialPuzzle: startingPuzzle,
      solution: startingPuzzle,
      squareMap: squareMap
    };
  }

  updateSolution = (value, positionX, positionY) => {
    let updatedSolution = _.cloneDeep(this.state.solution);
    updatedSolution[positionX][positionY] = value;

    return updatedSolution;
  };

  validInRow(value, puzzle, rowIndex) {
    return puzzle[rowIndex].filter(number => number === value).length === 0;
  }

  validInColumn(value, puzzle, columnIndex) {
    let targetColumn = [];

    for (let i = 0; i < puzzle.length; i++) {
      targetColumn.push(puzzle[i][columnIndex]);
    }
    return targetColumn.filter(number => number === value).length === 0;
  }

  validInSquare = (value, puzzle, positionX, positionY) => {
    const rowsToTest = this.state.squareMap[positionY];
    const columnsToTest = this.state.squareMap[positionX];

    for (let i = 0; i < rowsToTest.length; i++) {
      for (let j = 0; j < columnsToTest.length; j++) {
        if (puzzle[rowsToTest[i]][columnsToTest[j]] === value) {
          return false;
        }
      }
    }

    return true;
  };

  checkIfValid = (value, positionX, positionY) => {
    console.log("checking if valid");
    const { solution } = this.state;

    if (this.validInRow(value, solution, positionY)) {
      if (this.validInColumn(value, solution, positionX)) {
        if (this.validInSquare(value, solution, positionX, positionY)) {
          return true;
        }
      }
    }

    return false;
  };

  isComplete = () => {
    const { solution } = this.state;

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (solution[i][j] === "_") {
          return false;
        }
      }
    }

    return true;
  };

  solvePuzzle = () => {
    console.log("solving puzzle");
    const { solution } = this.state;

    if (this.isComplete()) return;

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (solution[i][j] === "_") {
          for (let k = 1; k < 10; k++) {
            if (this.checkIfValid(k, i, j)) {
              const updatedSolution = this.updateSolution(k, i, j);
              this.setState(
                {
                  solution: updatedSolution
                },
                () => {
                  this.solvePuzzle();
                }
              );
            }
          }
        }
      }
    }
  };

  render() {
    const puzzle = this.state.solution.map((row, rowIndex) => {
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
        <div onClick={() => this.solvePuzzle()}>Solve</div>
        {puzzle}
      </div>
    );
  }
}
