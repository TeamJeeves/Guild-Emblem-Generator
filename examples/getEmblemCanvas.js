const EmblemGenerator = require('guild-emblem-generator')

const testEmblem = {
  'icon': 97,
  'iconColor': 'ff2c3acc',
  'iconColorId': 15,
  'border': 0,
  'borderColor': 'ff0f1415',
  'borderColorId': 15,
  'backgroundColor': 'ffffffff',
  'backgroundColorId': 49
}

EmblemGenerator.getEmblemCanvas(testEmblem, 1).then(canvas => {
  console.log(`The image height is ${canvas.height}.`)
  console.log(`The image width is ${canvas.width}.`)
}).catch(err => console.error(err))
