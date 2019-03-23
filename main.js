const startBtn = document.getElementById('startBtn');

const printToDom = (divId, textToPrint) => {
  const selectedDiv = document.getElementById(divId);
  selectedDiv.innerHTML = textToPrint;
};

const openForm = () => {
  let domString = '';

  domString += `<form>`;
  domString += `<h2>Enter First Year's Name</h2>`;
  domString += `  <div class="form-group" id="student-form>`;
  domString += `    <label for="studentName">Student:</label>`;
  domString += `    <input type="text" class="form-control" placeholder="Seamus Finnigan" id="studentName"> `;
  domString += `  </div>`;
  domString += `  <button type="submit" class="btn btn-primary">Sort!</button>`;
  domString += `</form>`;

  printToDom('student-form', domString);
};

const init = () => {
  startBtn.addEventListener('click', openForm);
}

init();