const divs = document.querySelectorAll('div');

const divs2 = [...document.querySelectorAll('div')];

[...divs].map(div => { //used to acces the map for non array (the ... makes the Node List an array)
    console.log(div)
});

const array = [1, 2, 3, 4, 5]

const secondArrya = [...array]
secondArrya.push(6) //6 pused to a copy of the array

console.log(array)
console.log(secondArrya) //used to copy an array

const [first, second, ...rest] = array; //combined with destructuring

console.log(rest)