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
    const rawData = await fetch('https://jsonplaceholder.typicode.com/users')
    if (rawData.ok) {
        const jsonData = await rawData.json()
        const result = jsonData.map(user => user.name)
        console.log(result)
    } else {
        console.error('User not found')
    }
}

async function consoleLogDataPost() {
    const rawData = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: 'New Post'
        })
    })
    const post  = await rawData.json()
    console.log(post)


}

async function consoleLogComments() {
    const rawData = await fetch('https://jsonplaceholder.typicode.com/comments?postID=1')
    const jsonData = await rawData.json()
    console.log(jsonData)
    
}

consoleLogComments()