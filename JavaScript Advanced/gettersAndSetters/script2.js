const person = {
    firstName: 'Alex',
    secondName: 'Spasov',
    age: null,
    get fullName() {
        return `${this.firstName} ${this.secondName}`
    },
    set ageSetter(value){
        this.age = value
    }
}

console.log(person.fullName)
console.log(person.age)
person.ageSetter = 30
console.log(person.age)