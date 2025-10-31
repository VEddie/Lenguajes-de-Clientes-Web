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
    - Refactor some of the matrix.js functions for optimization. []
*/

let matrix_a = [
    [-8, -8, -4],
    [-9, 9, -10],
    [6, -1, 3]
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
let container = document.querySelector('.container');
let sizeParagraphs = [...document.getElementsByClassName('matrix_size')];
let results = document.querySelector('.results');

let increaseButton = document.getElementById('increase');
let decreaseButton = document.getElementById('decrease');
let swapButon = document.getElementById('swap');
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
        for (let j = 0; j < matrix[i].length; j++) {
            let input = document.createElement('input');
            input.type = 'number';
            input.value = matrix[i][j];
            input.disabled = true;

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

let updateParagraphs = () => {
    for(let i = 0; i < sizeParagraphs.length; i++)
        sizeParagraphs[i].textContent = `${currentSize}x${currentSize}`
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
    updateParagraphs();

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
    updateParagraphs();

});

swapButon.addEventListener('click', () => {
    let aux = inputValues[0];
    inputValues[0] = inputValues[1];
    inputValues[1] = aux;
    loadMatrices();
});

fillButton.addEventListener('click', () => {
    loadMatrices('fill');
    updateMatrices();
    console.log(JSON.parse(JSON.stringify(inputValues)));
})

clearButton.addEventListener('click', () => {
    loadMatrices('clear');
    updateMatrices();
});

sumButton.addEventListener('click', () => {
    // Update inputValues before calculation.    
    updateMatrices();

    let sumMatrix = sumMatrices(inputValues[0], inputValues[1]);
    let result = loadResult(sumMatrix);

    let paragraphResult = document.createElement('p');
    paragraphResult.className = 'matrix_label';
    paragraphResult.textContent = 'Sum result:';

    results.appendChild(result);
    results.appendChild(paragraphResult);
});

subtractButton.addEventListener('click', () => {
    updateMatrices();

    let subtractMatrix = subtractMatrices(inputValues[0], inputValues[1]);
    let result = loadResult(subtractMatrix);

    let paragraphResult = document.createElement('p');
    paragraphResult.className = 'matrix_label';
    paragraphResult.textContent = 'Substraction result:';

    results.appendChild(result);
    results.appendChild(paragraphResult);
});

multiplyButton.addEventListener('click', () => {
    updateMatrices();

    let multiplyMatrix = multiplyMatrices(inputValues[0], inputValues[1]);
    let result = loadResult(multiplyMatrix);

    let paragraphResult = document.createElement('p');
    paragraphResult.className = 'matrix_label';
    paragraphResult.textContent = 'Multiplication result:';

    results.appendChild(result);
    results.appendChild(paragraphResult);
});

multiplyByButton.addEventListener('click', () => {
    updateMatrices();
    let value = parseFloat(multiplyByInput.value);

    let multiplyByMatrix = multiplyBy(value, inputValues[0]);
    let result = loadResult(multiplyByMatrix);

    let paragraphResult = document.createElement('p');
    paragraphResult.className = 'matrix_label';
    paragraphResult.textContent = `Matrix A multiplied by ${value}:`;

    results.appendChild(result);
    results.appendChild(paragraphResult);
});

transposeButton.addEventListener('click', () => {
    updateMatrices();

    let transposedMatrix = transposeMatrix(inputValues[0]);
    let result = loadResult(transposedMatrix);

    let paragraphResult = document.createElement('p');
    paragraphResult.className = 'matrix_label';
    paragraphResult.textContent = 'Matrix A transpose result:';

    results.appendChild(result);
    results.appendChild(paragraphResult);
});

determinantButton.addEventListener('click', () => {
    updateMatrices();
    loadMatrices();

    let determinant = calculateDeterminant(inputValues[0]);
    let paragraphResult = document.createElement('p');
    paragraphResult.className = 'matrix_label';
    paragraphResult.textContent = `The determinant is ${determinant}`;

    results.appendChild(paragraphResult);
});

inverseButton.addEventListener('click', () => {
    updateMatrices();

    if (calculateDeterminant(inputValues[0]) == 0) {
        alert('The determinant is 0, cannot invert matrix.');
        return;
    };

    let inverseMatrix = createInverseMatrix(inputValues[0]);
    let result = loadResult(inverseMatrix);

    // 3 decimal points to display on cells.
    [...result.children].forEach(input => {
        input.value = parseFloat(input.value).toFixed(3);
    });

    let paragraphResult = document.createElement('p');
    paragraphResult.className = 'matrix_label';
    paragraphResult.textContent = 'Matrix A inverse result:';

    results.appendChild(result);
    results.appendChild(paragraphResult);
});

identityButton.addEventListener('click', () => {
    let paragraphResult = document.createElement('p');
    paragraphResult.className = 'matrix_label';
    paragraphResult.textContent = `Identity matrix of size ${currentSize}`;

    let result = loadResult(createIdentityMatrix(currentSize));

    results.appendChild(result);
    results.appendChild(paragraphResult);

});

// Scrolls the results bar to the top after any operation.
container.addEventListener('click', () => {
    results.scrollTop = -results.scrollHeight;
});

// Load matrices on startup, remove after project is done.
window.addEventListener('load', () => {
    loadMatrices();
    updateParagraphs();
});
