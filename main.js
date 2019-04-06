const startBtn = document.getElementById('start-btn');
const sortBtn = document.getElementById('sort-btn');
const studentForm = document.getElementById('student-form');
const studentName = document.getElementById('student-name');
const errorMsg = document.getElementById('error-msg');
const cardSortBtns = document.getElementsByClassName('sort-btns');
let classroom = [];
let badStudents = [];
let idCounter = 0;

const printToDom = (divId, textToPrint) => {
  const selectedDiv = document.getElementById(divId);
  selectedDiv.innerHTML = textToPrint;
};

let formVisibility = false; // toggle for the form visibility
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
  let house = ["Gryffindor","Slytherin","Ravenclaw","Hufflepuff"]
  let selectedHouse = house[Math.floor(Math.random()*house.length)];
  return selectedHouse;
};

const studentErrorBar = () => {
  let domString = '';
  domString += `<div class="alert alert-danger" role="alert">`;
  domString += `  Please insert a Student name.`;
  domString += `  <button type="button" class="close" data-dismiss="alert" aria-label="Close">`;
  domString += `    <span aria-hidden="true">&times;</span>`;
  domString += `  </button>`;
  domString += `</div>`;
  printToDom('error-msg', domString);
};

// sort form function
const addStudent = () => {
  if (studentName.value === '') {
    console.log(studentForm);
    studentErrorBar();
  } else {
  let selectedHouse = randomHouse();
  const uniqueId = studentName.value + String(idCounter);
  const student = {
    name: studentName.value,
    house: selectedHouse,
    id: uniqueId
  };
    studentName.value = '';
    idCounter++;
    classroom.unshift(student);
    classroomBuilder(classroom);
    badStudentBuilder(badStudents);
  }
};

// expel button function
const expelStudent = (e) => {
  const exStudent = e.target.id;
  classroom.forEach((student, index) => {
    if (student.id === exStudent) {
      badStudents.push(student);
      classroom.splice(index, 1);
    };
  });
  classroomBuilder(classroom);
  badStudentBuilder(badStudents);
  console.log(badStudents);
};

// builds the cards
const classroomBuilder = (classroomArray) => {
  let domString = '';
  classroomArray.forEach((student) => {
    domString += `<div class="card text-center border rounded mt-0 mx-3 mb-4" style="width: 15rem;" id="student-card">`;
    domString += `  <div class="card-body d-flex flex-column ${student.house}">`;
    domString += `    <h3>${student.name}</h3>`;
    domString += `    <p class="card-text">${student.house}</p>`;
    domString += `    <button class="btn btn-primary m-auto-top expel-btn" id="${student.id}">Expel</button>`;
    domString += `  </div>`;
    domString += `</div>`;
  });
  printToDom('student-cards', domString);
  classroomArray.forEach((student) => {
    expelEventListeners(student.id);
  });
};

const badStudentBuilder = (badStudentArray) => {
  let domString = '';
  badStudentArray.forEach((badStudent) => {
    domString += `<div class="card text-center border rounded mt-0 mx-3 mb-4" style="width: 15rem;" id="student-card">`;
    domString += `  <div class="card-body d-flex flex-column voldy-army">`;
    domString += `    <h3>${badStudent.name}</h3>`;
    domString += `    <p class="card-text">${badStudent.house}</p>`;
    domString += `    <button class="btn btn-primary m-auto-top readmit-btn" id="${badStudent.id}">Add to Class</button>`;
    domString += `  </div>`;
    domString += `</div>`;
  });
  printToDom('bad-students', domString);
};

const cardSorter = (e) => {
  e.preventDefault();
  const navId = e.target.id;
  if (navId === 'sort-by-name') {
    classroom.sort((a,b) => (a.name > b.name) ? 1: -1);
  } else if (navId === 'sort-by-house') {
    classroom.sort((a,b) => (a.house > b.house) ? 1: -1);
  }
  classroomBuilder(classroom);
  badStudentBuilder(badStudents);
};

const expelEventListeners = (e) => {
  document.getElementById(e).addEventListener('click', expelStudent);
};

const sortEventListeners = () => {
  for (let i = 0; i < cardSortBtns.length; i++) {
    cardSortBtns[i].addEventListener('click', cardSorter);
  };
};

const init = () => {
  startBtn.addEventListener('click', formShowHide);
  sortBtn.addEventListener('click', addStudent);
  sortEventListeners();
};

init();