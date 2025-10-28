import { createMatrix, increaseMatrixSize, decreaseMatrixSize } from "./matrix.js";

/* TO DO: 
    - Refactor the updateMatrices function to be more generic.
*/

let matrix_a = [
    [5, 0, 0],
    [0, 5, 0],
    [0, 0, 5]
];

let matrix_b = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Matrix cell values.
let inputValues = [matrix_a, matrix_b];

let currentSize = 3;
let inputCount = 9;

// Spread operator forces HTMLCollection to an array.
let matrices = [...document.getElementsByClassName('matrix')];

let increaseButton = document.getElementById('increase');
let decreaseButton = document.getElementById('decrease');
let fillButton = document.getElementById('randomValues');
let clearButton = document.getElementById('clear');


// let copyMatrix = (matrix, size) => {
//     let newMatrix = [];
//     for(let i = 0; i < size; i++) {
//         let row = new Array(size).fill(0);
//         newMatrix.push(row);
//     }
    
//     for(let i = 0; i < matrix.length; i++) {
//         for(let j = 0; j < matrix[i].length; j++) 
//             newMatrix[i][j] = matrix[i][j];
        
//     }

//     return newMatrix;
// };

let loadMatrices = (operation) => {
    for(let i = 0; i < matrices.length; i++) {
        let inputArray = createMatrix([...matrices[i].children], currentSize);

        // Load values from inputValues
        for(let j = 0; j < currentSize; j++) {
            for(let k = 0; k < currentSize; k++) {
                if(operation === 'clear') 
                    inputArray[j][k].value = 0;
                
                else if(operation === 'fill')
                    inputArray[j][k].value = Math.floor((Math.random() - 0.5) * 20);
                
                else 
                    inputArray[j][k].value = inputValues[i][j][k]; 
            } 
        }
    }
}

let updateMatrices = () => {
    for(let i = 0; i < matrices.length; i++) {
        let inputArray = [...matrices[i].children].map(input => input.value);
        let inputMatrix = createMatrix(inputArray, currentSize);

        // Loop the input fields and update the matrix_a and matrix_b values.
        for(let j = 0; j < currentSize; j++) 
            for(let k = 0; k < currentSize; k++)  
                inputValues[i][j][k] = inputMatrix[j][k];
    }

    console.log('inputValues');
    console.log(inputValues);
}

increaseButton.addEventListener('click', () => {
    if(currentSize === 10) {
        alert('Máximo tamaño permitido es 10x10.');
        return;
    }

    // Grab current values.
    updateMatrices();
    
    currentSize++;

    // Add new input fields.
    for(let i = 0; i < matrices.length; i++) {
        matrices[i].style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;

        for(let j = inputCount; j < (currentSize ** 2); j++) {
            let input = document.createElement('input');
            input.type = 'number';
            input.value = 0;
            matrices[i].appendChild(input);
        }

        inputValues[i] = increaseMatrixSize(inputValues[i], currentSize);
        console.log(inputValues);
    }
    
    inputCount = (currentSize ** 2);

    loadMatrices();

});

decreaseButton.addEventListener('click', () => {
    if(currentSize === 2) {
        alert('Mínimo tamaño permitido es 2x2.');
        return;
    }

    currentSize--;
    
    for(let i = 0; i < matrices.length; i++) {
        matrices[i].style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;

        for(let j = inputCount; j > (currentSize ** 2); j--) 
            matrices[i].removeChild(matrices[i].firstElementChild);
    }

    testMatrix = decreaseMatrixSize(testMatrix, currentSize)
    inputCount = (currentSize ** 2);
    updateMatrices();
    
});

fillButton.addEventListener('click', () => {
    loadMatrices('fill');
})

clearButton.addEventListener('click', () => {
    loadMatrices('clear');
});

window.addEventListener('load', loadMatrices);