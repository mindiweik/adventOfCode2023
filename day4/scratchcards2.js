// Part 2 - Worked on as a pair with Calvin
const fs = require('fs')
let data = fs.readFileSync('input3.txt', 'utf8').toString()
let splitInput = data.split(/\r?\n|\r|\n/g)

let cardDict = {}

for (const card of splitInput) {
  let cardData = card.split(': ')[1]
  let cardNum = parseInt(card.split(': ')[0].split(/\s+/)[1])
  let winningNums = cardData.split('|')[0].trim().split(/\s+/)
  let yourNums = cardData.split('|')[1].trim().split(/\s+/)

  cardDict[cardNum] = {
    numberOfWins: 0,
    numberOfCopies: 0
  }

  for (let num of yourNums) {
    if (winningNums.includes(num)) {
      cardDict[cardNum]["numberOfWins"]++
    }
  }
}

let cards = Object.keys(cardDict)
let cardsCount = 0
for (const card of cards) {
  let wins = cardDict[card]["numberOfWins"]
  const tempWins = wins
  let copies = cardDict[card]["numberOfCopies"] + 1
  
  // console.log(`card: ${card} | wins: ${wins} | copies: ${copies}`)
  // console.log(cardDict)
  
  while (copies > 0) {
    let currentCard = parseInt(card) + 1
    while (wins > 0 && currentCard <= cards.length - 1) {
      cardDict[currentCard]["numberOfCopies"]++
  
      currentCard++
      wins--
    }

    wins = tempWins
    copies--
  }  

  cardsCount += cardDict[card]["numberOfCopies"]
  cardsCount++
}


console.log(`cardsCount: ${cardsCount}`)