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