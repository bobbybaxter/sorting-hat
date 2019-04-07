const startBtn = document.getElementById('start-btn');
const jumbotron = document.getElementById('jumbotron');
const sortBtn = document.getElementById('sort-btn');
const studentForm = document.getElementById('student-form');
const studentName = document.getElementById('student-name');
const errorMsg = document.getElementById('error-msg');
const cardSortBtns = document.getElementsByClassName('sort-btns');
const badStudentsDiv = document.getElementById('bad-students');
let formVisibility = false; // toggle for the form visibility
let classroom = [];
let badStudents = [];
let idCounter = 0;

const onLoad = () => {
  badStudentsDiv.classList.add('d-none');
  badStudentsDiv.classList.remove('d-flex');
};

const printToDom = (divId, textToPrint) => {
  const selectedDiv = document.getElementById(divId);
  selectedDiv.innerHTML = textToPrint;
};

const formShowHide = () => {
  if (formVisibility === false) {
    studentForm.style.visibility = 'visible';
    formVisibility = true;
    jumbotron.classList.add('d-none');
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

const hideShowBadStudentDiv = () => {
  if (badStudents.length === 0) {
    badStudentsDiv.classList.add('d-none');
    badStudentsDiv.classList.remove('d-flex');
  } else {
    badStudentsDiv.classList.remove('d-none');
    badStudentsDiv.classList.add('d-flex');
  };
};

// sort form function
const addStudent = () => {
  if (studentName.value === '') {
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
  pageReload();
  };
};

const pageReload = () => {
  classroomBuilder(classroom);
  badStudentBuilder(badStudents);
  hideShowBadStudentDiv();
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
  pageReload();
};

const addBackToClass = (e) => {
  const exStudent = e.target.id;
  badStudents.forEach((student, index) => {
    if (student.id === exStudent) {
      classroom.push(student);
      badStudents.splice(index, 1);
    };
  });
  pageReload();
};

const deleteStudent = (e) => {
  const exStudent = e.target.id;
  badStudents.forEach((student, index) => {
    if (`remove${student.id}` === exStudent) {
      badStudents.splice(index, 1);
    };
  });
  pageReload();
};

// builds the cards
const classroomBuilder = (classroomArray) => {
  let domString = '';
  classroomArray.forEach((student) => {
    domString += `<div class="card text-center border rounded mt-0 mx-3 mb-4" style="width: 15rem;" id="student-card">`;
    domString += `  <div class="card-body d-flex flex-column ${student.house}">`;
    domString += `    <h3>${student.name}</h3>`;
    domString += `    <p class="card-text">${student.house}</p>`;
    domString += `    <button class="btn btn-primary m-auto-top expel-btn mx-1" id="${student.id}">Expel</button>`;
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
    domString += `    <p class="card-text">Voldemort's Army</p>`;
    domString += `    <div class="d-flex flex-row">`
    domString += `      <button class="btn btn-primary m-auto-top addBackToClass-btn half-btn mx-1" id="${badStudent.id}">Add</button>`;
    domString += `      <button class="btn btn-primary m-auto-top remove-btn half-btn mx-1" id="remove${badStudent.id}">Remove</button>`;
    domString += `    </div>`;
    domString += `  </div>`;
    domString += `</div>`;
  });
  printToDom('bad-students', domString);
  badStudentArray.forEach((student) => {
    addToClassEventListeners(student.id);
    deleteEventListeners(`remove${student.id}`);
  });
};

const cardSorter = (e) => {
  e.preventDefault();
  const navId = e.target.id;
  if (navId === 'sort-by-name') {
    classroom.sort((a,b) => (a.name > b.name) ? 1: -1);
    badStudents.sort((a,b) => (a.name > b.name) ? 1: -1);
  } else if (navId === 'sort-by-house') {
    classroom.sort((a,b) => (a.house > b.house) ? 1: -1);
    badStudents.sort((a,b) => (a.house > b.house) ? 1: -1);
  }
  pageReload();
};

const expelEventListeners = (e) => {
  document.getElementById(e).addEventListener('click', expelStudent);
};

const addToClassEventListeners = (e) => {
  document.getElementById(e).addEventListener('click', addBackToClass);
};

const deleteEventListeners = (e) => {
  document.getElementById(e).addEventListener('click', deleteStudent);
};

const sortEventListeners = () => {
  for (let i = 0; i < cardSortBtns.length; i++) {
    cardSortBtns[i].addEventListener('click', cardSorter);
  };
};

const enterKeydown = (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    addStudent();
  };
};

const init = () => {
  onLoad();
  startBtn.addEventListener('click', formShowHide);
  sortBtn.addEventListener('click', addStudent);
  studentForm.addEventListener('keydown', enterKeydown);
  sortEventListeners();
};

init();