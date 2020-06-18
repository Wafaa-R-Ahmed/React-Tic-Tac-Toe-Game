import React from 'react';
import './Board.css';
import Square from '../Square/Square.js'

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      stepNumber: 0,
      xIsNext: true,
      status: null,
      winner: null
    };
  }

  clickHandle(i) {
    if (this.state.squares[i] === null && this.state.winner === null) {
      let _state = this.state;

      _state.squares[i] = _state.xIsNext ? "X" : "O";
      _state.xIsNext = !_state.xIsNext;
      _state.stepNumber++;
      _state.winner = this.checkWinner(_state.squares);

      if (_state.winner) {
        _state.status = "The winner is " + _state.winner + "!";
      }
      else if (_state.stepNumber > 8)
        _state.status = " It's a tie!";
      else
        _state.status = (_state.xIsNext ? "X's" : "O's") + " turn :)";

      this.setState(_state);
    }
  }

  checkWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  reset() {
    this.setState({
      squares: Array(9).fill(null),
      stepNumber: 0,
      xIsNext: true,
      status: null,
      winner: null
    });
  }

  populateSquare(i) {
    return (
      <Square
        key={"square " + i}
        value={this.state.squares[i]}
        onClick={() => this.clickHandle(i)}
      />
    );
  }

  populateSquares(n) {
    let squares = [];
    for (let i = n; i < n + 3; i++) {
      squares.push(this.populateSquare(i));
    }
    return squares;
  }

  render() {
    return (
      <div className="game">
        <div className="board">
          <div className="board-row">{this.populateSquares(0)}</div>
          <div className="board-row">{this.populateSquares(3)}</div>
          <div className="board-row">{this.populateSquares(6)}</div>
        </div>
        <div className="status">
          <h1>{this.state.status}</h1>
          {this.state.winner !== null || this.state.stepNumber > 8 ? 
          (<button onClick={()=>{this.reset()}}>Reset</button>) : null}
        </div>
      </div>);
  }
}

