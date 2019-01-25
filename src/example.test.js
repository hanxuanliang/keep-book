test('test equal', () => {
  expect(2 + 2).toBe(4)
})

test('test not equal', () => {
  expect(2 + 2).not.toBe(5)
})

test('test true or false', () => {
  expect(1).toBeTruthy()
  expect(0).toBeFalsy()
})

test('test number', () => {
  expect(4).toBeGreaterThan(3)
  expect(4).toBeLessThan(5)
})

test('test object', () => {
  expect({ name: 'wiki', age: 30 }).toEqual({ name: 'wiki', age: 30 })
})
