function Person(name, age){
    this.name = name
    this.age = age
    this.printName = function(){
        console.log(this.name)
    }
}

const person = new Person('Alex', 30)
const person2 = Object.create(person)
person2.name = 'Andrey' //now the clsoes in the chain is name Andrey

console.log(Object.getPrototypeOf(person2) === person) //True


