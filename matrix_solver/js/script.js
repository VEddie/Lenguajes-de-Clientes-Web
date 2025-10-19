let currentSize = 2;
let increase = document.getElementById('increase');
let matrices = document.getElementsByClassName('matrix');

increase.addEventListener('click', () => {
    
    for(let i = 0; i < matrices.length; i++) {
        console.log(matrices[i])
    }
    
})