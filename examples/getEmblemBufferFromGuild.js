const emblemGenerator = require('guild-emblem-generator')
const fs = require('fs')

const testGuild = {
  'lastModified': 1512863169000,
  'name': 'Precognition',
  'realm': 'Balnazzar',
  'battlegroup': 'Ruin',
  'level': 25,
  'side': 1,
  'achievementPoints': 1575,
  'emblem': {
    'icon': 97,
    'iconColor': 'ff101517',
    'iconColorId': 15,
    'border': 0,
    'borderColor': 'ff0f1415',
    'borderColorId': 15,
    'backgroundColor': 'ffffffff',
    'backgroundColorId': 49
  }
}

emblemGenerator.getEmblemBufferFromGuild(testGuild).then(buffer => {
  fs.writeFileSync(`${testGuild.name}.png`, buffer)
}).catch(err => console.error(err))
