const fs = require('fs-extra')
const path = require('path')

// Used by JSDocs
const { Emblem } = require('./TypeDefs')

class CacheManager {
  /**
   * Default constructor for the CacheManager class. Accepts a path as a string
   * to determine the location of the cache. If none is provided, it defaults to
   * a cache folder in the root directory of the project.
   *
   * @param {string} cachePath Where the cache should be stored
   */
  constructor (cachePath = path.join(__dirname, '../cache')) {
    this.cachePath = cachePath
  }

  /**
   * Determines if the provided file has been cached yet or not.
   *
   * @param {string} filename Name of the image to detect
   *
   * @returns {Promise<boolean>} exists
   */
  isImageCached (filename) {
    return new Promise((resolve, reject) => {
      fs.exists(this.cachePath + '\\' + filename, exists => resolve(exists))
    })
  }

  /**
   * Stores the provided image using the provided filename in the default cache
   * directory. The options parameter is the options object that is accepted by
   * fs-extra in their outputFile method. For more info on the options param,
   * check the link in the see field.
   *
   * @param {string} filename Name of the image to cache
   * @param {Buffer} buffer Contains the content to store
   * @param {any} options options that fs-extra can accept when writing a file
   *
   * @see http://bit.ly/2KIFiBq
   */
  storeImage (filename, buffer, options) {
    const finalPath = path.join(this.cachePath, filename)

    return fs.outputFile(finalPath, buffer, options)
  }

  /**
   * Generates a filename, based on the provided emblem, that is used to cache
   * it in case a similar image is requested. The filename turns out something
   * like: 1.fffc6891.0.ff0f1415.97.ff101517.png
   *
   * It's built like so:
   * `${factionId}.${emblem.backgroundColor}
   *  .${emblem.border}.${emblem.borderColor}
   *  .${emblem.icon}.${emblem.iconColor}.png`
   *
   * @param {Emblem} emblem
   * @param {*} factionId
   */
  generateFileName (emblem, factionId) {
    return `${factionId}.${emblem.backgroundColor}.${emblem.border}.${emblem.borderColor}.${emblem.icon}.${emblem.iconColor}.png`
  }
}

module.exports = CacheManager
