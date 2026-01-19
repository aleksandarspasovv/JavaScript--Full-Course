const name = 'Alex'
const age = 30
const sayHi = function() {
    console.log('Hi')
}

const propertyLastName = 'lastName'

const person = {
    name: name,
    age: age,
    sayHi: sayHi
}

const person2 = {
    name,
    age,
    sayHi,
    sayhi2() {  // skip the keyword function
        console.log('Hey')
    },
    [propertyLastName]: 'Spasov' //person[propertyLAsdtName] = 'Spasov'
}