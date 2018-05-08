const retriever = new (require('../util/Retriever'))()
const tools = new (require('../util/Tools'))()

test('The retriever is ready.', () => {
  expect(retriever).not.toBeNull()
})

test('The getIcon(iconId) function returns an image Buffer.', () => {
  let random = tools.getRandom(0, 195)
  return retriever.getIcon(random).then(icon => {
    expect(icon).toBeInstanceOf(Buffer)
  })
})

test('The getBackground(0) function returns an image Buffer.', () => {
  return retriever.getBackground(0).then(background => {
    expect(background).toBeInstanceOf(Buffer)
  })
})

test('The getBackground(1) function returns an image Buffer.', () => {
  return retriever.getBackground(1).then(background => {
    expect(background).toBeInstanceOf(Buffer)
  })
})

test('The getFlag() function returns an image Buffer.', () => {
  return retriever.getFlag().then(flag => {
    expect(flag).toBeInstanceOf(Buffer)
  })
})

test('The getBorder(borderId) function returns an image Buffer.', () => {
  let random = tools.getRandom(0, 7)

  return retriever.getBorder(random).then(border => {
    expect(border).toBeInstanceOf(Buffer)
  })
})

test('The getHooks() function returns an image Buffer.', () => {
  return retriever.getHooks().then(hooks => {
    expect(hooks).toBeInstanceOf(Buffer)
  })
})
