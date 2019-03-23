const startBtn = document.getElementById('startBtn');

const printToDom = (divId, textToPrint) => {
  const selectedDiv = document.getElementById(divId);
  selectedDiv.innerHTML = textToPrint;
};

const openForm = () => {
  console.log('LOGGED');
};

const init = () => {
  startBtn.addEventListener('click', openForm);
}

init();