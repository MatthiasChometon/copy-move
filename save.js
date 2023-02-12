const keylogger = require("keylogger.js")
const robot = require("robotjs")
const fs = require('fs')

const fileName = 'activities.json'
const activities = []

let waitingListKeys = []

// Récupération de la position initiale du curseur
let x = robot.getMousePos().x
let y = robot.getMousePos().y

setInterval(() => {
  const mouse = robot.getMousePos()
  // Si la position du curseur a changé
  if (mouse.x !== x || mouse.y !== y) {
    x = mouse.x
    y = mouse.y
    console.log(`Position du curseur : x = ${x} y = ${y}`)
  }

  if (waitingListKeys.length > 0) {
    const { key, isUp } = waitingListKeys[0]
    activities.push({ key, x, y, isUp })
    waitingListKeys.shift()
    waitingListKeys = waitingListKeys ?? []
    return
  }

  activities.push({ x, y })
}, 10)

keylogger.start((key, isUp) => {
  if (key === 'Escape') {
    fs.writeFile(fileName, JSON.stringify(activities), (err) => {
      console.log(`Le fichier "${fileName}" a été remplis avec succès.`)
      keylogger.stop()
      process.exit()
    })
  }
  waitingListKeys.push({ isUp, key })
  console.log(`Valeur du clavier et souris : key = ${key}`)
})
