class Animal {
    constructor(name){
        this.name = name
    }

    speak(){
        console.log(`${this.name} is speaking`)
    }
}

class Dog extends Animal{
    constructor(name, owner){
        super(name)
        this.owner = owner
    }

    speak(){
        console.log('Bark')
    }

}

const dog = new Dog('Charlie', 'Charls')

class Cat extends Animal{
    constructor(name){  //doesnt need to be added as it will use the const of the main class
        super(name) 
    }

    speak(){
        console.log('Meow')
    }
}



const cat = new Cat('Fluffy')

class Person {
    constructor(name){
        this.name = name
    }
}

class Jenitor extends Person{
    constructor(name, name2){
        super(name)
        this.name2 = name2
    }

    clean(){
        console.log('Cleaning..')
    }
}