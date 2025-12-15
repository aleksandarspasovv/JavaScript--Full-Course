//Local Storage | Cookies | Session Storage



//Local Storage
localStorage.setItem('Name', 'Alex')
localStorage.getItem('Name') // you can console.log this

//Cookies (on the dicument and not window)

const date = new Date(9999, 0, 1).toUTCString()
const pastDate = new Date(1999, 0, 1).toUTCString()


document.cookie = `name=Alex; expires=${date}`
document.cookie = `age=30; expires=${date}`

document.cookie = `name=; expires=${pastDate}` //to DELETE a cookie


