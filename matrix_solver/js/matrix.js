let createIdentityMatrix = (size) => {
    let result = [];
    for (let i = 0; i < size; i++) {
        let row = new Array(size).fill(0);
        row[i] = 1;
        result.push(row);
    }

    return result;
};

let createMatrix = (array, size) => {
    let result = [];

    if (array.length % size !== 0) return;

    for (let i = 0; i < array.length; i += size)
        result.push(array.slice(i, i + size));

    return result;
};

let increaseMatrixSize = (matrix, targetSize) => {
    // Deep copy of the original.
    let newMatrix = window.structuredClone(matrix);

    for (let i = 0; i < targetSize - 1; i++)
        newMatrix[i].push(0);

    newMatrix.push(new Array(targetSize).fill(0));

    return newMatrix;
};

let decreaseMatrixSize = (matrix, targetSize) => {
    let newMatrix = window.structuredClone(matrix);

    // Removes the last row.
    newMatrix.pop();

    for (let i = 0; i < targetSize; i++)
        newMatrix[i].pop(); // Removes the last column of each row.

    return newMatrix;
};

let sumMatrices = (a, b) => {
    let result = [];
    for (let i = 0; i < a.length; i++) {
        result.push([]);
        for (let j = 0; j < a[i].length; j++)
            result[i].push(a[i][j] + b[i][j])
    }

    return result;
};

let subtractMatrices = (a, b) => {
    let result = [];
    for (let i = 0; i < a.length; i++) {
        result.push([]);
        for (let j = 0; j < a[i].length; j++)
            result[i].push(a[i][j] - b[i][j])
    }

    return result;
};

let multiplyMatrices = (a, b) => {
    let result = [];
    for (let i = 0; i < a.length; i++) {
        result.push([]);
        for (let j = 0; j < a[i].length; j++) {
            let sum = 0;
            for (let k = 0; k < b[i].length; k++) {
                sum += a[i][k] * b[k][j];
            }
            result[i].push(sum);
        }
    }

    return result;

};

let multiplyBy = (value, a) => {
    let result = [];
    for (let i = 0; i < a.length; i++) {
        result.push([]);
        for (let j = 0; j < a[i].length; j++)
            result[i].push(value * a[i][j]);
    }

    return result;
};


let transposeMatrix = (a) => {
    let result = createIdentityMatrix(a.length);
    for (let i = 0; i < a.length; i++)
        for (let j = 0; j < a[i].length; j++)
            result[j][i] = a[i][j];

    return result;
};

let checkForZeroes = (a) => {
    let matrix = window.structuredClone(a);
    let hasZeroes = true;

    // Check rows
    for(let i = 0; i < matrix.length; i++) 
        if(matrix[i].reduce((total, value) => total + value) === 0) return hasZeroes;
    
    // Check columns
    matrix = transposeMatrix(matrix);
    for(let j = 0; j < matrix.length; j++) 
        if(matrix[j].reduce((total, value) => total + value) === 0) return hasZeroes;
    
    return !hasZeroes;

};

// Takes a matrix and an index.
let swapMatrixRows = (a, i) => {
    let matrix = window.structuredClone(a);
    let cellValue = matrix[i][i];

    for(let j = (i + 1); i < matrix.length; j++) {
        if(cellValue !== matrix[j][i]) {
            let aux = matrix[j];
            matrix[j] = matrix[i].map(v => (v * (-1) + 0)); // Swapped rows are multiplied by -1
            matrix[i] = aux;
            break; 
        }
    }
    
    return matrix;
};

let calculateDeterminant = (a) => {
    let matrix = window.structuredClone(a);
    if(checkForZeroes(matrix)) return 0;

    for (let i = 0; i < (matrix.length - 1); i++) {
        let currentCellValue = matrix[i][i];

        // Switch row with a different row if the first value happens to be zero.
        if(currentCellValue === 0) {
            matrix = swapMatrixRows(matrix, i);
            currentCellValue = matrix[i][i];
        }
            
        let currentRow = matrix[i];

        for (let j = (i + 1); j < matrix.length; j++) {
            let nextRow = matrix[j];
            let targetValue = matrix[j][i];

            if(targetValue === 0) continue;

            let factor = -((targetValue) / currentCellValue);       

            let values = currentRow.map(v => v * factor);
            let addedValues = nextRow.map((v, index) => v + values[index]);

            matrix[j] = addedValues;
        }
    }

    let determinant = 1;
    for (let i = 0; i < matrix.length; i++)
        determinant *= matrix[i][i];

    return determinant.toFixed(4);
};

let createInverseMatrix = (a) => {
    let result = createIdentityMatrix(a.length);

    // Check if the first column has zeroes
    for(let i = 0; i < a.length; i++) {
        for(let j = 0; j < a.length; j++) {

        }
    }

    for (let i = 0; i < a.length; i++) {
        let currentRow = a[i];
        let currentValue = a[i][i];

        // Can be combined
        if (currentValue != 1) {
            // Plus zero to fix a weird quirk with JS and negative zeroes.
            let multipliedValues = currentRow.map(v => (v * (1 / currentValue)) + 0);
            a[i] = multipliedValues;

            // For inverse
            result[i] = result[i].map(v => (v * (1 / currentValue)));

        }

        // Exit first set of loops.
        if (i === (a.length - 1)) break;

        for (let j = (i + 1); j < a.length; j++) {
            let nextRow = a[j];
            let targetValue = a[j][i];
            let factor = -((targetValue) / currentValue);

            let values = currentRow.map(v => v * factor);

            let addedValues = nextRow.map((v, index) => v + values[index]);
            a[j] = addedValues;

            // For inverse, add currentValue to the equation.
            let invertedValues = result[i].map(v => (v * factor * currentValue) + 0);
            result[j] = result[j].map((v, index) => v + invertedValues[index]);

        }
    }

    /* Matrix now looks like this:
        [1, value, value]
        [0,    1,  value]
        [0,    0,    1  ]
    */

    for (let i = (a.length - 1); i > 0; i--) {
        let currentRow = a[i];
        let currentValue = a[i][i];

        for (let j = (i - 1); j > -1; j--) {
            let nextRow = a[j];
            let targetValue = a[j][i];
            let factor = -((targetValue) / currentValue);

            let values = currentRow.map(v => v * factor);
            let addedValues = nextRow.map((v, index) => v + values[index]);

            a[j] = addedValues;

            // For inverse
            let invertedValues = result[i].map(v => (v * factor * currentValue) + 0);
            result[j] = result[j].map((v, index) => v + invertedValues[index]);
        }
    }

    // console.log(a);
    // console.log(result);
    return result;
};


export { createIdentityMatrix, createMatrix, increaseMatrixSize, decreaseMatrixSize, sumMatrices, subtractMatrices, multiplyMatrices, multiplyBy, transposeMatrix, calculateDeterminant, createInverseMatrix };