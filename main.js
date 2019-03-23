const startBtn = document.getElementById('start-btn');
const sortBtn = document.getElementById('sort-btn');
const studentForm = document.getElementById('student-form');
const studentName = document.getElementById('student-name');

const printToDom = (divId, textToPrint) => {
  const selectedDiv = document.getElementById(divId);
  selectedDiv.innerHTML += textToPrint;
};

let formVisibility = false; // toggle for the form
const formShowHide = () => {
  if (formVisibility === false) {
    studentForm.style.visibility = 'visible';
    formVisibility = true;
  } else {
    studentForm.style.visibility = 'hidden';
    formVisibility = false;
  };
};

const randomHouse = () => {
  let house = [
    "Gryffindor",
    "Slytherin",
    "Ravenclaw",
    "Hufflepuff"
  ]
  let selectedHouse = house[Math.floor(Math.random()*house.length)];
  return selectedHouse;
};

const addStudent = () => {
  let domString = '';
  let selectedHouse = randomHouse();
  
  domString += `<div class="card text-center" style="width: 18rem;" id="student-card">`;
  domString += `  <div class="card-body">`;
  domString += `    <h2>${studentName.value}</h2>`;
  domString += `    <p class="card-text">${selectedHouse}</p>`;
  domString += `    <button class="btn btn-primary">Go somewhere</button>`;
  domString += `  </div>`;
  domString += `</div>`;

  printToDom('student-cards', domString);
;}

const init = () => {
  startBtn.addEventListener('click', formShowHide);
  sortBtn.addEventListener('click', addStudent);
  randomHouse();
}

init();