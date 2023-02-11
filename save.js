const keylogger = require("keylogger.js")
const robot = require("robotjs")
const fs = require('fs')

const fileName = 'data.json'
const activities = []
let currentKeyboardActivity = {}

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
  activities.push({ ...currentKeyboardActivity, x, y })
  currentKeyboardActivity = {}
}, 50)

keylogger.start((key, isKeyUp, keyCode) => {
  if (key === '*') {
    fs.stat(fileName, (err, stat) => {
      fs.writeFile(fileName, JSON.stringify(activities), (err) => {
        if (err) throw err
        console.log(`Le fichier "${fileName}" a été remplis avec succès.`)
        process.exit()
      })
    })
  }
  currentKeyboardActivity = { key, isKeyUp }
  console.log("keyboard event", key, isKeyUp)
})

keylogger.click((click) => {
  console.log(click)
})
