const calculatorScreen = document.querySelector('.current-operand');
const previousOperandScreen = document.querySelector('.previous-operand');
const clearButton = document.querySelector('[data-action=clear]');
const deleteButton = document.querySelector('[data-action=delete]');
const operatorButtons = document.querySelectorAll('[data-action]');
const numberButtons = document.querySelectorAll('[data-number]');
const equalsButton = document.querySelector('[data-action=calculate]');

let currentOperand = '';
let previousOperand = '';
let operation = undefined;

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		appendNumber(button.textContent);
		updateScreen();
	});
});

operatorButtons.forEach(button => {
	button.addEventListener('click', () => {
		selectOperation(button.textContent);
		updateScreen();
	});
});

equalsButton.addEventListener('click', () => {
	calculate();
	updateScreen();
});

clearButton.addEventListener('click', () => {
	clear();
	updateScreen();
});

deleteButton.addEventListener('click', () => {
	deleteNumber();
	updateScreen();
});

function appendNumber(number) {
	if (number === '.' && currentOperand.includes('.')) return;
	currentOperand = currentOperand.toString() + number.toString();
}

function selectOperation(selectedOperation) {
	if (currentOperand === '') return;
	if (previousOperand !== '') {
		calculate();
	}
	operation = selectedOperation;
	previousOperand = currentOperand;
	currentOperand = '';
}

function calculate() {
	let result;
	const previous = parseFloat(previousOperand);
	const current = parseFloat(currentOperand);
	if (isNaN(previous) || isNaN(current)) return;
	switch (operation) {
		case '+':
			result = previous + current;
			break;
		case '-':
			result = previous - current;
			break;
		case 'x':
			result = previous * current;
			break;
		case '÷':
			result = previous / current;
			break;
		default:
			return;
	}
	currentOperand = result;
	operation = undefined;
	previousOperand = '';
}

function clear() {
	currentOperand = '';
	previousOperand = '';
	operation = undefined;
}

function deleteNumber() {
	currentOperand = currentOperand.toString().slice(0, -1);
}

function updateScreen() {
	calculatorScreen.textContent = currentOperand;
	if (operation) {
		previousOperandScreen.textContent = `${previousOperand} ${operation}`;
	} else {
		previousOperandScreen.textContent = '';
	}
}
