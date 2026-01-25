function* simpleGenerator() {
    yield 1
    yield 2
    yield 3
}

const generator = simpleGenerator() //this doesnt activate the generator

generator.next() //this activates it and calls the next value



function* fibonacciGenerator(){
    let prevOne = 0
    let prevTwo = 1

    yield 0
    yield 1

    while(true){
        result = prevOne + prevTwo
        yield result
        prevOne = prevTwo
        prevTwo = result

    }
}


const generator2 = fibonacciGenerator()

console.log(generator2.next())
console.log(generator2.next())
console.log(generator2.next())
console.log(generator2.next())
console.log(generator2.next())
console.log(generator2.next())
console.log(generator2.next())
console.log(generator2.next())
console.log(generator2.next())
console.log(generator2.next())
console.log(generator2.next())

 function* idGenerator() {
    let id = 1000
    yield id

    while (true) {
        id += 1
        yield id
    }
 }

 const generator3 = idGenerator()

 console.log(generator3.next())
 console.log(generator3.next())
 console.log(generator3.next())
 console.log(generator3.next())
 console.log(generator3.next())

 generator3.next(2) //values can eb passed isnide
 generator3.return() //going to stop the generator
 