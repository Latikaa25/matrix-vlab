let nextIndex = 0;
let elementList = [];
let row, column;
let matrixDiv, messageP, MatrixNextButton, MatrixResetButton, explanationP;

// Predefined range for random matrix generation
const MIN_VALUE = 1;
const MAX_VALUE = 50;

const manualBtn = document.getElementById("manualBtn");
const randomBtn = document.getElementById("randomBtn");
const elementsInput = document.getElementById("elementsInput");

manualBtn.addEventListener("click", () => {
    elementsInput.style.display = "block"; // show input box
});

randomBtn.addEventListener("click", () => {
    elementsInput.style.display = "none";   // hide manual input
    generateRandomMatrix();                 //  immediately create a random matrix
});

function hideEnterButton() {
  const btn = document.getElementById('enterBtn');
  if (btn) btn.classList.add('hidden');
}
function showEnterButton() {
  const btn = document.getElementById('enterBtn');
  if (btn) btn.classList.remove('hidden');
}


randomBtn.addEventListener("click", () => {
  elementsInput.style.display = "none";
  hideEnterButton();
  generateRandomMatrix();
});


// Display matrix based on user input
function display() {
    row = parseInt(document.getElementById("row").value);
    column = parseInt(document.getElementById("column").value);
    let values = document.getElementById("values").value;

    const matrixContainer = document.getElementById("matrixContainer");
    matrixContainer.innerHTML = ""; // clear previous content

    if (isNaN(row) || isNaN(column) || values.trim() === "") {
        matrixContainer.innerHTML = `
            <div class="matrix-container">
                <p class="message" style="color: red;">
                    Please enter valid numbers and elements!
                </p>
            </div>`;
        return;
    }

    let elementListRaw = values.split(",").map(num => num.trim());

    if (elementListRaw.some(v => v === "" || isNaN(parseFloat(v)))) {
        matrixContainer.innerHTML = `
            <div class="matrix-container">
                <p class="message" style="color: red;">
                    Please enter only numbers separated by commas!
                </p>
            </div>`;
        return;
    }

    elementList = elementListRaw.map(num => parseFloat(num));
    nextIndex = 0;

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
        matrixContainer.innerHTML = `
            <div class="matrix-container">
                <p class="message" style="color: red;">
                    Too many elements! Only ${requiredElements} are required.
                </p>
            </div>`;
        return;
    }

   
    hideEnterButton();                      
  document.getElementById("resetButton").classList.remove("hidden");

    createMatrixGrid();
}


// Generate random matrix with predefined range
function generateRandomMatrix() {
    row = parseInt(document.getElementById("row").value);
    column = parseInt(document.getElementById("column").value);

    const matrixContainer = document.getElementById("matrixContainer");
    matrixContainer.innerHTML = ""; // clear previous content

    if (isNaN(row) || isNaN(column) || row <= 0 || column <= 0) {
        matrixContainer.innerHTML = `
            <div class="matrix-container">
                <p class="message" style="color: red;">
                    Please enter valid numbers for rows and columns!
                </p>
            </div>`;
        return;
    }

    // Generate random integers (1–50)
    elementList = [];
    for (let i = 0; i < row * column; i++) {
        elementList.push(Math.floor(Math.random() * 50) + 1); // 1 to 50 integers
    }

    nextIndex = 0;
    createMatrixGrid(); // Display the matrix using existing function
}


// Common function to create grid and UI elements
function createMatrixGrid() {
    const matrixContainer = document.getElementById("matrixContainer");

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

    document.getElementById("goToTraversalBtn").classList.remove("hidden");
}

// Insert next value into the grid step-by-step
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

    // 🔹 Show global step button for next step
    stepNextBtn.style.display = "block";
    stepNextBtn.textContent = "Step 2 → Traversal";

    // Reassign its click for traversal step
    stepNextBtn.onclick = () => {
        creationStep.style.display = "none";
        traversalStep.style.display = "block";
        stepNextBtn.style.display = "none"; // hidden until traversal finishes
    };
}


}

function resetMatrix() {
  document.getElementById("row").value = "";
  document.getElementById("column").value = "";
  document.getElementById("values").value = "";
  document.getElementById("matrixContainer").innerHTML = "";
  document.getElementById("resetButton").classList.add("hidden");
  elementsInput.style.display = "none";
  nextIndex = 0;
  elementList = [];

  showEnterButton();                      // <- show ENTER again
}


let currentStep = 0;

const stepExplanation = document.getElementById("stepExplanation");
const stepNextBtn = document.getElementById("stepNextBtn");
const creationStep = document.getElementById("creationStep");
const matrixSteps = document.getElementById("matrixSteps");
const traversalStep = document.getElementById("traversalStep");     // new step
const manipulationStep = document.getElementById("manipulationStep"); // future step

