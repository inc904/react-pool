import { useState } from 'react'

import { people } from './data.js'
import { getImageUrl } from './utils.js'

import TodoApp from './todo.jsx'

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  )
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return
    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? 'X' : '●'
    onPlay(nextSquares)
  }

  const winner = calculateWinner(squares)
  let status = winner ? `Winner is ${winner}` : `Next player is ${xIsNext ? 'X' : '●'}`
  const squaresItems = squares.map((square, index) => <Square key={index} value={square} onSquareClick={() => handleClick(index)} />)
  return (
    <>
      <div>{status}</div>
      <div className="board-wrap">{squaresItems}</div>
    </>
  )
}

export function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
  }

  const moves = history.map((squares, move) => {
    let description = move > 0 ? `Go to move ${move}` : `Go to start`
    return (
      <li key={move}>
        <button
          onClick={() => {
            jumpTo(move)
          }}
        >
          {description}
        </button>
      </li>
    )
  })

  return (
    <div>
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

/*

*/

function getPerson(isChemist) {
  const temp =  people.filter((item) => {
    if (isChemist) {
      return item.profession === 'chemist'
    } else {
      return item.profession !== 'chemist'
    }
  })
  console.log(temp)
  return temp
}
function createList(personData) {
  const listItems = personData.map((person) => (
    <li key={person.id}>
      <img src={getImageUrl(person)} alt={person.name} />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        known for {person.accomplishment}
      </p>
    </li>
  ))
  return <ul>{listItems}</ul>
}
export default function Change() {
  return (
    <>
    <article>
      <h1>chemist</h1>
      {createList(getPerson(true))}
      <h1>Scientists</h1>
      {createList(getPerson(false))}
    </article>
    <TodoApp />
    </>
  )
}
