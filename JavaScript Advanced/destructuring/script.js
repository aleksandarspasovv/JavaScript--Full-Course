const arrray = ['A', 'B', 'C', 'D']

const [first, second,  forth] = arrray

console.log(first)
console.log(second)
console.log(forth)

const person = {
    name: 'Alex',
    age: 30,
    address: {
        street: 'unknow',
        city: 'Burgas',
    }
}

const {name: firstname, age} = person

console.log(firstname)
console.log(age)

const {address: {street}} = person //gets the street => nesting two layes of destructuting 


function addAndMultiply(a, b) {
    return {sum: a + b, product: a * b}
}

const {sum: add, product: multiply} = addAndMultiply(2, 3)

console.log(add) // 5
console.log(multiply) // 6


function nameToFirstAndLAstArray(fullName){
    return fullName.split(' ')
}

const [firstName, lastName] = nameToFirstAndLAstArray('Aleksandar Spasov')

console.log(firstName)
console.log(lastName)

function nameToFirstAndLAstObject(fullName) {
    const [firstName, lastName] = fullName.split(' ')
    return {firstName: firstName, lastName: lastName}
}

console.log(nameToFirstAndLAstObject('Magi Spasova').firstName)

//decosntruct objects parameter in a function

function addAndMultiply2({a, b = 6}){
    return [a + b, a * b]
}