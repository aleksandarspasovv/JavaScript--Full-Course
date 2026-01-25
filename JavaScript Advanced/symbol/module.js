const sym1 = Symbol('Name')
const sym2 = Symbol('Name')
const sym3 = Symbol('Name')


export const person = {
    age: 30,
    [sym1]: 'Alex'
}

//to create a global symbol
const specialSymbol = Symbol.for('name')// if thre is  asymbol with that name


