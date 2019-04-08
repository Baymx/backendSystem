/**
 * Created by renlei on 19/03/18.
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/*
*
* 获得8小时前的时间
* @param time{string} 时间字符串
*/
export function getUTCTime(time) {
  var d1 = new Date(time)
  var d2 = new Date(d1.getTime() - 8 * 60 * 60 * 1000)
  var str = d2.getFullYear() + '-' + (d2.getMonth() + 1) + '-' + d2.getDate() + ' ' + d2.getHours() + ':' + d2.getMinutes() + ':' + d2.getSeconds()
  return str
}

/*
* 获得本周的开始日期
* @param time{string} 时间字符串
*/
export function getWeekStartDate(time) {
  var now = new Date(time)
  var nowDayOfWeek = now.getDay()
  var nowDay = now.getDate()
  var nowMonth = now.getMonth()
  var nowYear = now.getYear()
  nowYear += (nowYear < 2000) ? 1900 : 0

  var weekStartDate = new Date(nowYear, nowMonth, nowDay + 1 - nowDayOfWeek)
  return formatDateTimeSimple(weekStartDate)
}

/*
* 获得本周的结束日期
* @param time{string} 时间字符串
*/
export function getWeekEndDate(time) {
  var now = new Date(time)
  var nowDayOfWeek = now.getDay()
  var nowDay = now.getDate()
  var nowMonth = now.getMonth()
  var nowYear = now.getYear()
  nowYear += (nowYear < 2000) ? 1900 : 0

  var weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek))
  return formatDateTimeSimple(weekEndDate)
}

/*
* 获得本月的开始日期
* @param time{string} 时间字符串
*/
export function getMonthStartDate(time) {
  var now = new Date(time)
  var nowMonth = now.getMonth()
  var nowYear = now.getYear()
  nowYear += (nowYear < 2000) ? 1900 : 0

  var monthStartDate = new Date(nowYear, nowMonth, 1)
  return formatDateTimeSimple(monthStartDate)
}

/*
* 获得本月的结束日期
* @param time{string} 时间字符串
*/
export function getMonthEndDate(time) {
  var now = new Date(time)
  var nowMonth = now.getMonth()
  var nowYear = now.getYear()
  nowYear += (nowYear < 2000) ? 1900 : 0

  var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowYear, nowMonth))
  return formatDateTimeSimple(monthEndDate)
}

/*
* 格式化时间
* @param   time{string}   时间字符串
* @return  string
* @example     1900/1/1 1/1/1  formatDateTimeSimple("1900/1/1 1/1/1")   =>   1900-01-01
*/
export function formatDateTimeSimple(time) {
  var date = new Date(time)
  var myyear = date.getFullYear()
  var mymonth = date.getMonth() + 1
  var myweekday = date.getDate()

  if (mymonth < 10) {
    mymonth = '0' + mymonth
  }
  if (myweekday < 10) {
    myweekday = '0' + myweekday
  }
  return (myyear + '-' + mymonth + '-' + myweekday)
}

/*
* 获得某月的天数
* @param year{int} 时间字符串
* @param month{int} 时间字符串
*/
export function getMonthDays(year, month) {
  var monthStartDate = new Date(year, month, 1)
  var monthEndDate = new Date(year, month + 1, 1)
  var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24)
  return days
}

/*
* 时间转 Utc 替换
* @param time{string} 时间字符串
*/
export function dateToUtcReplace(time) {
  var date = new Date(time)
  var Year = 0
  var Month = 0
  var Day = 0
  Year = date.getFullYear() // ie火狐下都可以
  Month = date.getMonth()
  Day = date.getDate()
  var Hour = date.getHours()
  var Minute = date.getMinutes()
  var Second = date.getSeconds()
  var d = new Date(Year, Month, Day, Hour, Minute, Second)
  console.log(d.toISOString())
  return d.toISOString()
}
/*
* 格式化时间
* @param   time{string}   时间字符串
* @return  string
* @example     1900/1/1 1/1/1  formatDateTimeLonger("1900/1/1 1/1/1")   =>   1900-01-01 01:01
*/
export function formatDateTimeLonger(time) {
  var _time = ''
  var date = new Date(time)
  var Hour = date.getHours()
  var Minute = date.getMinutes()
  if (Hour >= 10) {
    _time += ' ' + Hour + ':'
  } else {
    _time += ' 0' + Hour + ':'
  }
  if (Minute >= 10) {
    _time += Minute
  } else {
    _time += '0' + Minute
  }
  return formatDateTimeSimple(time) + _time
}
// 转换算法主函数

export function NumberToChinese(num) {
  var unitPos = 0
  var strIns = ''
  var chnStr = ''
  var needZero = false

  if (num === 0) {
    return chnNumChar[0]
  }
  while (num > 0) {
    var section = num % 10000
    if (needZero) {
      chnStr = chnNumChar[0] + chnStr
    }
    strIns = SectionToChinese(section)
    strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0]
    chnStr = strIns + chnStr
    needZero = (section < 1000) && (section > 0)
    num = Math.floor(num / 10000)
    unitPos++
  }
  return chnStr
}

/**
 * 获取多少天之后或者多少天之前的日期
 * @param aa
 * @returns {string}
 */
export function fun_date(aa) {
  var date1 = new Date()
  var date2 = new Date(date1)
  date2.setDate(date1.getDate() + aa)
  var time2 = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate()
  return time2
}
var chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
var chnUnitSection = ['', '万', '亿', '万亿', '亿亿']
var chnUnitChar = ['', '十', '百', '千']
// 节内转换算法
export function SectionToChinese(section) {
  var strIns = ''
  var chnStr = ''
  var unitPos = 0
  var zero = true
  while (section > 0) {
    var v = section % 10
    if (v === 0) {
      if (!zero) {
        zero = true
        chnStr = chnNumChar[v] + chnStr
      }
    } else {
      zero = false
      strIns = chnNumChar[v]
      strIns += chnUnitChar[unitPos]
      chnStr = strIns + chnStr
    }
    unitPos++
    section = Math.floor(section / 10)
  }
  return chnStr
}
