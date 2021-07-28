import barcode from './barcode.js';

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${[year, month, day].map(formatNumber).join('/')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}


function toBarcode (canvasId, code, width, height) {
  barcode.code128(wx.createCanvasContext(canvasId), code, width, height);
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  toBarcode:toBarcode,
}