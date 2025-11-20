const ourPromsie = new Promise((resolve, reject) => {
    const sum = 1 + 1
    if (sum === 2){
        resolve('Success')
    } else {
        reject('Error')
    }
})

ourPromsie.then(message => {
    console.log(message)
}).catch(message => {
    console.error(message)
})


const secondPromise = new Promise((resolve, reject) => {
    const sum = 2 + 2
    if (sum === 4){
        resolve('2+2=4')
    } else {
        reject('not a right answer')
    }
})

secondPromise.then(message => {
    console.log(message)
}).catch(message => {
    console.error(message)
})

//you want to wrap callback functions into promises

// setTimeout(() => {
//     console.log('here')
// }, 250)


setTimeOutPromise(250)
.then(() => {
    console.log('here')
    return setTimeOutPromise(250) // when rturn is used, you can chain .then()
})
.then(() => {
    console.log('here 2')
    return setTimeOutPromise(250)
})
.then(() => {
    console.log('here 3')
    
})

function setTimeOutPromise(duration) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration)
    })
}

// Create a promsie for addEventListener

const button = document.querySelector('button')

addEventListenerPromise(button, 'click').then(() => {
    console.log('Successfully Clicked')
})

function addEventListenerPromise(element, method){
    return new Promise((resolve, reject) => {
        element.addEventListener(method, resolve)
    })
}