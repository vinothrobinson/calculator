// use array.push() to add to end, use array.unshift() to prepend
// Array for storing inputs
let inputArray = [];
// let inputArray = ["1", "+", "3", "*", "5"];

// Functions for basic operations
function add(a, b) {
    result = a + b
    result = result.toString()
    inputArray.unshift(result)
}

function subtract(a, b) {
    result = a - b
    result = result.toString()
    inputArray.unshift(result)
}

function multiply(a, b) {
    result = a * b
    result = result.toString()
    inputArray.unshift(result)
}

function divide(a, b){
    result = a / b
    result = result.toString()
    inputArray.unshift(result)
}

// Function that chooses which operation to use
function operate() {
    while (inputArray.length > 2) { // This function works as long as there are 3 or more items in the array
        let input1 = parseInt(inputArray.shift()); // First number
        let input2 = inputArray.shift(); // Operator
        let input3 = parseInt(inputArray.shift()); // Second number
        console.log(input1);
        console.log(input2);
        console.log(input3);
        if (input2 === "+") {
            add(input1, input3)
        }
        if (input2 === "-") {
            subtract(input1, input3)
        }
        if (input2 === "*") {
            multiply(input1, input3)
        }
        if (input2 === "/") {
            divide(input1, input3)
        }
    }
    return inputArray
}

// console.log(operate());
// console.log(inputArray);