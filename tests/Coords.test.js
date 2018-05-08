const coords = require('../util/coords.json')

test('Flag coordinates are properly set.', () => {
  expect(coords.flag.x).toBe(37)
  expect(coords.flag.y).toBe(47)
})

test('Background coordinates are properly set.', () => {
  expect(coords.background.x).toBe(17)
  expect(coords.background.y).toBe(17)
})

test('Hook coordinates are properly set.', () => {
  expect(coords.hooks.x).toBe(37)
  expect(coords.hooks.y).toBe(49)
})

test('Border coordinates are properly set.', () => {
  expect(coords.border.x).toBe(50)
  expect(coords.border.y).toBe(60)
})

test('Icon coordinates are properly set.', () => {
  expect(coords.icon.x).toBe(55)
  expect(coords.icon.y).toBe(75)
})
