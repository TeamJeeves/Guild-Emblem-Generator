# Guild-Emblem-Generator

The Guild-Emblem-Generator is a tool written in Node.js to convert emblem and
guild objects obtained via the Battle.net API into actual images. You can
convert the object into a buffer or a Canvas.

## Usage

You can use the emblem generator one of two ways as of the 1.0.0 release, either
obtain the buffer of the generated image, or the canvas object which we generate
using [node-canvas](https://github.com/Automattic/node-canvas). Here are samples
using both ways:

```javascript
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
})

emblemGenerator.getEmblemCanvas(testEmblem, 1).then(canvas => {
  console.log(canvas)
})
```
