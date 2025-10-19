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



