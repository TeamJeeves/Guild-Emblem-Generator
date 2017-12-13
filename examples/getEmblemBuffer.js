const emblemGenerator = require('guild-emblem-generator')
const fs = require('fs')

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

emblemGenerator.getEmblemBuffer(testEmblem, 1).then(buffer => {
  fs.writeFileSync('TestFile.png', buffer)
}).catch(err => console.error(err))
