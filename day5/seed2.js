const fs = require('fs')

const input1 = fs.readFileSync('./input1.txt', 'utf8').split('\n')
const input3 = fs.readFileSync('./input3.txt', 'utf8').split('\n')

const seed = (arr) => {
  let seedList = []
  let currentDestination, currentSource, rangeLength
  const properties = ['seed', 'soil', 'fertilizer', 'water', 'light', 'temperature', 'humidity']

  let table = {
    seed: [],
    soil: [],
    fertilizer: [],
    water: [],
    light: [],
    temperature: [],
    humidity: [],
  }

  // parse the input
  for (const index of arr) {
    if (index === '') continue

    let splitLine = index.split(' ')
    if (splitLine[0] === 'seeds:') {
      for (const el of splitLine) {
        if (el === 'seeds:' || el === '') continue
        seedList.push(parseInt(el))
      }
    } else if (splitLine[1].includes('map')) {
      const toMap = splitLine[0].split('-')
      currentDestination = toMap[0]
      currentSource = toMap[2]
    } else {
      let destination = parseInt(splitLine[0])
      let source = parseInt(splitLine[1])
      let range = parseInt(splitLine[2])
      
      table[currentDestination].push([source, destination, range])
    }
  }

  // console.log(table)

  // locate the lowest location number for the provided seeds
  let lowestLocation = Infinity

  while (seedList.length > 0) {
    let currentSeed = seedList[0]
    let value = currentSeed
    let seedRange = currentSeed + seedList[1]
    let hasChanged = false

    while (currentSeed < seedRange) {
      // console.log(`currentSeed: ${currentSeed}`)
      value = currentSeed

      for (const property of properties) {
        hasChanged = false
        const array = table[property]

        // console.log(`property: ${property} | array:`, array)
        // console.log(`start value: ${value}`)


        for (let i = 0; i < array.length; i++) {
          if (hasChanged) break
          const subArr = array[i]
          if (subArr[0] <= value) {
            if (value <= subArr[0] + subArr[2]) {
              let difference = value - subArr[0]
              value = subArr[1] + difference
              hasChanged = true
            }
          }
        }

        // console.log(`end value: ${value}`)

        if (property === 'humidity') {
          if (value < lowestLocation) {
            lowestLocation = value
            // console.log(`we're at the end - lowestLocation: ${lowestLocation}`)
          }
        }

      }
      
      currentSeed++
    }

    seedList.shift()
    seedList.shift()
  }

  return lowestLocation
}

console.log(seed(input3))