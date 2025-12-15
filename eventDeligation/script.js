const buttons = document.querySelector('button')

document.addEventListener('click', () => {
    console.log('Clicled Document')
}, {capture: true}) //default is {capture: false})

document.body.addEventListener('click', () => {
    console.log('Clicled Body')
})

buttons.forEach(button => {
    button.addEventListener('click', e => {
        e.stopPropagation()
        console.log('Clciked Button')
    })
})

//Deligation => means the events are deligated to all the diffrent things that get clicked
// the click gest handels fromt he button, document nad body not only the button

//Capturing - fist stage where we go through our elements through the outter most (from the furthest to the closest)

//Bubbleing - we strat fromt he closes and we bubble up

document.addEventListener('click', e => {
    if (e.target.matches()){
        console.log('Clciked Button')
    }
})

const newButton = document.createElement('button')
newButton.innerText('Button 5')
dicument.body.append(newButton)

