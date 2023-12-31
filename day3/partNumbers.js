const fs = require('fs')

const input1 = 'input1.txt'
const input2 = 'input2.txt'

const input1Array = fs.readFileSync(input1, 'utf8', err => console.error(err)).split('\n')
const input2Array = fs.readFileSync(input2, 'utf8', err => console.error(err)).split('\n')

const partNumbers = (arr) => {
  const symbolRegex = /[^\w\s.]/
  let sum = 0

  for (let row = 0; row < arr[0].length; row++) {
    for (let col = 0; col < arr.length; col++) {
      // check for a symbol
      const symbol = arr[row][col].match(symbolRegex)

      // if a symbol is found, check for nearby numbers
      if (symbol) {
        const results = checkNearby(arr, row, col)
        results.forEach(result => sum += result)
      }
    }
  }

  return sum
}

const checkNearby = (arr, row, col) => {
  let results = []
  const boundaries = {
    top: [row - 1, col],
    bottom: [row + 1, col],
    left: [row, col - 1],
    right: [row, col + 1],
    topLeft: [row - 1, col - 1],
    topRight: [row - 1, col + 1],
    bottomLeft: [row + 1, col - 1],
    bottomRight: [row + 1, col + 1]
  }

  for (const boundary in boundaries) {
    const [row, col] = boundaries[boundary]
    const char = arr[row][col]

    if (char.match(/[0-9]/)) {
      let num = char
      let currCol = col - 1

      while (currCol >= 0) {
        if (arr[row][currCol].match(/[0-9]/)) {
          num = arr[row][currCol] + num
          currCol--
        } else {
          break
        }
      }

      currCol = col + 1

      while (currCol <= arr[0].length - 1) {
        if (arr[row][currCol].match(/[0-9]/)) {
          num += arr[row][currCol]
          currCol++
        } else {
          break
        }
      }

      if (!results.includes(parseInt(num))) results.push(parseInt(num))
    }
  }

  return results
}

// console.log(partNumbers(input1Array))
console.log(partNumbers(input2Array))