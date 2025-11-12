const isUserLoggeed = true


// let welcomeMessage = ''

// if (isUserLoggeed) {
//     console.log('logged')
// } else {
//     console.log('not logged')
// }

const welcomeMessage = isUserLoggeed ? 'logged' : console.log('not logged')

console.log(welcomeMessage)


const favAnimal = 'dog'

switch (favAnimal) {
    case 'bobcat':
    case 'cat' :
        console.log('cats are cool')
        break
    case 'dog' :
        console.log('dogs are also cool')
        break
    default: // rhis is instead of else
        console.log('no such animal recodnised')

}


const number = '1'

switch (number) {
    case '0' :
        console.log('it is zero')
        break
    case '1' || '2':
        console.log('it is small')
        break
    case '3' || '4':
        console.log('it is medium')
        break
    case '5':
        console.log('it is large')
        break
    default:
        console.log('try again')
}       


//Short Circuit Evaluation

function printTrue(){
    console.log('true')
    return true
}

function printFalse(){
    console.log('fasle')
    return false
}

printTrue() || printFalse() //only true will be printed

//Use case

function printName(name){
    console.log(name || 'Default')
}

//Use case => when using || and && you avoid error codes

const person = {
    name: 'Alex',
    address: {
        street: 'Main st'
    }
}

// if (person != null && person.address != null){
//     console.log(person.address.street)
// }

//easier way for not such a bulku code

console.log(person && person.address && person.address.street)