import { defaultMatrix } from "./matrix.js";

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


window.addEventListener('load', () => {
    const matrixACells = document.getElementById('matrix_a').children;
    const testData = testMatrix.flat();

    for(let i = 0; i < matrixACells.length; i++) 
        matrixACells[i].value = testData[i];

});

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

    inputCount = (currentSize ** 2);
    
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

    inputCount = (currentSize ** 2);
    
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