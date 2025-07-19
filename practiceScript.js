let nextIndex = 0;
let elementList = [];
let row, column;
let matrixDiv, messageP, MatrixNextButton, MatrixResetButton, explanationP;

function display() {
    row = parseInt(document.getElementById("row").value);
    column = parseInt(document.getElementById("column").value);
    let values = document.getElementById("values").value;

    if (isNaN(row) || isNaN(column) || values.trim() === "") {
        alert("Please enter valid numbers and elements!");
        return;
    }

    elementList = values.split(",").map(num => parseInt(num.trim())).filter(n => !isNaN(n));
    nextIndex = 0;

    const matrixContainer = document.getElementById("matrixContainer");
    matrixContainer.innerHTML = ""; // clear previous content

    const requiredElements = row * column;
    if (elementList.length < requiredElements) {
        matrixContainer.innerHTML = `
            <div class="matrix-container">
                <p class="message" style="color: red;">
                    Insufficient elements! You entered ${elementList.length} but ${requiredElements} are required.
                </p>
            </div>`;
        return;
    } else if (elementList.length > requiredElements) {
        elementList = elementList.slice(0, requiredElements); // trim extra
    }

    matrixDiv = document.createElement("div");
    matrixDiv.className = "matrix-container";

    const grid = document.createElement("div");
    grid.className = "matrix-grid";
    grid.style.gridTemplateColumns = `repeat(${column}, 50px)`;

    for (let i = 0; i < row * column; i++) {
        const cell = document.createElement("div");
        cell.className = "cell empty";
        cell.textContent = "_";
        grid.appendChild(cell);
    }

    matrixDiv.appendChild(grid);
    matrixContainer.appendChild(matrixDiv);

    messageP = document.createElement("p");
    messageP.className = "message";
    matrixDiv.appendChild(messageP);

    explanationP = document.createElement("p");
    explanationP.className = "explanation";
    explanationP.textContent = "Step-by-step explanation will appear here.";
    matrixDiv.appendChild(explanationP);

    MatrixNextButton = document.createElement("button");
    MatrixNextButton.textContent = "Next";
    MatrixNextButton.onclick = () => insertNextValue(grid);
    matrixDiv.appendChild(MatrixNextButton);

    MatrixResetButton = document.getElementById("resetButton");
    MatrixResetButton.classList.remove("hidden");
}

function insertNextValue(grid) {
    if (nextIndex < row * column) {
        const insertedValue = elementList[nextIndex];
        const cell = grid.children[nextIndex];
        cell.textContent = insertedValue;
        cell.classList.remove("empty");
        cell.classList.add("filled");

        explanationP.textContent = `Step ${nextIndex + 1}: Added ${insertedValue} at position (Row ${Math.floor(nextIndex / column) + 1}, Column ${nextIndex % column + 1})`;

        nextIndex++;
    }

    if (nextIndex === row * column) {
        explanationP.textContent = "Matrix is now completely filled!";
        messageP.textContent = "All elements are filled!";
        MatrixNextButton.style.display = "none";
    }
}

function resetMatrix() {
    document.getElementById("row").value = "";
    document.getElementById("column").value = "";
    document.getElementById("values").value = "";
    document.getElementById("matrixContainer").innerHTML = "";
    document.getElementById("resetButton").classList.add("hidden");
}
