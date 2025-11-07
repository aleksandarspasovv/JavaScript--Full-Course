const element = document.createElement('span')
element.innerText = 'Hello World'
document.body.appendChild(element)


const firstDiv = document.getElementById('div-id')

firstDiv.style.color = 'red'

const secondDiv = document.getElementsByClassName('div-class')

const secondDivArray = Array.from(secondDiv)

secondDivArray.forEach(div => div.style.color = 'green')


const divByQuery = document.querySelector('input')

divByQuery.style.color = 'purple'

const btn = document.querySelector('[data-btn]')

btn.addEventListener('click', () => {console.log('Clicked')})

const form = document.querySelector('[data-form]')

form.addEventListener('submit', e => {
    e.preventDefault()
    console.log('submitted form')
})


const link = document.querySelector('[data-achor]')

link.addEventListener('click', link => {
    link.preventDefault()
    console.log('Preventef from redirect')
})