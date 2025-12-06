// fetch('https://jsonplaceholder.typicode.com/users').then(response => {
//      return response.json()
// }).then(data => {
//     console.log(data.map(user => user.name))
// })

// async function printName() {
//     const rawData = await fetch('https://jsonplaceholder.typicode.com/users')
//     const jsonData = await rawData.json()
//     const result = await jsonData.map(user => user.name)
//     console.log(result)
// }

// printName()


async function consoleLogData() {
    const rawData = fetch('https://jsonplaceholder.typicode.com/users')
}