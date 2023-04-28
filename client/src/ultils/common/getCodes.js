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

export const getCodes = (arrMinMax, totals) => {
  const arrWithMinMax = getCode(totals)
  return arrWithMinMax.filter(
    (item) =>
      (item.min >= arrMinMax[0] && item.min < arrMinMax[1]) || (item.max > arrMinMax[0] && item.max <= arrMinMax[1])
  )
}
