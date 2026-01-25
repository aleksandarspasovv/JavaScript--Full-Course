function greet(firstName, lastName, salutation = 'Hi'){
    console.log(`${salutation} ${firstName} ${lastName}`)
}

greet('Alex', 'Spasov')


function greet2(firsName, lastName, { salutation = 'Hi', sufix} = {}){ //default destructed object otherwise error
    console.log(`${salutation} ${sufix} ${firsName} ${lastName}`)   
}

greet2('Alexander', 'Spasov', {sufix: 'Mr'})

