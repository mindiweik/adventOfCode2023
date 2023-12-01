const fs = require('fs')
const digitRegex = /[0-9]/

const calibrate = (textPath) => {
  let textArray = fs.readFileSync(textPath, 'utf8', (err => console.error(err))).split('\n')
  let sum = 0, left, right, current, digits

  while (textArray.length > 0) {
    left = undefined, right = undefined, digits = undefined
    current = textArray[textArray.length - 1]
    
    // find left
    for (let i = 0; i < current.length; i++) {
      if (current[i].match(digitRegex)) {
        left = current[i]
        break
      }
    }

    // find right
    for (let j = current.length - 1; j >= 0; j--) {
      if (current[j].match(digitRegex)) {
        right = current[j]
        break
      }
    }

    sum += parseInt(left + right)
    textArray.pop()
  }

  return sum
}

// console.log(calibrate('text1.txt'))
console.log(calibrate('./text2'))
