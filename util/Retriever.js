const fs = require('fs-extra')
const path = require('path')
const { Image } = require('canvas')

const imgPath = path.join(__dirname, '../img')

// Used for JSDocs
const { Images } = require('./TypeDefs')

/**
 * A helper class for retrieving images that are used to build a WoW guild
 * emblem.
 */
class Retriever {
  /**
   * Retrieves an icon image from storage based on the provided icon id. The
   * image retrieved will be img/icons/emblem_iconId.png.
   *
   * @param {number} iconId id of the icon to retrieve
   *
   * @returns {Promise<Buffer>}
   */
  getIcon (iconId) {
    const iconPath = path.join(imgPath, `icons/emblem_${iconId}.png`)
    return fs.readFile(iconPath)
  }

  /**
   * Retrieves the background image for a guild emblem based on the provided
   * faction id.
   *
   * 0 = Alliance
   *
   * 1 = Horde
   * @param {number} factionId
   *
   * @returns {Promise<Buffer>}
   */
  getBackground (factionId) {
    if (factionId === 0) {
      return fs.readFile(path.join(imgPath, 'ring-alliance.png'))
    } else if (factionId === 1) {
      return fs.readFile(path.join(imgPath, 'ring-horde.png'))
    }
  }

  /**
   * Retrieves the flag background image and returns it through a promise.
   *
   * @returns {Promise<Buffer>}
   */
  getFlag () {
    return fs.readFile(path.join(imgPath, 'bg_00.png'))
  }

  /**
   * Retrieves the border image for a guild emblem based on the provided border
   * id. The returned image will be img/borders/border_borderId.png.
   *
   * @param {number} borderId
   *
   * @returns {Promise<Buffer>}
   */
  getBorder (borderId) {
    const borderPath = path.join(imgPath, `borders/border_0${borderId}.png`)
    return fs.readFile(borderPath)
  }

  /**
   * Retrieves the hooks image for building a guild emblem and returns it
   * through a promise.
   *
   * @returns {Promise<Buffer>}
   */
  getHooks () {
    return fs.readFile(path.join(imgPath, 'hooks.png'))
  }

  /**
   * Retrieves the base images required to build a guild emblem with the given
   * values. Accepts the icon, border, and background/faction id as part of the
   * input parameter. See example for more info.
   *
   * @example
   * const images = await getBaseImages({icon: 12, border: 2, background: 1})
   *
   * console.log('icon buffer = ' + images.icon)
   *
   * @param {object} values
   * @param {number} values.icon
   * @param {number} values.border
   * @param {number} values.background
   *
   * @returns {Promise<Images[]>}
   */
  async getBaseImages (values) {
    const icon = new Image()
    icon.src = await this.getIcon(values.icon)

    const hooks = new Image()
    hooks.src = await this.getHooks()

    const border = new Image()
    border.src = await this.getBorder(values.border)

    const flag = new Image()
    flag.src = await this.getFlag()

    const background = new Image()
    background.src = await this.getBackground(values.background)

    return Promise.resolve({
      icon: icon,
      hooks: hooks,
      border: border,
      flag: flag,
      background: background
    })
  }
}

module.exports = Retriever
