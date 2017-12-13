const emblemGenerator = require('guild-emblem-generator')
const modifier = new emblemGenerator.Modifier()

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

modifier.getEmblemFromGuildObject(testGuild).then(cleanEmblem => {
  emblemGenerator.saveEmblemToFile(cleanEmblem, testGuild.side, `${testGuild.name}.png`).then(() => {
    console.log(`File saved!`)
  }).catch(err => console.error(err))
})
