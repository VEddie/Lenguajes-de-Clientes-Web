const defaultMatrix = [1, 4, 8, 9, 2, 7, 3, 5, 4];

let parseMatrix = (matrix, size) => {
    let result = [];

    if(matrix.length % size !== 0) return;

    for(let i = 0; i < matrix.length; i+= size) 
        result.push(matrix.slice(i, i + size));    
    
    return result;
};

let parsedMatrix = parseMatrix(defaultMatrix, 3);

let increaseMatrixSize = (matrix, currentSize) => {
    // Deep copy of the original
    let newMatrix = window.structuredClone(matrix);

    for(let i = 0; i < currentSize; i++) 
        newMatrix[i].push(0);
    
    newMatrix.push(new Array(++currentSize).fill(0));

    return newMatrix;
};

let increasedMatrix = increaseMatrixSize(parsedMatrix, 3)

let decreaseMatrixSize = (matrix, targetSize) => {
    let newMatrix = window.structuredClone(matrix);

    // Removes the last row.
    newMatrix.pop();

    for (let i = 0; i < targetSize; i++)
        newMatrix[i].pop(); // Removes the last column of each row.

    return newMatrix;
}

let decreasedMatrix = decreaseMatrixSize(increasedMatrix, 3);
console.log(decreasedMatrix);

let twoByTwo = decreaseMatrixSize(decreasedMatrix, 2);
console.log(twoByTwo)