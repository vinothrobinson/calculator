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
    displayEquation()
    while (inputArray.length > 2) { // This function works as long as there are 3 or more items in the array
        displayEquation()
        let input1 = parseInt(inputArray.shift()); // First number
        let input2 = inputArray.shift(); // Operator
        let input3 = parseInt(inputArray.shift()); // Second number
        if (input2 === '+') {
            add(input1, input3)
        }
        if (input2 === "-") {
            subtract(input1, input3)
        }
        if (input2 === "x") {
            multiply(input1, input3)
        }
        if (input2 === "÷") {
            divide(input1, input3)
        }
    }
    displayCurrent(inputArray[0])
}

// Adding event listeners to buttons
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => button.addEventListener('click', useCalculator))

let currentInput = ""
function useCalculator() {
    if (this.className === "number") {
        currentInput += this.innerHTML;
        displayCurrent(currentInput);
    }
    if (this.className === "operation") {
        if (currentInput === "") { // Error Check
            currentInput = "Math Error";
            displayCurrent(currentInput);
            currentInput = ""
            return
        }
        inputArray.push(currentInput);
        currentInput = "";
        inputArray.push(this.innerHTML);
        displayEquation()
        return
    }
    if (this.className === "equals"){
        if (currentInput === "") { // Error Check
            currentInput = "Math Error";
            displayCurrent(currentInput);
            currentInput = ""
            return
        }
        inputArray.push(currentInput);
        currentInput = "";
        operate();
        return
    } 
    if (this.className === "delete") {
        if (currentInput === "" && inputArray.length === 0) {
            return;
        }
        deleteButton();
        return;
    }
}

// Displays the current equation being inputted into the calculator
function displayEquation() {
    const display = document.querySelector(".display-equation");
    display.textContent = "";
    let content = "";
    for (let i = 0; i < inputArray.length; i++) {
        if (i === inputArray.length-1) {
            content += inputArray[i];
        }
        else content += inputArray[i] + " ";
    }
    display.textContent = content;
}

// Displays the current string
function displayCurrent(string) {
    const displayInput = document.querySelector(".display-input");
    displayInput.textContent = string;
}

// Delete button (acts as an undo button)
let tempString = ""
function deleteButton() {
    if (currentInput !== "") {
        currentInput = currentInput.substring(0, currentInput.length-1)
        displayCurrent()
        return
    }
    else {
        tempString = inputArray[inputArray.length-1]
        if (tempString.length === 1) {
            inputArray.pop()
            displayEquation()
            return;
        }
        tempString = tempString.substring(0, tempString.length-1)
        inputArray[inputArray.length-1] = tempString
        displayEquation()
        return
    }

}