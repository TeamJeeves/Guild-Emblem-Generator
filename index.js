const Canvas = require('canvas')
const fs = require('fs-extra')
const path = require('path')

const modifier = new (require('./util/Modifier'))()
const canvasMan = new (require('./util/CanvasManager'))()
const cManager = new (require('./util/CacheManager'))()

const { Emblem, Guild } = require('./util/TypeDefs')
const coords = require('./util/coords')

module.exports = {
  /**
   * A helper class for retrieving images that are used to build a WoW guild
   * emblem.
   *
   * @class
   */
  Retriever: require('./util/Retriever'),

  /**
   * A helper class for modifying the base images used to build a WoW guild
   * emblem. Also useful for cleaning JSON objects from the Battle.net API to
   * remove the unnecessary properties such as iconColorId, borderColorId, etc.
   *
   * @class
   */
  Modifier: require('./util/Modifier'),

  /**
   * Generates an emblem image using the data in the given emblem object and
   * faction id. The faction id is required in order to know which background
   * image to use as they're based on the guild faction. The emblem object is
   * usually retrieved from the Battle.net API guild endpoints.
   *
   * If you want to generate an emblem using the entire guild object, you can
   * use the getImageFromGuild(guild) method.
   *
   * The resulting emblem is returned as a Buffer through a Promise.
   *
   * @param {Emblem} emblem
   * @param {number} factionId 0 = Alliance; 1 = Horde
   *
   * @returns {Promise<Canvas>}
   */
  getEmblemBuffer: async function (emblem, factionId) {
    const canvas = await this.getEmblemCanvas(emblem, factionId)
    return canvas.toBuffer()
  },

  /**
   * Generates an emblem image using the data in the given emblem object and
   * faction id. The faction id is required in order to know which background
   * image to use as they're based on the guild faction. The emblem object is
   * usually retrieved from the Battle.net API guild endpoints.
   *
   * If you want to generate an emblem using the entire guild object, you can
   * use the getImageFromGuild(guild) method.
   *
   * The resulting emblem is returned as a Buffer through a Promise.
   *
   * @param {Emblem} emblem
   * @param {number} factionId
   *
   * @returns {Promise<Canvas>}
   */
  getEmblemCanvas: async function (emblem, factionId) {
    const cacheFilename = cManager.generateFileName(emblem, factionId)

    if (await cManager.isImageCached(cacheFilename)) {
      let imagePath = path.join(__dirname, 'cache', cacheFilename)
      return canvasMan.getImageCanvas(imagePath)
    } else {
      const cleanObj = await modifier.cleanEmblemObject(emblem)
      const baseImages = await canvasMan.getBaseImages({
        icon: cleanObj.icon,
        border: cleanObj.border,
        background: factionId
      })
      const coloredImgs = await modifier.updateBaseImageColors(baseImages, cleanObj)

      const canvas = new Canvas(250, 250)
      const ctx = canvas.getContext('2d')

      // Draw faction based background image first
      ctx.drawImage(coloredImgs.background, coords.background.x, coords.background.y, coloredImgs.background.width, coloredImgs.background.height)

      // Draw colored flag backdrop
      ctx.drawImage(coloredImgs.flag, coords.flag.x, coords.flag.y, coloredImgs.flag.width, coloredImgs.flag.height)

      // Draw the hooks over the flag
      ctx.drawImage(coloredImgs.hooks, coords.hooks.x, coords.hooks.y, coloredImgs.hooks.width, coloredImgs.hooks.height)

      // Draw the border surrounding the flag
      ctx.drawImage(coloredImgs.border, coords.border.x, coords.border.y, coloredImgs.border.width, coloredImgs.border.height)

      // Draw the icon in the center of the flag
      ctx.drawImage(coloredImgs.icon, coords.icon.x, coords.icon.y, coloredImgs.icon.width, coloredImgs.icon.height)

      // Cache the image for when it
      cManager.storeImage(cacheFilename, canvas.toBuffer())

      return canvas
    }
  },

  /**
   * Generates an emblem image using the data in the given guild object.
   *
   * The resulting emblem is returned as a Buffer through a Promise.
   *
   * @param {Guild} guild
   */
  getEmblemBufferFromGuild: async function (guild) {
    const cleanObj = await modifier.cleanGuildObject(guild)
    return this.getEmblemBuffer(cleanObj, cleanObj.faction)
  },

  /**
   * Generates an emblem image using the guild object.
   *
   * The resulting emblem is returned as a Canvas through a Promise.
   * @param {Guild} guild
   *
   * @returns {Promise<Canvas>}
   */
  getEmblemCanvasFromGuild: async function (guild) {
    const cleanObj = await modifier.cleanGuildObject(guild)
    return this.getEmblemCanvas(cleanObj, cleanObj.faction)
  },

  /**
   * Converts the given emblem object into an image and stores it to disk using
   * the given filename and options. The provided filename should contain the
   * full path to the location you wish to store the image. The accepted options
   * are the same options you would pass to fs.writeFile() using the default fs
   * module.
   *
   * The file is saved using the outputFile method that is part of the fs-extra
   * module. This means that if the parent directory of the path doesn't exist,
   * it will be created.
   *
   * As of version 1.1.0, this method only accepts emblem objects, not the
   * entire guild object with extra information.
   *
   * @param {Emblem} emblem
   * @param {number} factionId
   * @param {string} filename
   * @param {object} options
   *
   * @returns {Promise<void>}
   *
   * @see https://github.com/jprichardson/node-fs-extra/blob/master/docs/outputFile.md
   * @see https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback
   */
  saveEmblemToFile: async function (emblem, factionId, filename, options) {
    const imageBuffer = await this.getEmblemBuffer(emblem, factionId)
    return fs.outputFile(filename, imageBuffer, options)
  }
}
