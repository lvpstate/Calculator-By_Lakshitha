let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
let expression = "";

const expressionDiv = document.getElementById("expression");
const resultDiv = document.getElementById("result");

function updateScreen() {
  if (expressionDiv && resultDiv) {
    expressionDiv.textContent = expression;
    resultDiv.textContent = buffer;
  }
}

function buttonClick(value) {
  if (value === ".") {
    handleDecimal();
  } else if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  updateScreen();
}

function handleDecimal() {
  if (!buffer.includes(".")) {
    buffer += ".";
  }
}

function handleNumber(numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      expression = "";
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      expression += " " + buffer + " =";
      flushOperation(parseFloat(buffer));
      previousOperator = null;
      buffer = runningTotal.toString();
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "%":
      buffer = (parseFloat(buffer) / 100).toString();
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
      handleMath(symbol);
      break;
  }
}

function handleMath(symbol) {
  if (buffer === "0") {
    return;
  }

  const floatBuffer = parseFloat(buffer);

  if (runningTotal === 0) {
    runningTotal = floatBuffer;
    expression = buffer + " " + symbol;
  } else {
    flushOperation(floatBuffer);
    expression += " " + buffer + " " + symbol;
  }
  previousOperator = symbol;
  buffer = "0";
}

function flushOperation(floatBuffer) {
  if (previousOperator === "+") {
    runningTotal += floatBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= floatBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= floatBuffer;
  } else if (previousOperator === "÷") {
    runningTotal /= floatBuffer;
  }
}

function init() {
  document.querySelector('.calc-buttons').addEventListener('click', function(event) {
    // Only handle button clicks
    const btn = event.target.closest('button');
    if (!btn) return;
    const value = btn.dataset.value || btn.innerText;
    buttonClick(value.trim());
  });
}

init();

document.addEventListener('DOMContentLoaded', function () {
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    darkModeBtn.addEventListener('click', function () {
        body.classList.toggle('dark-mode');
        themeIcon.textContent = body.classList.contains('dark-mode') ? 'light_mode' : 'dark_mode';
    });
});