let result = document.getElementById('result');

const numBtns = document.querySelectorAll('.number');
const operandBtns = document.querySelectorAll('.operand');

const doOperation = (a, b, operand) => {
  if (operand == '%') {
    return +a / +b;
  }
  if (operand == '*') {
    return +a * +b;
  }
  if (operand == '-') {
    return +a - +b;
  }
  if (operand == '+') {
    return +a + +b;
  }
};
const getNums = (operand) => {
  const [a, b] = result.innerHTML.substring(1).split(operand);
  return [result.innerHTML.substring(0, 1) + a, b];
};

// check whether result is empty before using operands for the first time
const isResultEmpty = () => {
  return result.innerHTML.length > 0 ? false : true;
};

const getOperand = () => {
  if (result.innerHTML.includes('%', 1)) {
    return '%';
  } else if (result.innerHTML.includes('*', 1)) {
    return '*';
  } else if (result.innerHTML.includes('-', 1)) {
    return '-';
  } else if (result.innerHTML.includes('+', 1)) {
    return '+';
  } else {
    return null;
  }
};

const replaceOperand = (newOperand) => {
  const operand = getOperand();
  if (newOperand === '=') {
    result.innerHTML = result.innerHTML.split(operand).join('');
  } else if (newOperand === 'C' && !isSecondNumPicked()) {
    result.innerHTML = '';
  } else {
    result.innerHTML =
      result.innerHTML.substring(0, 1) +
      result.innerHTML.substring(1).replace(operand, newOperand);
  }
};

const isSecondNumPicked = () => {
  const operand = getOperand();
  if (operand !== null) {
    const [a, b] = getNums(operand);
    return b === '' ? false : true;
  }
};

const updateResult = (input) => {
  if (getOperand() === null) {
    result.innerHTML = result.innerHTML + input;
  } else if ('%*-+'.includes(input)) {
    replaceOperand();
  } else {
    result.innerHTML = result.innerHTML + input;
  }
};

const equals = (operand) => {
  const [a, b] = getNums(getOperand());
  if (operand === '=') {
    result.innerHTML = doOperation(a, b, getOperand());
  } else {
    result.innerHTML = doOperation(a, b, getOperand()) + operand;
  }
};

// nothing should happen if operation is clicked when no there is no number picked
// picking first number
// picking operand and changing it
// picking second number
// pressing an operand instead of equality should return result of operation plus operand
// negative numbers should work too

numBtns.forEach((numBtn) => {
  numBtn.addEventListener('click', (e) => {
    updateResult(e.target.innerHTML);
  });
});

operandBtns.forEach((operandBtn) => {
  operandBtn.addEventListener('click', (e) => {
    if (!isResultEmpty() && getOperand() === null) {
      if (e.target.innerHTML === '=' && !isSecondNumPicked()) {
        result.innerHTML = result.innerHTML.split('=').join('');
      } else if (e.target.innerHTML === 'C' && !isSecondNumPicked()) {
        result.innerHTML = '';
      } else {
        updateResult(e.target.innerHTML);
      }
    } else if (isSecondNumPicked()) {
      equals(e.target.innerHTML);
    } else {
      replaceOperand(e.target.innerHTML);
    }
  });
});
