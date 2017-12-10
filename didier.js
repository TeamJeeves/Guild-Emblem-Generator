
const Canvas = require('canvas')
const fs = require('fs-extra')

const modifier = new (require('./util/Modifier'))()
const retriever = new (require('./util/Retriever'))()

const testEmblem = {
  'icon': 97,
  'iconColor': 'ff101517',
  'iconColorId': 15,
  'border': 0,
  'borderColor': 'ff0f1415',
  'borderColorId': 15,
  'backgroundColor': 'ffffffff',
  'backgroundColorId': 49
}

const coords = require('./util/coords')

retriever.getBaseImages({
  icon: testEmblem.icon,
  border: testEmblem.border,
  background: 1
}).then(images => {
  modifier.updateBaseImageColors(images, testEmblem).then(updated => {
    console.log(updated)
    const finalCanvas = new Canvas(250, 250)
    const ctx = finalCanvas.getContext('2d')

    ctx.drawImage(updated.background, coords.bg.x, coords.bg.y, images.background.width, images.background.height)
    ctx.drawImage(updated.flag, coords.flagCoords.x, coords.flagCoords.y, images.flag.width, images.flag.height)
    ctx.drawImage(updated.hooks, coords.hookCoords.x, coords.hookCoords.y, images.hooks.width, images.hooks.height)
    ctx.drawImage(updated.border, coords.borderCoords.x, coords.borderCoords.y, images.border.width, images.border.height)
    ctx.drawImage(updated.icon, coords.iconCoords.x, coords.iconCoords.y, images.icon.width, images.icon.height)

    fs.writeFileSync('Temp2.png', finalCanvas.toBuffer())
  })
})
