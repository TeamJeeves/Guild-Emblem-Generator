class Tools {
  /**
   * Generates a random integer between two numbers, min (inclusive) and max
   * (exclusive).
   * @param {number} min Minimum value (inclusive)
   * @param {number} max Maximum value (exclusive)
   */
  getRandom (min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }
}

module.exports = Tools