// initialize button label
stepNextBtn.textContent = "Step 1 → Creation";

stepNextBtn.addEventListener("click", () => {
  currentStep++;

  if (currentStep === 1) {
    // Step 1: Move to Creation
    matrixSteps.style.display = "none";
    creationStep.style.display = "block";
    stepNextBtn.style.display = "none"; // hidden until creation finishes
  } 
  else if (currentStep === 2) {
    // Step 2: Traversal
    creationStep.style.display = "none";
    traversalStep.style.display = "block";
    stepNextBtn.textContent = "Step 3 → Manipulation";
  }
  else if (currentStep === 3) {
    // Step 3: Manipulation
    traversalStep.style.display = "none";
    manipulationStep.style.display = "block";
    stepNextBtn.style.display = "none"; // last step → hide
  }
});




// STEP 2: MATRIX TRAVERSAL

let traversalMatrix = [];
let traversalOrder = [];
let traversalIndex = 0;
let traversalMode = "";
const traversalMatrixContainer = document.getElementById("traversalMatrixContainer");
const traversalExplanation = document.getElementById("traversalExplanation");
const traversalNextBtn = document.getElementById("traversalNextBtn");
const traversalResetBtn = document.getElementById("traversalResetBtn");

document.getElementById("rowWiseBtn").addEventListener("click", () => {
  traversalMode = "row";
  prepareTraversalMatrix();
});

document.getElementById("colWiseBtn").addEventListener("click", () => {
  traversalMode = "col";
  prepareTraversalMatrix();
});

function prepareTraversalMatrix() {
  traversalMatrixContainer.innerHTML = "";
  traversalOrder = [];
  traversalIndex = 0;

  // create grid again using elementList
  const grid = document.createElement("div");
  grid.className = "matrix-grid";
  grid.style.gridTemplateColumns = `repeat(${column}, 50px)`;

  traversalMatrix = []; // store 2D form for indexing
  let idx = 0;
  for (let i = 0; i < row; i++) {
    const rowArr = [];
    for (let j = 0; j < column; j++) {
      const cell = document.createElement("div");
      cell.className = "cell filled";
      cell.textContent = elementList[idx];
      grid.appendChild(cell);
      rowArr.push(cell);

      // add to traversal order
      if (traversalMode === "row") {
        traversalOrder.push({ i, j, value: elementList[idx] });
      } else {
        traversalOrder.push({ i: j, j: i, value: elementList[i * column + j] }); // col-wise
      }

      idx++;
    }
    traversalMatrix.push(rowArr);
  }

  traversalMatrixContainer.appendChild(grid);

  traversalExplanation.textContent = `Traversal started in ${traversalMode === "row" ? "Row-wise" : "Column-wise"} mode.`;
  traversalNextBtn.classList.remove("hidden");
  traversalResetBtn.classList.remove("hidden");
}

// handle NEXT button
traversalNextBtn.addEventListener("click", () => {
  if (traversalIndex < traversalOrder.length) {
    const { i, j, value } = traversalOrder[traversalIndex];

    let cell;
    if (traversalMode === "row") {
      cell = traversalMatrix[i][j];
    } else {
      cell = traversalMatrix[j][i]; // careful: reversed indices for col-wise
    }

    // highlight current cell
    cell.style.backgroundColor = "#fbbf24"; // amber highlight
    cell.style.color = "#000";

    // explanation: human index (1-based) and code index (0-based)
    traversalExplanation.textContent =
      `Step ${traversalIndex + 1}: Visited value ${value} → Position (Row ${i + 1}, Col ${j + 1}) → Code index [${i}][${j}]`;

    traversalIndex++;

    if (traversalIndex === traversalOrder.length) {
      traversalExplanation.textContent += " ✅ Traversal complete!";
      traversalNextBtn.classList.add("hidden");
    }
  }
});

// Example: when traversal is complete
function finishTraversal() {
    explanationP.textContent = "Traversal complete!";
    stepNextBtn.style.display = "block";
    stepNextBtn.textContent = "Step 3 → Manipulation";

    stepNextBtn.onclick = () => {
        traversalStep.style.display = "none";
        manipulationStep.style.display = "block";
        stepNextBtn.style.display = "none"; // last step
    };
}


// reset traversal step
traversalResetBtn.addEventListener("click", () => {
  traversalMatrixContainer.innerHTML = "";
  traversalExplanation.textContent = "Select a traversal method to begin.";
  traversalNextBtn.classList.add("hidden");
  traversalResetBtn.classList.add("hidden");
  traversalOrder = [];
  traversalIndex = 0;
  traversalMode = "";
});


