const buttons = document.querySelectorAll(".btn");
const displayValue = document.getElementsByClassName("display")[0];

let number1 = "0";
let number2 = "";
let operation = null;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonValue = button.textContent;

    if (
      buttonValue === "0" ||
      buttonValue === "1" ||
      buttonValue === "2" ||
      buttonValue === "3" ||
      buttonValue === "4" ||
      buttonValue === "5" ||
      buttonValue === "6" ||
      buttonValue === "7" ||
      buttonValue === "8" ||
      buttonValue === "9"
    ) {
      includeDigit(buttonValue);
    } else if (buttonValue === "AC") {
      clean();
    } else if (
      buttonValue === "-" ||
      buttonValue === "+" ||
      buttonValue === "x" ||
      buttonValue === "/"
    ) {
      startCalculation(buttonValue);
    } else if (buttonValue === ".") {
      includeDot(buttonValue);
    } else if (buttonValue === "=") {
      finishCalculation();
    } else {
      calculatePorcentage(buttonValue);
    }
  });
});

function includeDigit(digit) {
  if (operation && clickedOnTheSame && number2) {
    clean();
    number1 = digit;
    displayValue.innerHTML = number1;
    return;
  }

  if (operation) {
    number2 += digit;
    displayValue.innerHTML = number2;
    return;
  }

  if (number1 === "0") {
    number1 = digit;
    displayValue.innerHTML = number1;
  } else {
    number1 += digit;
    displayValue.innerHTML = number1;
  }
}

function clean() {
  number1 = "0";
  number2 = "";
  operation = null;
  result = 0;
  clickedOnTheSame = false;
  boolean = false;
  displayValue.innerHTML = number1;
}

function startCalculation(firstOperation) {
  if (clickedOnTheSame && operation !== null) {
    number2 = "";
    clickedOnTheSame = false;
  }

  if (operation && number1 && number2) {
    const result = calculate(operation, number1, number2);
    clean();
    number1 = result;
    displayValue.innerHTML = number1;
  }

  if (operation !== null || number2 === "") {
    operation = firstOperation;
  } else {
    operation = firstOperation;
  }
}

function calculate(operation, n1, n2) {
  let _number1 = parseFloat(n1);
  let _number2 = parseFloat(n2);

  let result = 0;
  switch (operation) {
    case "+":
      result = _number1 + _number2;
      break;
    case "-":
      result = _number1 - _number2;
      break;
    case "x":
      result = _number1 * _number2;
      break;
    case "/":
      result = _number1 / _number2;
      break;
  }

  return result;
}

function includeDot(ponto) {
  if (clickedOnTheSame) {
    clean();
    displayValue.innerHTML = number1 + ".";
  }
  if (number1 === "0") {
    number1 += ponto;
    displayValue.innerHTML = number1;
  } else if (number2 !== "") {
    number2 += ".";
    displayValue.innerHTML = number2;
  } else {
    number1 += ".";
    displayValue.innerHTML = number1;
  }
}

let clickedOnTheSame = false;
let boolean = false;
let newResult = 0;
function finishCalculation() {
  if (clickedOnTheSame) {
    if (number1 !== 0) {
      let newResult = calculate(operation, number1, number2);
      displayValue.innerHTML = newResult;
      console.log(number1);
    } else if (number1 == 0 && number2 == "0") {
      return;
    } else {
      if (newResult === 0) {
        newResult = calculate(operation, number1, number2);
      } else {
        let currentDisplayValue =
          document.querySelector(".display").textContent;
        let result = calculate(operation, currentDisplayValue, number2);
        displayValue.innerHTML = result;
        return;
      }

      if (number1 !== 0 || newResult !== 0) {
        if (boolean) {
          newResult += number2;
        }
        displayValue.innerHTML = newResult;
        boolean = true;
      } else {
        displayValue.innerHTML = newResult;
      }
      return;
    }
  }
  clickedOnTheSame = true;
  if (number1 === 0) {
    number1 = number2;
    number2 = "";
    displayValue.innerHTML = number1;
    return;
  }
  if (number1 == 0 && number2 == 0) {
    clean();
  } else if (number1 && number2 && operation) {
    number1 = calculate(operation, number1, number2);
    displayValue.innerHTML = number1;
  } else {
    clean();
  }
}

function calculatePorcentage(percentege) {
  if (number1 !== "" && number2 !== "") {
    if (!number2) {
      number2 = "";
      displayValue.innerHTML = number1;
    } else {
      const percent = (number1 * number2) / 100;
      number2 = percent;
      displayValue.innerHTML = number2;
    }
  } else {
    number1 = "0";
    displayValue.innerHTML = number1;
  }
}
