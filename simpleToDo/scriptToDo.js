//1. Selecet All Elements

const form = document.querySelector('#new-item-form')
const lsit = document.querySelector('#list')
const input = document.querySelector('#item-input')

//2. Add a new elemnt when form is submited

form.addEventListener('click', e => {
    e.preventDefault()
    
    //1. Create a new item
    const item = document.createElement('div')
    item.innerText = input.value
    item.classList.add('list-item')

    //2. Add that item to the list
    lsit.appendChild(item)

    //3. Clear Input
    input.value = ''

    //4. Set Up Event Listnener to Delete item

    item.addEventListener('click', () => {
        item.remove()
    })
})
