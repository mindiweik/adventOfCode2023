const fs = require('fs')

const digitRegex = /[0-9]/
// Using a trie to practice a solution from a separate problem
const spelledDigitTrie = {
  'z': {
    'e': {
      'r': {
        'o': 0
      }
    }
  },
  'o': {
    'n': {
      'e': 1
    }
  },
  't': {
    'h': {
      'r': {
        'e': {
          'e': 3
        }
      }
    },
    'w': {
      'o': 2
    }
  },
  'f': {
    'i': {
      'v': {
        'e': 5
      }
    },
    'o': {
      'u': {
        'r': 4
      }
    }
  },
  's': {
    'e': {
      'v': {
        'e': {
          'n': 7
        }
      }
    },
    'i': {
      'x': 6
    }
  },
  'e': {
    'i': {
      'g': {
        'h': {
          't': 8
        }
      }
    }
  },
  'n': {
    'i': {
      'n': {
        'e': 9
      }
    }
  }
}

const calibrate = (textPath) => {
  let textArray = fs.readFileSync(textPath, 'utf8', (err => console.error(err))).split('\n')
  let sum = 0, left, right, current, digits

  while (textArray.length > 0) {
    left = undefined, right = undefined, digits = undefined
    current = textArray[textArray.length - 1]
    
    // find left
    for (let i = 0; i < current.length; i++) {
      if (left) break
      if (current[i].match(digitRegex)) {
        left = current[i]
        break
      } else if (spelledDigitTrie[current[i]]) {
        let spelledDigit = spelledDigitTrie[current[i]]
        let k = i + 1
        while (spelledDigit[current[k]]) {
          spelledDigit = spelledDigit[current[k]]
          k++

          if (spelledDigit[current[k]] && spelledDigit[current[k]].toString().match(digitRegex)) {
            left = spelledDigit[current[k]].toString()
            break
          }
        }
      }
    }

    // find right
    for (let j = current.length - 1; j >= 0; j--) {
      if (right) break
      if (current[j].match(digitRegex)) {
        right = current[j]
        break
      } else if (spelledDigitTrie[current[j]]) {
        let spelledDigit = spelledDigitTrie[current[j]]
        let k = j + 1
        while (spelledDigit[current[k]]) {
          spelledDigit = spelledDigit[current[k]]
          k++

          if (spelledDigit[current[k]] && spelledDigit[current[k]].toString().match(digitRegex)) {
            right = spelledDigit[current[k]].toString()
            break
          }
        }
      }
    }

    sum += parseInt(left + right)
    textArray.pop()
  }

  return sum
}

// console.log(calibrate('text3.txt'))
console.log(calibrate('./text4'))
