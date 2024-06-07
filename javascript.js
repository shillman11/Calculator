const buttons = document.querySelectorAll("button");
const screenText = document.querySelector(".screenText");
const answer = document.querySelector(".result");
const calcButtons = document.querySelectorAll(".button");
const KEYADD = 107;
const KEYSUBTRACT = 109;
const KEYMULTIPLY = 106;
const KEYDIVIDE = 111;
const KEYENTER = 13;
const KEYDELETE = 8;
const KEY0 = 96;
const KEYDECIMAL = 110;
const KEY1 = 97;
const KEY2 = 98;
const KEY3 = 99;
const KEY4 = 100;
const KEY5 = 101;
const KEY6 = 102;
const KEY7 = 103;
const KEY8 = 104;
const KEY9 = 105;
let screenMemory = [];
let operators = [];
let numbers = [];
let result = 0;

document.addEventListener("keydown", buttonClickHandler);
calcButtons.forEach((button) => {
  button.addEventListener("mouseenter", mouseEnterHandler);
  button.addEventListener("mouseleave", mouseLeaveHandler);
});

buttons.forEach((button) => {
  button.addEventListener("click", buttonClickHandler);
});

function buttonClickHandler(e) {
  let keyCode = e.keyCode;
  if (e.target.id === "clear") {
    clearAll();
  } else if (e.target.id === "delete" || e.keyCode === KEYDELETE) {
    screenMemory.pop();
    screenText.textContent = screenMemory.join("");
  } else if (
    e.target.id === "x" ||
    e.target.id === "-" ||
    e.target.id === "/" ||
    e.target.id === "+" ||
    e.keyCode === KEYMULTIPLY ||
    e.keyCode === KEYDIVIDE ||
    e.keyCode === KEYADD ||
    e.keyCode === KEYSUBTRACT
  ) {
    if (screenMemory.length === 0) {
      if (e.keyCode === KEYMULTIPLY) {
        screenMemory.push("0");
        screenMemory.push(" " + "x" + " ");
        screenText.textContent = screenMemory.join("");
      } else if (e.keyCode) {
        screenMemory.push("0");
        screenMemory.push(" " + e.key + " ");
        screenText.textContent = screenMemory.join("");
      } else {
        screenMemory.push("0");
        screenMemory.push(" " + e.target.id + " ");
        screenText.textContent = screenMemory.join("");
      }
    } else if (
      screenMemory[screenMemory.length - 1] === " x " ||
      screenMemory[screenMemory.length - 1] === " - " ||
      screenMemory[screenMemory.length - 1] === " + " ||
      screenMemory[screenMemory.length - 1] === " / "
    ) {
      return;
    } else {
      if (e.keyCode) {
        if (keyCode === KEYMULTIPLY) {
          screenMemory.push(" " + "x" + " ");
          screenText.textContent = screenMemory.join("");
        } else {
          screenMemory.push(" " + e.key + " ");
          screenText.textContent = screenMemory.join("");
        }
      } else {
        screenMemory.push(" " + e.target.id + " ");
        screenText.textContent = screenMemory.join("");
      }
    }
  } else if (e.target.id === "=" || e.keyCode === KEYENTER) {
    calculate();
    answer.textContent = "= " + parseFloat(result.toFixed(5));
    operators = [];
    numbers = [];
  } else {
    if (e.keyCode) {
      screenMemory.push(e.key);
      screenText.textContent = screenMemory.join("");
    } else {
      screenMemory.push(e.target.id);
      screenText.textContent = screenMemory.join("");
    }
  }
}

function calculate() {
  let joinedMemory = screenMemory.join("").split(" ");
  joinedMemory.map((item) => {
    if (item === "x" || item === "-" || item === "+" || item === "/") {
      operators.push(item);
    } else numbers.push(item);
  });
  let answer = numbers[0];

  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i];
    const nextNumber = numbers[i + 1];

    if (operator === "+") {
      answer = parseFloat(answer) + parseFloat(nextNumber);
    } else if (operator === "-") {
      answer = parseFloat(answer) - parseFloat(nextNumber);
    } else if (operator === "x") {
      answer = parseFloat(answer) * parseFloat(nextNumber);
    } else if (operator === "/") {
      answer = parseFloat(answer) / parseFloat(nextNumber);
    } else return "no operation";
  }
  result = parseFloat(answer);
}

function clearAll() {
  screenText.textContent = "0";
  screenMemory = [];
  answer.textContent = "";
  result = 0;
  operators = [];
  numbers = [];
}

function mouseEnterHandler(e) {
  e.target.className = "buttonColored";
}

function mouseLeaveHandler(e) {
  e.target.className = "button";
}
