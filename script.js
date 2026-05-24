// ===== CALCULATOR =====

let currentInput = '';
let hasResult = false;

function updateDisplay(value) {
  const display = document.getElementById('display');
  display.textContent = value || '0';
}

function appendToDisplay(value) {
  if (hasResult && !isNaN(value)) {
    currentInput = '';
    hasResult = false;
  }

  // Prevent multiple operators in a row
  const lastChar = currentInput.slice(-1);
  const operators = ['+', '-', '*', '/', '%'];
  if (operators.includes(value) && operators.includes(lastChar)) {
    currentInput = currentInput.slice(0, -1);
  }

  // Prevent multiple decimal points in one number
  if (value === '.') {
    const parts = currentInput.split(/[\+\-\*\/]/);
    const lastPart = parts[parts.length - 1];
    if (lastPart.includes('.')) return;
  }

  currentInput += value;
  updateDisplay(currentInput);
}

function clearDisplay() {
  currentInput = '';
  hasResult = false;
  updateDisplay('0');
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput || '0');
}

function calculate() {
  if (!currentInput) return;

  try {
    // Replace display symbols with JS-compatible operators
    let expression = currentInput
      .replace(/÷/g, '/')
      .replace(/×/g, '*');

    let result = Function('"use strict"; return (' + expression + ')')();

    // Handle floating point precision
    result = parseFloat(result.toFixed(10));

    updateDisplay(result);
    currentInput = String(result);
    hasResult = true;
  } catch (e) {
    updateDisplay('Error');
    currentInput = '';
    hasResult = false;
  }
}

// ===== COUNTER =====

let count = 0;

function updateCountDisplay() {
  document.getElementById('count').textContent = count;
}

function increment() {
  count++;
  updateCountDisplay();
}

function decrement() {
  count--;
  updateCountDisplay();
}

function resetCounter() {
  count = 0;
  updateCountDisplay();
}
