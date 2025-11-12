const btn = document.querySelector('[data-btn]')

btn.addEventListener('click', e => {
    console.log('Arrow function')
    console.log(this)
})

btn.addEventListener('click', function(e) {
    console.log('Normal function')
    console.log(this)
})

const buttons = document.querySelectorAll('button')

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const currentClicks = (parseInt(button.dataset.click))
        
        button.dataset.clicks = currentClicks + 1
    })
})

// Recursion 

for (let i = 0; i < 10; i++){
    console.log(i0)
}

//----------------------------------------
function printNumber(number){
    if (number > 10) return // i < 10
    console.log(number)
    printNumber(number + 1) // i++
}

printNumber(1) // let i = 0

function sumNumber(number) {
    if (number <= 0) return 0
    number + sumNumber(number - 1)
}

sumNumber(2)

//-----------------------

const person = {
    name: 'Alex',
    friend: {
        name: 'Nasko',
        friend: {
            name: 'Kalin'
        }
    }
}

let currentPerson = person

while (currentPerson != null){ // goes all the way donw
    console.log(currentPerson.friend)
    currentPerson = currentPerson.friend
}


function currentPerson(person){
    if (person == null) return
    console.log(person.name)
    currentPerson(person.friend)
}
