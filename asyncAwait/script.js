function setTimeOutPromsie(delay){
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
        resolve(`You have waited ${delay} milliseconds`)
    }, delay)
    })
}

// to chain promises

setTimeOutPromsie(250).then(() => {
    console.log(1)
    return setTimeOutPromsie(250)
}).then(() => {
    console.log(2)
    return setTimeOutPromsie(250)
}).then(() => {
    console.log(3)
})



async function doStuf() {
    await setTimeOutPromsie(250)
    console.log('1')               //wait until this promsie executes and resolves
                                // and then contienue with the other code
    await setTimeOutPromsie(250)
    console.log('2')
}                                

//with messge inside

async function doStuffWithMessage() {

    try {
        const messsge = await setTimeOutPromsie(250)
        console.log(1)
        console.log(messsge)
    
        const messge2 = await setTimeOutPromsie(250)
        console.log(2)
        console.log(messge2)
        
    } catch (error) {
        console.log(error)
    }

}


function getValueWithDelay(value, delay) {
    return new Promise((resovle, reject) => {
        setTimeout(() => {
            resovle(value)
        }, delay)
    })
}

function getValueWithDelayError(value, delay) {
    return new Promise((resovle, reject) => {
        setTimeout(() => {
            reject('Error')
        }, delay)
    })
}

// Call get Value Delay twice and then with Error

async function getValueExecution() {
    try{
        const message = await getValueWithDelay('here', 250)
        console.log(message)

        const message2 = await getValueWithDelay('here2', 250)
        console.log(message2)

        const message3 = await getValueWithDelayError('here3', 250)
        console.log(message3)

    } catch (error) {
        console.error(error)
    } finally {
        console.log('Finally')
    }
}

getValueExecution()
