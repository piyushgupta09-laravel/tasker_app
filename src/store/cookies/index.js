const setItem = (cname, cvalue, exdays) => {
  var d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  var expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

const getItem = (cname) => {
  var name = cname + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

const checkItem = (cname) => {
  var cvalue = getItem(cname)
  if (cvalue !== '') {
    alert('Welcome again ' + cvalue)
  } else {
    cvalue = prompt('Please enter your name:', '')
    if (cvalue !== '' && cvalue != null) {
      setItem(cname, cvalue, 365)
    }
  }
}

const removeItem = (cname) => {
  const expire = 'expires=Thu, 01 Jan 1970 00:00:00 GMT;'
  const cookiesArray = document.cookie.split(';')
  for (let cookie = 0; cookie < cookiesArray.length; cookie++) {
    const name = cookiesArray[cookie].split('=')[0]
    if (name === cname) {
      document.cookie = name + '=;' + expire
    }
  }
}

const removeItems = () => {
  // Use old date to expire the cookies
  const expire = 'expires=Thu, 01 Jan 1970 00:00:00 GMT;'

  // Split each cookie into an array element.
  const cookiesArray = document.cookie.split(';')

  // Split the cookie to have name as the first value.
  // Then use the cookie's name to expire the cookie.
  for (let cookie = 0; cookie < cookiesArray.length; cookie++) {
    const name = cookiesArray[cookie].split('=')[0]
    document.cookie = name + '=;' + expire
  }
}

export default {
  setItem,
  getItem,
  checkItem,
  removeItem,
  removeItems
}
