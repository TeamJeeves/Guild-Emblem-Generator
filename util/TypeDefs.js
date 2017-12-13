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
module.exports.Emblem = {}

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
module.exports.Guild = {}

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
module.exports.CleanEmblem = {}

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
module.exports.CleanGuild = {}

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
module.exports.Images = {}

/**
 * @typedef {Object} RGBs
 * @prop {number} red
 * @prop {number} blue
 * @prop {number} green
 */
/**
 * @type {RGBs}
 */
module.exports.RGBs = {}

/**
 * @typedef {Object} Colors
 * @prop {number} colors.iconColor
 * @prop {number} colors.borderColor
 * @prop {number} colors.backgroundColor
 */
/**
 * @type {Colors}
 */
module.exports.Colors = {}
