function setTimeOutPromise(delay){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        resolve(`you waited for ${delay}`)} // giving a value tot he resolve
        , delay)
    })
}

// setTimeOutPromise(250).then((messgae) => {
//     console.log(1)
//     console.log(message)
//     return setTimeOutPromise(250)
// }).then(() => {
//     console.log(2)
// })

async function doStuff(){
    const message = await setTimeOutPromise(250)
    console.log(message) // to access the resolve
    console.log('Async 1')
    const message2 = await setTimeOutPromise(250)
    console.log(message2)
    console.log('Async 2')
}

async function doStuffWithError(){
    try{
        const message = await setTimeOutPromise(265)
        console.log(message)
    } catch (error) {
        console.error(error)
    }
}