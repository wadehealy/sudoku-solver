import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";
import { SudokuSolver } from "./SudokuSolver";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <SudokuSolver />
  </React.StrictMode>,
  rootElement
);
