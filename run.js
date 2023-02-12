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
  robot.moveMouse(x, y)
  keyAndClick(key, isUp)
  index++
}, 10)

const keyAndClick = (key, isUp) => {
  const hasClicked = click(key, isUp)
  if (hasClicked === null) tap(key, isUp)
}

const click = (key, isUp) => {
  const upOrDown = isUp ? 'up' : 'down'
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

  robot.mouseToggle(upOrDown, keyToTrigger)
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
  keylogger.stop()
  process.exit()
})
