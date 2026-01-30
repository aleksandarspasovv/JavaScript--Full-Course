function sum(a, b) {
    return a + b
}

sum.apply(null, [2, 3]) //an array is passed
sum.call(null, 2, 3) // parameters are passed staright away

//apply nad call are the same as bind, but bind doesnt call the function () when call and apply do

