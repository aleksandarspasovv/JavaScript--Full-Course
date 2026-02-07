const person = {
    name: 'Alex',
    friends: ['Nasko', 'Lubo']
}

function addFriend(obj, friendName){
    return {...obj, friends: addFriends(obj.friends, friendName)}
}


function addFriends(a, element){
    return [...a, element]
}

console.log(person)
console.log(addFriend(person, 'John'))

