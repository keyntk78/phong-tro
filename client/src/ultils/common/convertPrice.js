export const convertPrice = (price) => {
  let priceString = ''
  if (+price < 1000000) {
    priceString = +price / 1000 + '.000 đồng/tháng'
  } else {
    priceString = +price / 1000000 + ' triệu/tháng'
  }

  return priceString
}
