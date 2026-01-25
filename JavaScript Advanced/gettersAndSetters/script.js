const person = {
    name: 'Alex',
    lastName: 'Spasov',
    get fullName(){           //getters never have paramenetrs
        return `${this.name} ${this.lastName}`
    },
    set ageOfTwoDigits(value){
        this.age = value + 2
    }
}

person.ageOfTwoDigits = 23
console.log(person.age)

console.log(person.lastName)

const person2 = {
    age: 30,
    get yearOfBirth(){
        const currentYear = new Date().getFullYear()
        return currentYear - this.age
    }
}

console.log(person2.yearOfBirth)