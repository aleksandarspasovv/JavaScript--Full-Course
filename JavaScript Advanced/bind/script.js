window.name = 'Global Scope'

const person = {
    name: 'Alex',

}

function printName() {
    console.log(this.name)
}

const newPrinFunction = printName.bind(person) //changes the this. //we redefine what this. is

newPrinFunction() //prints 'Alex' isntead of 'Global Scope'

function sum(a, b) {
    return a + b
}

const sumTwo = sum.bind(null, 2) //null is for this (if we leave this, nothing changes) and the variable a is change permanantly to two

