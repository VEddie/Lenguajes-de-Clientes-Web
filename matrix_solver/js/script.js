import { createMatrix, increaseMatrixSize, decreaseMatrixSize } from "./matrix.js";

let testMatrix = [
    [1, 4, 8],
    [9, 2, 7],
    [3, 5, 4]
];

let currentSize = 3;
let inputCount = 9;
let matrices = document.getElementsByClassName('matrix');
let increase = document.getElementById('increase');
let decrease = document.getElementById('decrease');

let updateMatrices = () => {
    // Spread operator forces HTMLCollection to an array.
    const matrixCells = [...document.getElementById('matrix_a').children];
    const inputArray = createMatrix(matrixCells, currentSize);

    for(let i = 0; i < inputArray.length; i++) {
        for(let j = 0; j < inputArray[i].length; j++) 
            inputArray[i][j].value = testMatrix[i][j] !== "" ? testMatrix[i][j] : 0;
    }

}

window.addEventListener('load', updateMatrices);

increase.addEventListener('click', () => {
    if(currentSize === 10) {
        alert('Máximo tamaño permitido es 10x10.');
        return;
    }

    currentSize++;
    
    for(let i = 0; i < matrices.length; i++) {
        matrices[i].style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;

        for(let j = inputCount; j < (currentSize ** 2); j++) {
            let input = document.createElement('input');
            input.type = 'number';
            input.value = 0;
            matrices[i].appendChild(input);
        }
    }

    testMatrix = increaseMatrixSize(testMatrix, currentSize);
    inputCount = (currentSize ** 2);
    updateMatrices();
    
});

decrease.addEventListener('click', () => {
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

/* 
    2x2 = 4 
    3x3 = 9 
    4x4 = 16 
    5x5 = 25
    6x6 = 36 
    7x7 = 49
    8x8 = 64
    9x9 = 81
    10x10 = 100
*/