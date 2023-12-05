// Find the fewest number of cubes that can be used to make a game

const fs = require('fs')

const input1 = 'input1.txt'
const input3 = 'input3.txt'
const red = 'red'
const blue = 'blue'
const green = 'green'

const input1Array = fs.readFileSync(input1, 'utf8', err => console.error(err)).split('\n')
const input3Array = fs.readFileSync(input3, 'utf8', err => console.error(err)).split('\n')

const possibleGames = (arr) => {
  let sum = 0
  let games = {}

  // parse the input data
  arr.forEach(element => {
    const line = element.split(' ')
    line.shift()

    const game = line[0].slice(0, line[0].length - 1)
    games[game] = {}
    const gameObj = games[game]
    let round = 1
    line.shift()

    while (line.length > 0) {
      let amount = line[0]
      let color = line[1]

      if (!gameObj[round]) gameObj[round] = {}

      if (color[color.length - 1] === ';') {
        color = color.slice(0, color.length - 1)
        gameObj[round][color] = amount
        round++
      } else if (color[color.length - 1] === ',') {
        color = color.slice(0, color.length - 1)
        gameObj[round][color] = amount
      } else {
        gameObj[round][color] = amount
      }

      line.shift()
      line.shift()
    }
  })

  // check each game for possibility
  for (const gameNum in games) {
    const game = games[gameNum]
    let redCount = 0, greenCount = 0, blueCount = 0

    for (const roundNum in game) {
      const round = game[roundNum]
      const currRed = parseInt(round[red])
      const currBlue = parseInt(round[blue])
      const currGreen = parseInt(round[green])

      // check for the min number of cubes for each color
      if (currRed > redCount) redCount = currRed
      if (currBlue > blueCount) blueCount = currBlue
      if (currGreen > greenCount) greenCount = currGreen
    }

    const power = redCount * blueCount * greenCount
    sum += power
  }

  return sum
}

// console.log(possibleGames(input1Array))
console.log(possibleGames(input3Array))