let currentTotal = 0;
let buffer = "0";

let previousOperator = null;

const calcScreen = document.querySelector(".calc-numbers");

document
  .querySelector(".calculator-buttons")
  .addEventListener("click", function (event) {
    buttonClick(event.target.innerHTML);
  });

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerenderScreen();
}

function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      currentTotal = 0;
      previousOperator = null;
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      buffer = "" + currentTotal;
      previousOperator = null;
      currentTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    default:
      handleMath(value);
      break;
  }
}

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}

function handleMath(value) {
  const internalBuffer = parseInt(buffer);

  if (currentTotal === 0) {
    currentTotal = internalBuffer;
  } else {
    flushOperation(internalBuffer);
  }

  previousOperator = value;

  buffer = "0";
}

function flushOperation(internalBuffer) {
  if (previousOperator === "+") {
    currentTotal += internalBuffer;
  } else if (previousOperator === "-") {
    currentTotal -= internalBuffer;
  } else if (previousOperator === "x") {
    currentTotal *= internalBuffer;
  } else {
    currentTotal /= internalBuffer;
  }
}

function rerenderScreen() {
  calcScreen.value = buffer;
}
