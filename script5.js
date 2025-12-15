setTimeout(() => {
    console.log('inside')
}, 1000)

const button = document.querySelector('button')
addClickEventListener(button, () => {
    console.log('clicked')
})

console.log('outise') //gets printed first 

function addClickEventListener(element, callback){
    element.addEventListener('click', callback)
}