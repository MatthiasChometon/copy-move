const keylogger = require("keylogger.js")
const activities = require('./activities.json')
const transformationKeys = require('./transformationKeys.json')
const robot = require("robotjs")

let index = 0
robot.setKeyboardDelay(0)
console.log('début du script')

const intervalId = setInterval(() => {
  if (index >= activities.length) {
    console.log('fin du script')
    clearInterval(intervalId)
    keylogger.stop()
    process.exit()
  }

  const { x, y, key } = activities[index]
  robot.moveMouse(x, y)
  const hasClicked = click(key)
  if (hasClicked === null) tap(key)
  index++
}, 10)

const click = (key) => {
  switch (key) {
    case 'Left Click':
      robot.mouseClick('left')
      break
    case 'Right Click':
      robot.mouseClick('right')
      break
    default:
      return null
  }
}

const tap = (key) => {
  if (key === null) return
  try {
    const keyFounded = transformationKeys[key]
    if (keyFounded === undefined) robot.keyTap(key)
    if (keyFounded) robot.keyTap(keyFounded)
  } catch (error) {
    console.log({ key })
    console.log(error)
    process.exit()
  }
}

keylogger.start((keyPressed) => {
  if (keyPressed !== 'Escape') return
  keylogger.stop()
  process.exit()
})
