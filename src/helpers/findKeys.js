
const findKeys = (obj, keyToFind) => {
  return Object.entries(obj)
  .reduce((acc, [key, value]) => (key === keyToFind)
    ? acc.concat(value)
    : (typeof value === 'object')
    ? acc.concat(findKeys(value, keyToFind))
    : acc
  , [])
}

export default findKeys;