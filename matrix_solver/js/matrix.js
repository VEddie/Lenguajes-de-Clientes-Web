let test_a = [
    [3, 5, 9],
    [2, 4, 7],
    [8, 3, 6]
];

let test_b = [
    [3, 5, 7],
    [1, 9, 2],
    [7, 1, 4]
];


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

    // Fix this later.
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


// Change variable names for clarity sake.

let calculateDeterminant = (a) => {
    for (let i = 0; i < (a.length - 1); i++) {
        let currentRow = a[i];
        let currentValue = a[i][i];
        // console.log(`Current row: ${currentRow}`);
        // console.log(`Current value: ${currentValue}`);

        for (let j = (i + 1); j < a.length; j++) {
            let nextRow = a[j];
            let targetValue = a[j][i];
            let factor = -((targetValue) / currentValue);
            // console.log(`Target value: ${targetValue}`);
            // console.log(`Current factor: ${factor}`);

            let values = currentRow.map(v => v * factor);
            let addedValues = nextRow.map((v, index) => v + values[index]);

            a[j] = addedValues;
            console.log(addedValues);

        }
    }

    let determinant = 1;
    for (let i = 0; i < a.length; i++)
        determinant *= a[i][i];

    return determinant.toFixed(4);
};

let createInverseMatrix = (a) => {
    let result = createIdentityMatrix(a.length);

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