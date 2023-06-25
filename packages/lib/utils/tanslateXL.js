// <!-- 当前时区 -->
function getCZT() {
  const currentTZ = new Date().getTimezoneOffset()
  return currentTZ * 60 * 1000
}
// 解析时间
function parseTime(time, sd, st, flag) {
  let format = `{y}${sd}{m}${sd}{d} {h}${st}{i}${st}{s}`
  if (flag) {
    format = format + st + '{e}'
  }
  const date = new Date(time)
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    e: date.getMilliseconds()
  }
  const time_str = format.replace(/{([ymdhisae])+}/g, (result, key) => {
    const value = formatObj[key]
    return value.toString().padStart(2, '0')
  })
  return time_str
}

// time 时间字符串  type XW LTC  不传默认转当地时
export function transitionXL(time, type, separatorD, separatorT) {
  if (!time) return
  // if(type=='XW'){ //转为LTC -> xw
  // if(type=='LTC'){//转为wx->ltc
  let flag = type == 'XW' ? true : type == 'LTC' ? false : undefined
  if (flag == undefined) {
    throw '请输入要转换的时间类型'
  }
  const sd = separatorD || '-' // 日期分隔符
  const st = separatorT || ':' // 时间分隔符

  const Reg = new RegExp(
    `^(\\d{4})${sd}(\\d{1,2})${sd}(\\d{1,2})\\s+(\\d{1,2})${st}(\\d{1,2})${st}(\\d{1,2})${st}*(\\d{0,3})`
  )
  const _date = time.match(Reg)
  if (!_date) {
    throw '时间格式错误，例子2023-2-6 16:12:50:88 '
  }
  let cTime = _date.slice(1, 7)
  cTime.splice(1, 1, _date[2] - 1)
  if (_date[7]) {
    cTime.push(_date[7])
  }

  let date = new Date(...cTime).getTime()
  const leapSecond = 4 * 1000 //润秒 4s
  const CTZ = getCZT() //当前时区
  if (flag) {
    //转为LTC -> xw
    date = date + leapSecond + CTZ
  } else {
    //转为当地时
    date = date - leapSecond - CTZ
  }
  return parseTime(date, sd, st, cTime.length == 7)
}

// const tmp = '2023-2-1 8:12:50'
// transitionXL(tmp, 'XW') //转为星网
// transitionXL(tmp, 'LTC') //转为当地时
// console.log(tmp, transitionXL(tmp, 'XW'), transitionXL(tmp, 'LTC'))

export function handleTime(data, keys, type) {
  // if (Object.prototype.toString.call(data) == '[object Array]') {

  // }
  if (Object.prototype.toString.call(data) == '[object Object]') {
    let _data = { ...data }
    for (let key in _data) {
      if (keys.includes(key)) {
        const val = _data[key]
        if (Array.isArray(val)) {
          _data[key] = val.map(item => transitionXL(item, type))
        } else {
          _data[key] = transitionXL(_data[key], type)
        }
      }
    }
    return _data
  }
  return data
}
