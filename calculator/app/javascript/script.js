// #3004788

/*  ******************  themes ******************** */
const container = document.querySelector('.container');
const title = document.querySelector('.nav__title');
const navThemes = document.querySelector('.nav__themes');
const control = document.querySelector('.control');
const nav = document.querySelector('nav');
const body = document.querySelector('body');
const btn = document.querySelectorAll('button');
const span = document.querySelector('.btn');

const changeThemes = () => {
  nav.classList.toggle('color-white');
  container.classList.toggle('container_dark');
  navThemes.classList.toggle('toggle_dark');
  screen.classList.toggle('screen_dark');
  control.classList.toggle('control_dark');
  body.classList.toggle('body_dark');
};
const changeThemesEnter = (e) => e.key === 'Enter' && changeThemes();

navThemes.addEventListener('click', changeThemes);
span.addEventListener('keydown', changeThemesEnter); // function to keydown Enter to go
/* ************End themes script************* */

/* ************start Script add number to screen************* */
const screen = document.querySelector('.screen');
const getNumbers = document.querySelectorAll('[data-type]');
const ac = document.querySelector('.ac');
const light = document.querySelector('left');

let current = '';
let storage = '';
let operator = '';

const updateValue = (ele) => {
  screen.textContent = !ele ? '0' : ele;
};

const numberBtnHandler = (ele) => {
  if (ele === '.' && current.includes('.')) return;
  if (ele === '0' && !current) return;
  current += ele;
  updateValue(current);
};

const resetAllHandler = () => {
  current = '';
  storage = '';
  operator = '';
  updateValue(current);
};

const deleteLastItem = () => {
  current = current.slice(0, -1);
  updateValue(current);
};

const calculateFunction = () => {
  let currentNum = parseFloat(current);
  let storageNum = parseFloat(storage);

  if (currentNum && operator && storageNum) {
    switch (operator) {
      case '+':
        storageNum += currentNum;
        currentNum = '';
        return updateValue(storageNum);
      case '-':
        storageNum -= currentNum;
        currentNum = '';

        if (storageNum.toFixed(4)) {
          return updateValue(storageNum.toFixed(4));
        }
        return updateValue(storageNum);

      case '*':
        storageNum *= currentNum;
        currentNum = '';

        return updateValue(storageNum);

      case '/':
        storageNum += currentNum;
        currentNum = '';

        return updateValue(storageNum);
    }
  }
};

const operationButtonHandler = (opeValue) => {
  if (!current && !storage) return;
  if (current && !storage) {
    storage = current;
    current = '';
    operator = opeValue;
  } else if (storage) {
    operator = opeValue;
  }
  if (current) calculateFunction;
};

const allKeysHandler = (ele) => {
  ele.addEventListener('click', (e) => {
    const type = ele.dataset.type;
    if (type === 'number') {
      numberBtnHandler(ele.textContent);
    } else if (type === 'operator') {
      switch (ele.innerText) {
        case 'C':
          return resetAllHandler();
        case 'del':
          return deleteLastItem();
        case '=':
          return calculateFunction();
        default:
          return operationButtonHandler(ele.innerText);
      }
    }
  });
};
let keyHandler = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
let operatorHandler = ['+', '-', '*', '/'];
window.addEventListener('keydown', (e) => {
  const key = e.key;
  if (keyHandler.includes(key)) {
    numberBtnHandler(key);
  } else if (operatorHandler.includes(key)) {
    operationButtonHandler(key);
  } else if (key === 'Backspace') {
    deleteLastItem(key);
  } else if (key === 'Enter') {
    calculateFunction(key);
  } else if (key === 'c') {
    resetAllHandler(key);
  }
});

getNumbers.forEach(allKeysHandler);

/**********************************************************/
