const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let expression = '';
let shouldResetDisplay = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value >= '0' && value <= '9' || value === '.') {
            if (shouldResetDisplay) {
                currentInput = value;
                shouldResetDisplay = false;
            } else {
                currentInput += value;
            }
            expression += value;
            display.textContent = expression;
        } else if (value === 'C') {
            currentInput = '';
            expression = '';
            display.textContent = '0';
        } else if (value === '=') {
            if (expression) {
                expression = evaluateExpression(expression);
                display.textContent = expression;
                currentInput = expression;
                shouldResetDisplay = true;
            }
        } else {
            if (currentInput) {
                expression += ' ' + value + ' ';
                display.textContent = expression;
                currentInput = '';
                shouldResetDisplay = false;
            }
        }
    });
});

function evaluateExpression(expr) {
    try {
        return (new Function('return ' + expr))().toString();
    } catch (error) {
        return 'Error';
    }
}
