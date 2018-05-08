const tools = new (require('../util/Tools'))

test('The getRandom() function gets a random number within the given range.', () => {
  let random = tools.getRandom(0, 100)
  expect(random).toBeGreaterThanOrEqual(0)
  expect(random).toBeLessThan(100)
})