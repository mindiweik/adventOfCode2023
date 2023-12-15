const fs = require('fs')

const input1 = fs.readFileSync('./input1.txt', 'utf8').split('\n')
const input2 = fs.readFileSync('./input2.txt', 'utf8').split('\n')

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

  // locate the lowest location number for the provided seeds
  let lowestLocation = Infinity

  for (const seed of seedList) {
    let current = seed
    let hasChanged = false
    for (const property of properties) {
      hasChanged = false
      const array = table[property]

      array.forEach(arr => {
        if (hasChanged) return
        if (arr[0] <= current) {
          if (current <= arr[0] + arr[2]) {
            let difference = current - arr[0]
            current = arr[1] + difference
            hasChanged = true
          }
        }
      })

      if (property === properties[properties.length - 1]) {
        if (current < lowestLocation) {
          lowestLocation = current
        }
      }
    }
  }

  return lowestLocation
}

console.log(seed(input2))