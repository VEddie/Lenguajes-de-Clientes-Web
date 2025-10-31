let createIdentityMatrix = (size) => {
    let matrix = [];
    for (let i = 0; i < size; i++) {
        let row = new Array(size).fill(0);
        row[i] = 1;
        matrix.push(row);
    }

    return matrix;
};

let createMatrix = (array, size) => {
    let matrix = [];

    if (array.length % size !== 0) return;

    for (let i = 0; i < array.length; i += size)
        matrix.push(array.slice(i, i + size));

    return matrix;
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
    let matrix = [];
    for (let i = 0; i < a.length; i++) {
        matrix.push([]);
        for (let j = 0; j < a[i].length; j++)
            matrix[i].push(a[i][j] + b[i][j])
    }

    return matrix;
};

let subtractMatrices = (a, b) => {
    let matrix = [];
    for (let i = 0; i < a.length; i++) {
        matrix.push([]);
        for (let j = 0; j < a[i].length; j++)
            matrix[i].push(a[i][j] - b[i][j])
    }

    return matrix;
};

let multiplyMatrices = (a, b) => {
    let matrix = [];
    for (let i = 0; i < a.length; i++) {
        matrix.push([]);
        for (let j = 0; j < a[i].length; j++) {
            let sum = 0;
            for (let k = 0; k < b[i].length; k++) {
                sum += a[i][k] * b[k][j];
            }
            matrix[i].push(sum);
        }
    }

    return matrix;

};

let multiplyBy = (value, a) => {
    let matrix = [];
    for (let i = 0; i < a.length; i++) {
        matrix.push([]);
        for (let j = 0; j < a[i].length; j++)
            matrix[i].push(value * a[i][j]);
    }

    return matrix;
};


let transposeMatrix = (a) => {
    let matrix = createIdentityMatrix(a.length);
    for (let i = 0; i < a.length; i++)
        for (let j = 0; j < a[i].length; j++)
            matrix[j][i] = a[i][j];

    return matrix;
};

let checkForZeroes = (a) => {
    let matrix = window.structuredClone(a);
    let hasZeroes = true;

    // Check rows
    for(let i = 0; i < matrix.length; i++) 
        if(matrix[i].every(value => value === 0)) return hasZeroes;
    
    // Check columns
    matrix = transposeMatrix(matrix);
    for(let j = 0; j < matrix.length; j++) 
        if(matrix[j].every(value => value === 0)) return hasZeroes;
    
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

    console.log('start')

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
            let targetCellValue = matrix[j][i];

            if(targetCellValue === 0) continue;

            let factor = -((targetCellValue) / currentCellValue);       

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
    if(calculateDeterminant(a) == 0) return;
    
    let matrix = window.structuredClone(a);
    let inverseMatrix = createIdentityMatrix(a.length);

    // Lower triangle loops.
    for (let i = 0; i < matrix.length; i++) {
        let currentCellValue = matrix[i][i];

        if(currentCellValue === 0) {
            matrix = swapMatrixRows(matrix, i);
            inverseMatrix = swapMatrixRows(inverseMatrix, i);
            currentCellValue = matrix[i][i];
        }

        // IMPORTANT, ALWAYS CHECK CURRENT ROW *AFTER* CHECKING THE CELL FOR ZEROES.
        let currentRow = matrix[i];

        // Can be combined
        if (currentCellValue != 1) {
            // Plus zero to fix a weird quirk with JS and negative zeroes.
            let multipliedValues = currentRow.map(v => (v * (1 / currentCellValue)) + 0);
            matrix[i] = multipliedValues;

            // For inverse
            inverseMatrix[i] = inverseMatrix[i].map(v => (v * (1 / currentCellValue)));
        }

        // Exit first set of loops.
        if (i === (matrix.length - 1)) break;

        for (let j = (i + 1); j < matrix.length; j++) {
            let nextRow = matrix[j];
            let targetCellValue = matrix[j][i];

            if(targetCellValue === 0) continue;

            let factor = -((targetCellValue) / currentCellValue);

            let values = currentRow.map(v => v * factor);
            let addedValues = nextRow.map((v, index) => v + values[index]);
            matrix[j] = addedValues;

            // For inverse, add currentValue to the equation.
            let invertedValues = inverseMatrix[i].map(v => (v * factor * currentCellValue) + 0);
            inverseMatrix[j] = inverseMatrix[j].map((v, index) => v + invertedValues[index]);

        }
    }

    // Upper triangle loops.
    for (let i = (matrix.length - 1); i > 0; i--) {
        let currentRow = matrix[i];
        let currentCellValue = matrix[i][i];

        for (let j = (i - 1); j > -1; j--) {
            let nextRow = matrix[j];
            let targetCellValue = matrix[j][i];
            let factor = -((targetCellValue) / currentCellValue);

            let values = currentRow.map(v => v * factor);
            let addedValues = nextRow.map((v, index) => v + values[index]);

            matrix[j] = addedValues;

            // For inverse
            let invertedValues = inverseMatrix[i].map(v => (v * factor * currentCellValue) + 0);
            inverseMatrix[j] = inverseMatrix[j].map((v, index) => v + invertedValues[index]);
        }
    }
    return inverseMatrix;
};


export { createIdentityMatrix, createMatrix, increaseMatrixSize, decreaseMatrixSize, sumMatrices, subtractMatrices, multiplyMatrices, multiplyBy, transposeMatrix, calculateDeterminant, createInverseMatrix };