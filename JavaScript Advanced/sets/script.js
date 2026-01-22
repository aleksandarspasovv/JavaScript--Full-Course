const uniqueitems = [1, 2, 3, 4, 5]
const newElement = 4

if(!uniqueitems.includes(newElement)){
    uniqueitems.add(newElement)
}

const set = new Set(uniqueitems)
set.has(2) //no get nor []
set.add(5)
set.delete(3)
set.size()
set.clear()

function removeDups(array){
    return [... new Set(array)]
}