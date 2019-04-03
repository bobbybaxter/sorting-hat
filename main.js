const startBtn = document.getElementById('start-btn');
const sortBtn = document.getElementById('sort-btn');
const studentForm = document.getElementById('student-form');
const studentName = document.getElementById('student-name');
const errorMsg = document.getElementById('error-msg');
let classroom = [];
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
  }
};

// expel button function
const expelStudent = (e) => {
  let newClassroom = [];
  const exStudent = e.target.id;
  classroom.forEach((x) => {
    if(x.id !== exStudent) {
      newClassroom.push(x);
    };
  });
  classroom = newClassroom;
  classroomBuilder(classroom);
};

// builds the cards
const classroomBuilder = (classroomArray) => {
  let domString = '';
  classroomArray.forEach((student) => {
    domString += `<div class="card text-center border rounded mt-0 mx-3 mb-4" style="width: 15rem;" id="student-card">`;
    domString += `  <div class="card-body d-flex flex-column">`;
    domString += `    <h2>${student.name}</h2>`;
    domString += `    <p class="card-text">${student.house}</p>`;
    domString += `    <button class="btn btn-primary m-auto-top" id="${student.id}">Expel</button>`;
    domString += `  </div>`;
    domString += `</div>`;
  });

  console.log(classroom);

  printToDom('student-cards', domString);
  classroomArray.forEach((student) => {
    expelEventListeners(student.id);
  });
};

const expelEventListeners = (e) => {
  document.getElementById(e).addEventListener('click', expelStudent);
}

const init = () => {
  startBtn.addEventListener('click', formShowHide);
  sortBtn.addEventListener('click', addStudent);
}

init();