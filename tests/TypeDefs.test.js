const types = require('../util/TypeDefs')

test('CleanEmblem TypeDefs are set.', () => expect(types.CleanEmblem).toEqual({
  icon: undefined,
  iconColor: undefined,
  border: undefined,
  borderColor: undefined,
  backgroundColor: undefined
}))

test('CleanGuild TypeDefs are set.', () => expect(types.CleanGuild).toEqual({
  faction: undefined,
  icon: undefined,
  iconColor: undefined,
  border: undefined,
  borderColor: undefined,
  backgroundColor: undefined
}))

test('Colors TypeDefs are set.', () => expect(types.Colors).toEqual({
  iconColor: undefined,
  borderColor: undefined,
  backgroundColor: undefined
}))

test('Emblem TypeDefs are set.', () => expect(types.Emblem).toEqual({
  icon: undefined,
  iconColor: undefined,
  iconColorId: undefined,
  border: undefined,
  borderColor: undefined,
  borderColorId: undefined,
  background: undefined,
  backgroundColor: undefined,
  backgroundColorId: undefined
}))

test('Guild TypeDefs are set.', () => expect(types.Guild).toEqual({
  lastModified: undefined,
  name: undefined,
  realm: undefined,
  battlegroup: undefined,
  level: undefined,
  side: undefined,
  achievementPoints: undefined,
  emblem: undefined
}))

test('Images TypeDefs are set.', () => expect(types.Images).toEqual({
  icon: undefined,
  hooks: undefined,
  border: undefined,
  flag: undefined,
  background: undefined
}))

test('RGBs TypeDefs are set.', () => expect(types.RGBs).toEqual({
  red: undefined,
  blue: undefined,
  green: undefined
}))
