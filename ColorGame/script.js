const squares = document.querySelectorAll(".square");
const colorDisplay = document.querySelector("#colorDisplay");
const message = document.querySelector("#message");
const h1 = document.querySelector("#h1");
const buttonReset = document.querySelector("#reset");
const difficultyButtons = {
    hard: document.querySelector("#hard"),
    easy: document.querySelector("#easy")
};

let numberOfSquares = 6;
let colors;
let pickedColor;

// Funciones auxiliares
const randomColor = () => `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

const generateRandomColors = (num) => Array.from({ length: num }, randomColor);

const pickColor = () => colors[Math.floor(Math.random() * colors.length)];

const changeColors = (color) => {
    squares.forEach(square => square.style.backgroundColor = color);
};

const reset = () => {
    colors = generateRandomColors(numberOfSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    h1.style.color = "white";
    message.textContent = "";
    buttonReset.textContent = "Nuevos Colores";

    squares.forEach((square, i) => {
        square.style.backgroundColor = colors[i];
        square.style.display = (i < numberOfSquares) ? "block" : "none";
    });
};

const updateSelectedButton = (selected) => {
    Object.keys(difficultyButtons).forEach(level => {
        difficultyButtons[level].classList.toggle("selected", level === selected);
    });
};

const setupSelectedButton = () => {
      Object.keys(difficultyButtons).forEach(level => {
        difficultyButtons[level].addEventListener("click", () => {
            numberOfSquares = level === "easy" ? 3 : 6;
            reset();
            updateSelectedButton(level);
        });
    });  
}

const setupResetButton = () => {
    buttonReset.addEventListener("click", reset);    
}

squares.forEach(square => {
    square.addEventListener("click", () => {
        const clickedColor = square.style.backgroundColor;
        if (clickedColor === pickedColor) {
            changeColors(pickedColor);
            h1.style.color = pickedColor;
            message.textContent = "¡Correcto!";
            buttonReset.textContent = "Play Again?";
        } else {
            square.style.backgroundColor = "rgb(36, 36, 36)";
            message.textContent = "Intentalo Nuevamente";
        }
    });
});


const init = () => {
    setupSelectedButton()
    setupResetButton()
    reset()
};

init();