let a = true
let b = false

console.log(a && b) // fasle

console.log(true || false) // true

console.log(false && fasle || true) // true

console.log(false && (fasle || true)) // false

let happpy = true
console.log(!happpy) // false (opposite)


// Null and Undefinded 

let un = undefined

let nu = null //-> typeof object Null is like an empty value

console.log(typeof nu)

let t //typeof = undefined 

let num1 = 1
let num2 = 2

console.log(num1 > num2)
console.log(num1 == num2) // check if thew valuie of num1 is equal to num2
console.log(num1 != num2) // toc heck if they are not equal



function printCariable(variable) {
    console.log(variable)
}

function secondPrint(name, callback){
    callback(name)
}


secondPrint('Alex', printCariable)

function printName2(name, callback){
    callback('Hello' + name)
}

printName2('Alex', function(varibale){ //use function without giving it a name
    console.log(varibale)

})


let sumArrow = (a, b) => {return a + b} //function = let and = to assign

let miltiplyArrow = (a,b) => {return a * b};
let divideArrow = (a,b) => {return a / b};
let minusArrow = (a,b) => {return a - b ? a > b : b - a}



// Type Coerction - converting from one type to another

let aString = '1'
parseInt(aString) //=> converts to Int

const numberOne = 1
console.log(numberOne.toString())

// NaN

const notANumber = 'asd'

console.log(parseInt(notANumber)) // --> NaN

console.log(isNaN(notANumber)) // --> used to check NaN

// Arrays

const firstArray = ['A', 'B', 'C', 'D', 'E']

for (let i=0; i<firstArray.length; i++){
    if (firstArray.length % 2 != 0){
        console.log(firstArray[firstArray.length / 2])
    } else {
        console.log('Array not even')
    }
}

// Objects

let person = {
    name: 'Alex',
    age: 30,
    favNumber: 22,
    sayHi: function(){console.log('HI')},
    sayHiSecondTime(){
        console.log('Hi Hi') //jsut like a normal fuction without the keyword
    },
    address: {
        city: 'Sofia',
        street: 'ul.'
    }
}

person.age += 1 //  to acces objectname + 
person.sayHi()
person.sayHiSecondTime()

// Also [] can be used

person['name'] ? console.log(person.name) : console.log('No anme avaliable')
person.address.city = 'Varna'

