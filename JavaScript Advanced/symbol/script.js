import { person } from "./module"

console.log(sym1 === sym2) //false



Object.entries(person).forEach((key, value) => {
    console.loh(key, value) //sym (name) won't be shown
})

console.log(Object.hasOwnPropertySymbols(person)) //only this will show the symbols
