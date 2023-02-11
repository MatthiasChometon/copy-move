const activities = require('./data.json')
const robot = require("robotjs")

let index = 0

const intervalId = setInterval(() => {
  if (index >= activities.length) {
    clearInterval(intervalId)
    return
  }

  const { x, y } = activities[index]
  console.log({ x, y })
  robot.moveMouse(x, y)
  index++
}, 50)
