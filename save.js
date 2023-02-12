const keylogger = require("keylogger.js")
const robot = require("robotjs")
const fs = require('fs')

const fileName = 'activities.json'
const activities = []
let key = null
let isUp = null

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
  activities.push({ key, x, y, isUp })
  key = null
  isUp = null
}, 10)

keylogger.start((currentKey, currentIsUp) => {
  if (currentKey === 'Escape') {
    fs.writeFile(fileName, JSON.stringify(activities), (err) => {
      console.log(`Le fichier "${fileName}" a été remplis avec succès.`)
      keylogger.stop()
      process.exit()
    })
  }
  key = currentKey
  isUp = currentIsUp
  console.log(`Valeur du clavier et souris : key = ${key}`)
})
