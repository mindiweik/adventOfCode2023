// Possible configuration
// 12 red cubes
// 13 green cubes
// 14 blue cubes

const fs = require('fs')

const input1 = 'input1.txt'
const input2 = 'input2.txt'
const red = 'red'
const blue = 'blue'
const green = 'green'

const input1Array = fs.readFileSync(input1, 'utf8', err => console.error(err)).split('\n')
const input2Array = fs.readFileSync(input2, 'utf8', err => console.error(err)).split('\n')

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
    let possible = true
    const game = games[gameNum]

    for (const roundNum in game) {
      const round = game[roundNum]

      // check if there are enough cubes for each color
      if (round[red] > 12) possible = false
      if (round[green] > 13) possible = false
      if (round[blue] > 14) possible = false

      if (!possible) break
    }

    if (possible) sum += parseInt(gameNum)
  }

  return sum
}

// console.log(possibleGames(input1Array))
console.log(possibleGames(input2Array))