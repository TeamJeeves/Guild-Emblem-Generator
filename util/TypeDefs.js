// This file is exclusively for exporting the documentation for various types
// used by the Guild-Emblem-Generator. They're used in the JSDocs for the
// methods used throughout.

/**
 * @typedef {Object} Emblem
 * @prop {number} icon
 * @prop {string} iconColor
 * @prop {number} iconColorId
 * @prop {number} border
 * @prop {string} borderColor
 * @prop {number} borderColorId
 * @prop {string} backgroundColor
 * @prop {number} backgroundColorId
 */
/**
 * @type {Emblem}
 */
module.exports.Emblem = {
  icon: undefined,
  iconColor: undefined,
  iconColorId: undefined,
  border: undefined,
  borderColor: undefined,
  borderColorId: undefined,
  background: undefined,
  backgroundColor: undefined,
  backgroundColorId: undefined
}

/**
 * @typedef {Object} Guild
 * @prop {number} lastModified
 * @prop {string} name
 * @prop {string} realm
 * @prop {string} battlegroup
 * @prop {number} level
 * @prop {number} side
 * @prop {number} achievementPoints
 * @prop {Emblem} emblem
 */
/**
 * @type {Guild}
 */
module.exports.Guild = {
  lastModified: undefined,
  name: undefined,
  realm: undefined,
  battlegroup: undefined,
  level: undefined,
  side: undefined,
  achievementPoints: undefined,
  emblem: undefined
}

/**
 * @typedef {Object} CleanEmblem
 * @prop {number} icon
 * @prop {string} iconColor
 * @prop {number} border
 * @prop {string} borderColor
 * @prop {string} backgroundColor
 */
/**
 * @type {CleanEmblem}
 */
module.exports.CleanEmblem = {
  icon: undefined,
  iconColor: undefined,
  border: undefined,
  borderColor: undefined,
  backgroundColor: undefined
}

/**
 * @typedef {Object} CleanGuild
 * @prop {number} faction
 * @prop {number} icon
 * @prop {string} iconColor
 * @prop {number} border
 * @prop {string} borderColor
 * @prop {string} backgroundColor
 */
/**
 * @type {CleanGuild}
 */
module.exports.CleanGuild = {
  faction: undefined,
  icon: undefined,
  iconColor: undefined,
  border: undefined,
  borderColor: undefined,
  backgroundColor: undefined
}

/**
 * @typedef {Object} Images
 * @prop {*} icon
 * @prop {*} hooks
 * @prop {*} border
 * @prop {*} flag
 * @prop {*} background
 */
/**
 * @type {Images}
 */
module.exports.Images = {
  icon: undefined,
  hooks: undefined,
  border: undefined,
  flag: undefined,
  background: undefined
}

/**
 * @typedef {Object} RGBs
 * @prop {number} red
 * @prop {number} blue
 * @prop {number} green
 */
/**
 * @type {RGBs}
 */
module.exports.RGBs = {
  red: undefined,
  blue: undefined,
  green: undefined
}

/**
 * @typedef {Object} Colors
 * @prop {number} iconColor
 * @prop {number} borderColor
 * @prop {number} backgroundColor
 */
/**
 * @type {Colors}
 */
module.exports.Colors = {
  iconColor: undefined,
  borderColor: undefined,
  backgroundColor: undefined
}
