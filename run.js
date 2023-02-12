const keylogger = require("keylogger.js")
const activities = require('./activities.json')
const transformationKeys = require('./transformationKeys.json')
const robot = require("robotjs")

let index = 0
robot.setKeyboardDelay(1)
console.log('début du script')

const intervalId = setInterval(() => {
  if (index >= activities.length) {
    console.log('fin du script')
    clearInterval(intervalId)
    keylogger.stop()
    process.exit()
  }

  const { x, y, key, isUp } = activities[index]
  keyAndClick(key, isUp)
  robot.moveMouse(x, y)
  index++
}, 10)

const keyAndClick = (key, isUp) => {
  if (key === undefined) return
  const hasClicked = click(key, isUp)
  if (hasClicked === null) tap(key, isUp)
}

const click = (key, isUp) => {
  let keyToTrigger = null

  switch (key) {
    case 'Left Click':
      keyToTrigger = 'left'
      break
    case 'Right Click':
      keyToTrigger = 'right'
      break
    default:
      return null
  }

  if (!isUp) return
  robot.mouseClick(keyToTrigger)
}

const tap = (key, isUp) => {
  if (key === null) return
  try {
    const keyFounded = transformationKeys[key] === undefined ? key : transformationKeys[key]
    const upOrDown = isUp ? 'up' : 'down'
    robot.keyToggle(keyFounded, upOrDown)
  } catch (error) {
    console.log(error)
    process.exit()
  }
}

keylogger.start((keyPressed) => {
  if (keyPressed !== 'Escape') return
  robot.mouseToggle('up', 'left')
  keylogger.stop()
  process.exit()
})
