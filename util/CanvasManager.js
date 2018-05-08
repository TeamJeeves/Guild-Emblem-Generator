const Canvas = require('canvas')
const Image = Canvas.Image
const retriever = new (require('./Retriever'))()
const fs = require('fs-extra')

// Used by JSDocs
const { Images } = require('./TypeDefs')

/**
 * Used to help keep all Canvas related methods in one class, with the exception
 * of the Modifier class.
 */
class CanvasManager {
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
    icon.src = await retriever.getIcon(values.icon)

    const hooks = new Image()
    hooks.src = await retriever.getHooks()

    const border = new Image()
    border.src = await retriever.getBorder(values.border)

    const flag = new Image()
    flag.src = await retriever.getFlag()

    const background = new Image()
    background.src = await retriever.getBackground(values.background)

    return Promise.resolve({
      icon: icon,
      hooks: hooks,
      border: border,
      flag: flag,
      background: background
    })
  }

  getImageCanvas (filepath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filepath).then(buffer => {
        const canvas = new Canvas(250, 250)
        const image = new Image()
        image.src = buffer
        canvas.drawImage(image)

        resolve(canvas)
      })
    })
  }
}

module.exports = CanvasManager
