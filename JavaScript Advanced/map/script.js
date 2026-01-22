const map = new Map([
    ['United States', 'USD'],
    ['India', 'Rupee'],
    [{ user: 'Alex'}, {age: 30}],
])

console.log(map.get('India'))

//maps support forEach

map.forEach((key, value) => {
    console.log(key, value)
})

const obj = {
    a: 1,
    b: 2,
    c: 3,
    d: 4
}

Object.entries(obj).forEach(([key, value]) => { //its hard to go through each element in objects
    console.log(key, value)
})

console.log(Object.entries(obj).length()) // to get the lengh

map.size // simple

// methods on maps

map.get(1)
map.set(5, 'E')
map.has(5)
map.delete(6)
map.clear()


const mapItems = new Map([
    [1 , {id: 1, name: "test1", desc: 'Desc1'}],
    [2 , {id: 2, name: "test2", desc: 'Desc2'}],
    [3 , {id: 3, name: "test3", desc: 'Desc3'}],
])