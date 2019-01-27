export const LIST_VIEW = 'list'
export const CHART_VIEW = 'chart'
export const TYPE_INCOME = 'income'
export const TYPE_OUTCOME = 'outcome'

export const padLeft = (month) => {
  return month < 10 ? '0' + month : month
}

export const range = (size, startAt = 0) => {
  const arr = []
  for(let i = 0; i < size; i++) {
    arr[i] = startAt + i
  }
  return arr
}

export const parseToYearAndMonth = (str) => {
  const date = str ? new Date(str) : new Date()
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1
  }
}

export const isValidDate = (dateString) => {
  const regEx = /^\d{4}\/\d{2}\/\d{2}$/
  if (!dateString.match(regEx)) return false;
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return false;
  return date.toISOString().slice(0, 10) === dateString
}

export const flattenArr = (arr) => {
  return arr.reduce((map, item) => {
    map[item.id] = item
    return map
  }, {});
}

export const produceId = () => {
  return '_' + Math.random().toString(36).substr(2, 9)
}