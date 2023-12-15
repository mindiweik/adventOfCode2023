const fs = require('fs')

const input1 = fs.readFileSync('./input1.txt', 'utf8').split('\n')
const input2 = fs.readFileSync('./input2.txt', 'utf8').split('\n')

const scratchCards = (arr) => {
  let sum = 0

  for (const line of arr) {
    let points = 0, winners = [], scratch = [], pipeFound = false
    let splitLine = line.split(' ')

    // parse the cards
    splitLine.forEach(el => {
      if (el === '' || el === 'Card' || el.includes(':')) return
      if (el === '|') {
        pipeFound = true
      } else if (!pipeFound) {
        winners.push(parseInt(el))
      } else {
        scratch.push((parseInt(el)))
      }
    })

    // count up the points
    scratch.forEach(num => {
      if (winners.includes(num)) {
        points = points === 0 ? 1 : points * 2
      }
    })

    sum += points
  }

  return sum
}

// console.log(scratchCards(input1))
console.log(scratchCards(input2))
