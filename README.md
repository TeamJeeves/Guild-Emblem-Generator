# Guild-Emblem-Generator

The Guild-Emblem-Generator is a tool written in Node.js to convert emblem and
guild objects obtained via the Battle.net API into actual images. You can
convert the object into a buffer or a Canvas.

## Usage

You can use the emblem generator one of 3 ways as of the 1.1.0 release, you can
generate a buffer of the generated image, a canvas object which we generate
using [node-canvas](https://github.com/Automattic/node-canvas), or to save the
generated image to a directory. Here are samples showing how to use them:

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

emblemGenerator.saveEmblemToFile(testEmblem, 1, 'MyTestGuild.png').then(() => {
  console.log('The file has been saved!')
})
```

## SaveEmblemToFile options

The options for the `saveEmblemToFile()` method are the same options available
to the `fs.writeFile()` method that is present in node by default. For more
information, please see the [node.js documenation](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
on the method.