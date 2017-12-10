const Canvas = require('canvas')

const modifier = new (require('./util/Modifier'))()
const retriever = new (require('./util/Retriever'))()

const coords = require('./util/coords')

module.exports = {
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
   * @param {object} emblem
   * @param {number} emblem.icon
   * @param {string} emblem.iconColor
   * @param {number} emblem.iconColorId
   * @param {number} emblem.border
   * @param {string} emblem.borderColor
   * @param {number} emblem.borderColorId
   * @param {string} emblem.backgroundColor
   * @param {number} emblem.backgroundColorId
   * @param {number} factionId
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
   * @param {object} emblem
   * @param {number} emblem.icon
   * @param {string} emblem.iconColor
   * @param {number} emblem.iconColorId
   * @param {number} emblem.border
   * @param {string} emblem.borderColor
   * @param {number} emblem.borderColorId
   * @param {string} emblem.backgroundColor
   * @param {number} emblem.backgroundColorId
   * @param {number} factionId
   *
   * @returns {Promise<Canvas>}
   */
  getEmblemCanvas: async function (emblem, factionId) {
    const cleanObj = await modifier.cleanEmblemObject(emblem)
    const baseImages = await retriever.getBaseImages({
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

    return canvas
  },

  /**
   * Generates an emblem image using the data in the given guild object.
   *
   * The resulting emblem is returned as a Buffer through a Promise.
   *
   * @param {object} guild
   * @param {number} guild.lastModified
   * @param {string} guild.name
   * @param {string} guild.realm
   * @param {string} guild.battlegroup
   * @param {number} guild.level
   * @param {number} guild.side
   * @param {number} guild.achievementPoints
   * @param {object} guild.emblem
   */
  getEmblemBufferFromGuild: async function (guild) {
    const cleanObj = await modifier.cleanGuildObject(guild)
    return module.exports.getEmblemBuffer(cleanObj, cleanObj.faction)
  },

  /**
   * Generates an emblem image using the guild object.
   *
   * The resulting emblem is returned as a Canvas through a Promise.
   * @param {object} guild
   * @param {number} guild.lastModified
   * @param {string} guild.name
   * @param {string} guild.realm
   * @param {string} guild.battlegroup
   * @param {number} guild.level
   * @param {number} guild.side
   * @param {number} guild.achievementPoints
   * @param {object} guild.emblem
   *
   * @returns {Promise<Canvas>}
   */
  getEmblemCanvasFromGuild: async function (guild) {
    const cleanObj = await modifier.cleanGuildObject(guild)
    return module.exports.getEmblemCanvas(cleanObj, cleanObj.faction)
  }
}
