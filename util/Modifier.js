const { Canvas, Image } = require('canvas')

// Used for JSDocs
const {
  Emblem, Guild,
  CleanEmblem, CleanGuild,
  Colors, Images, RGBs
} = require('./TypeDefs')

/**
 * A helper class for modifying the base images used to build a WoW guild
 * emblem.
 */
class Modifer {
  /**
   * Tints the given image with the provided color values and returns a canvas
   * object with the new image drawn within.
   *
   * @param {Image} img
   * @param {number} red
   * @param {number} green
   * @param {number} blue
   */
  async changeImageColor (img, red, green, blue) {
    const rgbks = await this.generateRGBKs(img)

    return this.generateTintImage(img, rgbks, red, green, blue)
  }

  /**
   * Updates the color of the provided images using the provided colors object.
   * The images are typically obtained through the getBaseImages method in the
   * Retriever class, and the colors can be retrieved from the Battle.net API.
   *
   * After the images have been updated, they're returned through a Promise.
   *
   * @param {Images} images
   * @param {object} colors
   * @param {number} colors.iconColor
   * @param {number} colors.borderColor
   * @param {number} colors.backgroundColor
   *
   * @returns {Promise<Images[]>}
   */
  async updateBaseImageColors (images, colors) {
    for (let key in images) {
      const colorKey = key + 'Color'
      if (colors[colorKey] !== undefined) {
        const rgb = await this.hexToRGB(colors[colorKey])
        images[key] = await this.changeImageColor(images[key], rgb.red, rgb.green, rgb.blue)
      }
    }

    return Promise.resolve(images)
  }

  /**
   * Converts the given hex string to an RGB value and returns it as an object
   * via a Promise.
   *
   * @param {string} hex
   *
   * @returns {Promise<RGBs>}
   */
  hexToRGB (hex) {
    const r = parseInt(hex.slice(2, 4), 16)
    const g = parseInt(hex.slice(4, 6), 16)
    const b = parseInt(hex.slice(6, 8), 16)

    return Promise.resolve({
      red: r,
      green: g,
      blue: b
    })
  }

  /**
   * Cleans the given emblem object, that is typically obtained via the
   * Battle.net API, of the unused properties and returns an object that only
   * contains the necessary values via a Promise.
   *
   * @param {Emblem} emblem
   *
   * @returns {Promise<CleanEmblem>}
   */
  cleanEmblemObject (emblem) {
    return Promise.resolve({
      icon: emblem.icon,
      iconColor: emblem.iconColor,
      border: emblem.border,
      borderColor: emblem.borderColor,
      flagColor: emblem.backgroundColor
    })
  }

  /**
   * Cleans the given guild object, that is typically obtained via the
   * Battle.net API, of the unused properties and returns an object that only
   * contains the necessary values via a Promise.
   *
   * @param {Guild} guild
   *
   * @returns {Promise<CleanGuild>}
   */
  cleanGuildObject (guild) {
    return Promise.resolve({
      faction: guild.side,
      icon: guild.emblem.icon,
      iconColor: guild.emblem.iconColor,
      border: guild.emblem.border,
      borderColor: guild.emblem.borderColor,
      backgroundColor: guild.emblem.backgroundColor
    })
  }

  /**
   * Gets the emblem from the given guild object, cleans it, and returns it via
   * a Promise. This is particularly useful when using the saveEmblemToFile
   * method.
   *
   * @param {Guild} guild
   */
  getEmblemFromGuildObject (guild) {
    return this.cleanEmblemObject(guild.emblem)
  }

  /**
   * Generates the RGB values for tinting an image. This method was largely
   * written by Joe of https://playmycode.com.
   *
   * @param {*} img
   *
   * @see http://www.playmycode.com/blog/2011/06/realtime-image-tinting-on-html5-canvas/
   */
  generateRGBKs (img) {
    let w = img.width
    let h = img.height
    let rgbks = []

    const finalCanvas = new Canvas()
    finalCanvas.width = w
    finalCanvas.height = h

    let finalCtx = finalCanvas.getContext('2d')
    finalCtx.drawImage(img, 0, 0)

    const pixels = finalCtx.getImageData(0, 0, w, h).data

    for (let rgbI = 0; rgbI < 4; rgbI++) {
      const canvas = new Canvas()
      canvas.width = w
      canvas.height = h

      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      const to = ctx.getImageData(0, 0, w, h)
      let toData = to.data

      for (let i = 0, len = pixels.length; i < len; i += 4) {
        toData[i] = (rgbI === 0) ? pixels[i] : 0
        toData[i + 1] = (rgbI === 1) ? pixels[i + 1] : 0
        toData[i + 2] = (rgbI === 2) ? pixels[i + 2] : 0
        toData[i + 3] = pixels[i + 3]
      }

      ctx.putImageData(to, 0, 0)

      // image is _slightly_ faster then canvas for this, so convert
      const imgComp = new Image()
      imgComp.src = canvas.toDataURL()

      rgbks.push(imgComp)
    }

    return Promise.resolve(rgbks)
  }

  /**
   * Generates the tinted image using the provided colors. This method was largely
   * written by Joe of https://playmycode.com.
   *
   * @param {*} img
   * @param {number[]} rgbks
   * @param {number} red
   * @param {number} green
   * @param {number} blue
   *
   * @see http://www.playmycode.com/blog/2011/06/realtime-image-tinting-on-html5-canvas/
   */
  generateTintImage (img, rgbks, red, green, blue) {
    const finalImg = new Image()
    const buff = new Canvas()
    buff.width = img.width
    buff.height = img.height

    const ctx = buff.getContext('2d')

    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'copy'
    ctx.drawImage(rgbks[3], 0, 0)

    ctx.globalCompositeOperation = 'lighter'
    if (red > 0) {
      ctx.globalAlpha = red / 255.0
      ctx.drawImage(rgbks[0], 0, 0)
    }
    if (green > 0) {
      ctx.globalAlpha = green / 255.0
      ctx.drawImage(rgbks[1], 0, 0)
    }
    if (blue > 0) {
      ctx.globalAlpha = blue / 255.0
      ctx.drawImage(rgbks[2], 0, 0)
    }

    finalImg.src = buff.toBuffer()

    return Promise.resolve(finalImg)
  }
}

module.exports = Modifer
