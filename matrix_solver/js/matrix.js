let test_a = [
    [1, 5, 9],
    [2, 4, 7],
    [8, 3, 6],
];

let test_b = [
    [3, 5, 7],
    [1, 9, 2],
    [7, 1, 4],
];

let sumMatrices = (a, b) => {
    let result = [];
    for(let i = 0; i < a.length; i++) {
        result.push([]);
        for(let j = 0; j < a[i].length; j++) 
            result[i].push(a[i][j] + b[i][j])
    }
    
    console.log(result);      
}

let subtractMatrices = (a, b) => {
    let result = [];
    for(let i = 0; i < a.length; i++) {
        result.push([]);
        for(let j = 0; j < a[i].length; j++) 
            result[i].push(a[i][j] - b[i][j])
    }

    console.log(result);      
}

let multiplyMatrices = (a, b) => {
    let result = [];
    for(let i = 0; i < a.length; i++) {
        result.push([]);
        for(let j = 0; j < a[i].length; j++) {
            let sum = 0;
            for(let k = 0; k < b[i].length; k++) {
                sum += a[i][k] * b[k][j];
            }
            result[i].push(sum);
        }
    }

    console.log(result);

}

let multiplyBy = (value, a) => {
    let result = [];
    for(let i = 0; i < a.length; i++) {
        result.push([]);
        for(let j = 0; j < a[i].length; j++)
            result[i].push(value * a[i][j]);
    }

    console.log(result);
}

let createIdentityMatrix = (size) => {
    let result = [];
    for(let i = 0; i < size; i++) {
        let row = new Array(size).fill(0);
        row[i] = 1;
        result.push(row);
    }

    return result;
}

let transposeMatrix = (a) => {
    let result = createIdentityMatrix(a.length);
    for(let i = 0; i < a.length; i++) 
        for(let j = 0; j < a[i].length; j++) 
            result[j][i] = a[i][j];

    console.log(result);
}

transposeMatrix(test_a);

let createMatrix = (matrix, size) => {
    let result = [];

    if(matrix.length % size !== 0) return;

    for(let i = 0; i < matrix.length; i+= size) 
        result.push(matrix.slice(i, i + size));    
    
    return result;
};

let increaseMatrixSize = (matrix, targetSize) => {
    // Deep copy of the original.
    let newMatrix = window.structuredClone(matrix);

    // Fix this later.
    for(let i = 0; i < targetSize - 1; i++) 
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
}

export { createMatrix, increaseMatrixSize, decreaseMatrixSize };