const cManager = new (require('../util/CacheManager'))()
const fs = require('fs-extra')
const path = require('path')

test('The isImageCached(filename) function properly tests for cached images.', () => {
  let folderPath = path.join(__dirname, '..', 'cache')
  if (fs.existsSync(folderPath)) {
    let files = fs.readdirSync(folderPath)
    expect.assertions(files.length)

    for (let x = 0; x < files.length; x++) {
      return cManager.isImageCached(files[x]).then(cached => {
        expect(cached).toBe(true)
      })      
    }
  } else {
    return Promise.resolve(true)
  }
})

test('The generateFilename(emblem, factionId) function generates a proper filename.', () => {
  let emblem = {
    'icon': 97,
    'iconColor': 'ff101517',
    'iconColorId': 15,
    'border': 0,
    'borderColor': 'ff0f1415',
    'borderColorId': 15,
    'backgroundColor': 'fffc6891',
    'backgroundColorId': 49
  }

  expect.assertions(2)
  expect(cManager.generateFileName(emblem, 0)).toEqual('0.fffc6891.0.ff0f1415.97.ff101517.png')
  expect(cManager.generateFileName(emblem, 1)).toEqual('1.fffc6891.0.ff0f1415.97.ff101517.png')
})
