let cells = Array.from(document.getElementsByTagName('TD'))
let playerText = document.getElementById('subtitle')
let resetButton = document.getElementById('resetGame')
let noughtsTurn = true
let spaces = Array(9).fill(null)
let gameIsOver

for (let i = 0; i < cells.length; i++) {
  cells[i].onclick = cellClicked
}

function cellClicked(e) {
  if (!gameIsOver && e.target.innerHTML === '') {
    let clickedCell = e.target

    let symbol = noughtsTurn ? 'O' : 'X'

    clickedCell.innerHTML = symbol

    // Debugging
    spaces[cells.indexOf(clickedCell)] = symbol

    if (checkforWin()) {
      gameIsOver = true
      playerText.innerHTML = symbol + ' WON!'
    } else {
      noughtsTurn = !noughtsTurn

      playerText.innerHTML = noughtsTurn ? "O's Turn" : "X's Turn"
    }
  }
  checkforDraw()
}

// Check for win
function checkforWin() {
  let symbol = noughtsTurn ? 'O' : 'X'

  //HORIZONTAL LINES
  if (
    cells[0].innerHTML == symbol &&
    cells[1].innerHTML == symbol &&
    cells[2].innerHTML == symbol
  ) {
    winningCombi([0, 1, 2])
    gameIsOver = true
    return true
  } else if (
    cells[3].innerHTML == symbol &&
    cells[4].innerHTML == symbol &&
    cells[5].innerHTML == symbol
  ) {
    winningCombo([3, 4, 5])
    gameIsOver = true
    return true
  } else if (
    cells[6].innerHTML == symbol &&
    cells[7].innerHTML == symbol &&
    cells[8].innerHTML == symbol
  ) {
    winningCombo([6, 7, 8])
    gameIsOver = true
    return true
    // VERTICAL LINES
  } else if (
    cells[0].innerHTML == symbol &&
    cells[3].innerHTML == symbol &&
    cells[6].innerHTML == symbol
  ) {
    winningCombo([0, 3, 6])
    gameIsOver = true
    return true
  } else if (
    cells[1].innerHTML == symbol &&
    cells[4].innerHTML == symbol &&
    cells[7].innerHTML == symbol
  ) {
    winningCombo([1, 4, 7])
    gameIsOver = true
    return true
  } else if (
    cells[2].innerHTML == symbol &&
    cells[5].innerHTML == symbol &&
    cells[8].innerHTML == symbol
  ) {
    winningCombo([2, 5, 8])
    gameIsOver = true
    return true
    // DIAGONAL LINES
  } else if (
    cells[0].innerHTML == symbol &&
    cells[4].innerHTML == symbol &&
    cells[8].innerHTML == symbol
  ) {
    winningCombo([0, 4, 8])
    gameIsOver = true
    return true
  } else if (
    cells[2].innerHTML == symbol &&
    cells[4].innerHTML == symbol &&
    cells[6].innerHTML == symbol
  ) {
    winningCombo([2, 4, 6])
    gameIsOver = true
    return true
  }
  return false
}

function winningCombo(combination) {
  combination.forEach((index) => {
    cells[index].style.backgroundColor = 'pink'
  })
}

function checkforDraw() {
  if (spaces.every((cell) => cell !== null) && !gameIsOver) {
    playerText.innerHTML = 'DRAW! Hit Reset Game to try again'
    playerText.style.color = 'red'
    gameIsOver = true
  }
}

resetButton.addEventListener('click', reset)

function reset() {
  gameIsOver = false
  noughtsTurn = true
  playerText.innerHTML = "O's Turn"
  cells.forEach((cell) => {
    cell.innerHTML = ''
    cell.style.backgroundColor = ''
  })
  spaces = Array(9).fill(null)
  playerText.style.color = ''
}
