const orderStatus = {
  0: '待支付',
  1: '已支付',
  2: '配货完成',
  3: '出库成功',
  4: '交易成功',
  '-1': '手动关闭',
  '-2': '超时关闭',
  '-3': '商家关闭'
}

export function orderMap (status) {
  return orderStatus[status] || '未知状态'
}

export function prefix (url) {
  if (url && url.startsWith('http')) {
    return url
  } else {
    url = `http://localhost:28019${url}`
    return url
  }
}

export function resetImgUrl (imgObj, imgSrc, maxErrorNum) {
  if (maxErrorNum > 0) {
    imgObj.onerror = function () {
      resetImgUrl(imgObj, imgSrc, maxErrorNum - 1)
    }
    setTimeout(function () {
      imgObj.src = imgSrc
    }, 500)
  } else {
    imgObj.onerror = null
    imgObj.src = imgSrc
  }
}
