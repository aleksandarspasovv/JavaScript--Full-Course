const garndParent = document.querySelector('#garnd-parent')

garndParent.style.color = 'green'

const firstParent = garndParent.children[0]
const secondParent = firstParent.nextElementSibling
const childOne = firstParent.children[0]
const childTwo = childOne.nextElementSibling


const grandParentSelectedFromChild = childOne.closest('.grand-parent')
grandParentSelectedFromChild.style.color = 'purple'

firstParent.style.color = 'red'

