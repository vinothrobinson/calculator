// use array.push() to add to end, use array.unshift() to prepend
// Arrays for storing inputs and operators
let inputArray = [];
let operatorList = ["+", "-", "x", "÷", "%"]

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

function modulus(a, b) {
    result = a % b
    result = result.toString()
    inputArray.unshift(result)
}

// Function that chooses which operation to use
let pressedEnter = false;
function operate() {
    pressedEnter = true;
    displayEquation()
    while (inputArray.length > 2) { // This function works as long as there are 3 or more items in the array
        let input1 = parseFloat(inputArray.shift()); // First number
        let input2 = inputArray.shift(); // Operator
        let input3 = parseFloat(inputArray.shift()); // Second number
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
        if (input2 === "%") {
            modulus(input1, input3)
        }
    }
    displayCurrent(inputArray[0])
}

// Adding event listeners to buttons
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => button.addEventListener('click', useCalculator))

let currentInput = ""
let isError = false
let isDecimal = false
function useCalculator() {
    if (this.className === "number") { // Allows for multi digit inputs
        currentInput += this.innerHTML;
        displayCurrent(currentInput);
    }
    if (this.className === "decimal" && !isDecimal) { // Allows for decimal numbers
        currentInput += this.innerHTML;
        isDecimal = true; // Prevents multiple decimal points in the same number
        displayCurrent(currentInput);
    }
    if (this.className === "operation") { // Used to end the current input and add an operator to the array
        if (currentInput === "") { // Error Check
            currentInput = "Math Error";
            isError = true;
            displayCurrent(currentInput);
            currentInput = ""
            return
        }
        inputArray.push(currentInput);
        isDecimal = false;
        currentInput = "";
        inputArray.push(this.innerHTML);
        displayEquation()
        return
    }
    if (this.className === "equals"){ // Checks if the equal sign on the calculator is clicked, to solve the equation
        if (currentInput === "" || inputArray.length < 1) { // Error Check
            currentInput = "Math Error";
            isError = true;
            displayCurrent(currentInput);
            return
        }
        inputArray.push(currentInput);
        currentInput = "";
        operate();
        return
    } 
    if (this.className === "delete") { // Case for undoing the last input
        if (currentInput === "" && inputArray.length === 0 && !isError) {
            return;
        }
        deleteButton();
        return;
    }
    if (this.className === "clear") { // Case to clear the calculator
        if (currentInput === "" && inputArray.length === 0) {
            return;
        }
        clearAll();
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
    if (isError) { // Case for when you run into a Math Error
        isError = false;
        clearAll();
        return;
    }
    if (pressedEnter) { // Case when you have already finished the calculation and pressed this button to clear everything
        pressedEnter = false;
        clearAll();
        return;
    }
    if (currentInput !== "") { // Case where you are undoing changes to the current input being written
        if (currentInput[currentInput.length-1] === ".") {
            isDecimal = false;
        }
        currentInput = currentInput.substring(0, currentInput.length-1)
        displayCurrent(currentInput)
        return
    }
    else { // Case where you are undoing something from earlier (has already been added to the inputArray)
        tempString = inputArray[inputArray.length-1]
        if (tempString.length === 1) {
            if (operatorList.includes(tempString)) {
                currentInput = inputArray[inputArray.length-2]
                inputArray.pop()
                inputArray.pop()
                displayEquation()
                return;
            }
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

// Function to clear the entire calculator
function clearAll() {
    inputArray = [];
    currentInput = "";
    displayCurrent(currentInput);
    displayEquation();
    return;
}