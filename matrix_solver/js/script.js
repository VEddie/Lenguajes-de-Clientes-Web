import {
    createIdentityMatrix,
    createMatrix,
    increaseMatrixSize,
    decreaseMatrixSize,
    sumMatrices,
    subtractMatrices,
    multiplyMatrices,
    multiplyBy,
    transposeMatrix,
    calculateDeterminant,
    createInverseMatrix
}
    from "./matrix.js";

/* TO DO: 
    - Add every function from matrix.js. [✔]
    - Refactor some of the matrix.js functions for optimization. []
    - Add a function that displays a result from any operation. [✔]
    - Make it look prettier, for goodness sake. []
    - Fix inverse matrix results overflowing the inputs. []
*/

let matrix_a = [
    [5, 2, 8],
    [3, 5, 4],
    [1, 6, 5]
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
let results = document.querySelector('.results');

let increaseButton = document.getElementById('increase');
let decreaseButton = document.getElementById('decrease');
let fillButton = document.getElementById('randomValues');
let clearButton = document.getElementById('clear');
let sumButton = document.getElementById('sum');
let subtractButton = document.getElementById('subtract');
let multiplyButton = document.getElementById('multiply');
let multiplyByButton = document.getElementById('multiplyBy');
let multiplyByInput = document.getElementById('multiplyValue');
let transposeButton = document.getElementById('transpose');
let determinantButton = document.getElementById('determinant');
let inverseButton = document.getElementById('inverse');
let identityButton = document.getElementById('identity');

let loadResult = (matrix) => {
    let div = document.createElement('div');
    div.className = 'matrix';
    div.style.gridTemplateColumns = `repeat(${matrix.length}, 1fr)`;

    for (let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[i].length; j++) {
            let input = document.createElement('input');
            input.type = 'text';
            input.value = matrix[i][j];
            input.disabled = true;
            input.maxLength = 5;
            
            div.appendChild(input);
        }
    }

    return div;
};

let loadMatrices = (operation) => {
    for (let i = 0; i < matrices.length; i++) {
        let inputArray = createMatrix([...matrices[i].children], currentSize);

        // Load values from inputValues
        for (let j = 0; j < currentSize; j++) {
            for (let k = 0; k < currentSize; k++) {
                if (operation === 'clear')
                    inputArray[j][k].value = 0;

                else if (operation === 'fill')
                    inputArray[j][k].value = Math.floor((Math.random() - 0.5) * 20);

                else
                    inputArray[j][k].value = inputValues[i][j][k];
            }
        }
    }
};

let updateMatrices = () => {
    for (let i = 0; i < matrices.length; i++) {
        let inputArray = [...matrices[i].children].map(input => parseFloat(input.value));
        let inputMatrix = createMatrix(inputArray, currentSize);

        // Loop the input fields and update the matrix_a and matrix_b values.
        for (let j = 0; j < currentSize; j++)
            for (let k = 0; k < currentSize; k++)
                inputValues[i][j][k] = inputMatrix[j][k];
    }
};

increaseButton.addEventListener('click', () => {
    if (currentSize === 10) {
        alert('Máximo tamaño permitido es 10x10.');
        return;
    }

    // Grab current values.
    updateMatrices();

    currentSize++;

    // Add new input fields.
    for (let i = 0; i < matrices.length; i++) {
        matrices[i].style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;

        for (let j = inputCount; j < (currentSize ** 2); j++) {
            let input = document.createElement('input');
            input.type = 'number';
            input.value = 0;
            matrices[i].appendChild(input);
        }

        inputValues[i] = increaseMatrixSize(inputValues[i], currentSize);
        console.log(inputValues);
    }

    inputCount = (currentSize ** 2);

    // Load current values, maintaining their order.
    loadMatrices();

});

decreaseButton.addEventListener('click', () => {
    if (currentSize === 2) {
        alert('Mínimo tamaño permitido es 2x2.');
        return;
    }

    updateMatrices();
    currentSize--;

    for (let i = 0; i < matrices.length; i++) {
        matrices[i].style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;

        for (let j = inputCount; j > (currentSize ** 2); j--)
            matrices[i].removeChild(matrices[i].firstElementChild);

        inputValues[i] = decreaseMatrixSize(inputValues[i], currentSize);
    }


    inputCount = (currentSize ** 2);
    loadMatrices();

});

fillButton.addEventListener('click', () => {
    loadMatrices('fill');
    updateMatrices();
})

clearButton.addEventListener('click', () => {
    loadMatrices('clear');
    updateMatrices();
});

sumButton.addEventListener('click', () => {
    // Update inputValues before calculation.    
    updateMatrices();

    let paragraphResult = document.createElement('p');
    paragraphResult.textContent = 'Sum result:';

    let sumMatrix = sumMatrices(inputValues[0], inputValues[1]);
    let result = loadResult(sumMatrix);
    
    results.appendChild(result);
    results.appendChild(paragraphResult);
});

subtractButton.addEventListener('click', () => {    
    updateMatrices();

    let paragraphResult = document.createElement('p');
    paragraphResult.textContent = 'Substraction result:';

    let subtractMatrix = subtractMatrices(inputValues[0], inputValues[1]);
    let result = loadResult(subtractMatrix);
    
    results.appendChild(result);
    results.appendChild(paragraphResult);
});

multiplyButton.addEventListener('click', () => {
    updateMatrices();

    let paragraphResult = document.createElement('p');
    paragraphResult.textContent = 'Multiplication result:';

    let multiplyMatrix = multiplyMatrices(inputValues[0], inputValues[1]);
    let result = loadResult(multiplyMatrix);
    
    results.appendChild(result);
    results.appendChild(paragraphResult);
});

multiplyByButton.addEventListener('click', () => {
    updateMatrices();
    let value = parseFloat(multiplyByInput.value);

    let paragraphResult = document.createElement('p');
    paragraphResult.textContent = `Matrix A multiplied by ${value}:`;

    let multiplyByMatrix = multiplyBy(value, inputValues[0]);
    let result = loadResult(multiplyByMatrix);
    
    results.appendChild(result);
    results.appendChild(paragraphResult);
});

transposeButton.addEventListener('click', () => {
    updateMatrices();

    let paragraphResult = document.createElement('p');
    paragraphResult.textContent = 'Matrix A transpose result:';

    let transposedMatrix = transposeMatrix(inputValues[0]);
    let result = loadResult(transposedMatrix);
    
    results.appendChild(result);
    results.appendChild(paragraphResult);
});

determinantButton.addEventListener('click', () => {
    updateMatrices();

    let determinant = calculateDeterminant(inputValues[0]);
    let paragraphResult = document.createElement('p');
    paragraphResult.textContent = `The determinant is ${determinant}`;

    results.appendChild(paragraphResult);
});

inverseButton.addEventListener('click', () => {
    updateMatrices();

    let paragraphResult = document.createElement('p');
    paragraphResult.textContent = 'Matrix A inverse result:';

    let inverseMatrix = createInverseMatrix(inputValues[0]);
    let result = loadResult(inverseMatrix);
    
    results.appendChild(result);
    results.appendChild(paragraphResult);
});

identityButton.addEventListener('click', () => {
    let paragraphResult = document.createElement('p');
    paragraphResult.textContent = `Identity matrix of ${currentSize} size:`;

    let result = loadResult(createIdentityMatrix(currentSize));

    results.appendChild(result);
    results.appendChild(paragraphResult);
});

window.addEventListener('load', loadMatrices);