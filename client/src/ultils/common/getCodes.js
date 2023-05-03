// export const getCodePrice = (totals) => {
//   return totals.map((item) => ({
//     ...item,
//     min: +item.min,
//     max: item.min === item.max ? 9999999 : +item.max
//   }))
// }

export const getCode = (totals) => {
  return totals.map((item) => ({
    ...item,
    min: +item.min,
    max: item.min === item.max ? 9999999 : +item.max
  }))
}

export const getCodes = (value, totals) => {
  const arrWithMinMax = getCode(totals)

  return arrWithMinMax.filter((item) => item.min <= value && item.max > value)
}
