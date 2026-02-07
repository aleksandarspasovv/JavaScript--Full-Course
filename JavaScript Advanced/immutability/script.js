const person = Object.freeze({
    name: 'Alex',
    address: {
        street: '1234'
    }
})


function deepFreeze(object){
    Object.values(object).forEach(value => {
        if(value && typeof value === 'object') {
            deepFreeze(value)
        }
    })

    return Object.freeze(value)
}

const newPerson = {... person, address: {... person.address, steer: '1'} }  //{... person} I want the enw poerson to have all the same properties of person
// ,address => I want  a new property {... person.address} => that will have all the same properties as the peron.address
// ,steer: '1' => but I want to change the street to be '1'
