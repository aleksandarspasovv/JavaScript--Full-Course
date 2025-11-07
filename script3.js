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