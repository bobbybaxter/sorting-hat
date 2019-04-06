# Sorting Hat
One-page locally hosted site to work on writing/working tickets using Github Projects, styling with Bootstrap 4, and manipulating arrays.

## Functionality
- clicking the "Let's start sorting" button removes the jumbotron and displays the sorting form
- the sorting form:
  - displays an error if no name is input
  - builds cards with the student's name and sorts them into a random house
  - includes buttons that will alphabetically sort the students by name and by house
  - can be submitted using the enter key
  - clears input field upon entry
- the cards with the white background:
  - display the student's name and their sorted house
  - display colors based on the house
  - include an expel button that will move the student to 'voldemort's army' in the dark background below
- the cards in 'voldemort's army':
  - change the house to "Voldemort's Army"
  - include an "Add" button that will return the student to the normal "classroom"
  - include a "Remove" button that will remove the student altogether
  - also sorts by name and *previous* house when the "Sort By Name" and "Sort By House" buttons are clicked

## Screenshots
![image of sorting hat website](https://raw.githubusercontent.com/bobbybaxter/sorting-hat/master/img/sorting-hat-screenshot1.png)
![image of sorting hat website](https://raw.githubusercontent.com/bobbybaxter/sorting-hat/master/img/sorting-hat-screenshot2.png)

## Getting Started
Clone the repo:
```
$git clone https://github.com/bobbybaxter/sorting-hat
```

### Prerequisites
Download HTTP Server, to be able to serve the site locally in your browser:
```
$npm install -g http-server
```

## Running
Browse to the sorting-hat/ directory and run HTTP Server by typing the following command into the terminal:
```
$ hs -p 5000
```

In your web browser, copy and paste this:

 `localhost:5000`

## Under the Hood
### Definitions
- first we're defining all of the elements in the global environment that we later use, so the code is easier to read when the element needed
- we define the blank arrays of `classroom` and `badStudents` which will hold data of the students that will be created and passed back and forth
- we define `formVisibility` as `false`, which will later be turned true to show our form
- finally we defined an `idCounter` so when we later add students we can increment the counter, which will allow us to make unique IDs for each student
### Functions
- `onLoad` hides the `badStudentsDiv` because without this the dark background of the div shows when there are no students
- `printToDom` assigns our selected text to our selected DOM element
- `formShowHide` makes our form visible by toggling the form's `.style.visibility`; however, in my latest update, i've hidden the jumbotron which holds the toggle button.  the jumbotron is so large that i thought it made more sense to remove it when ready to sort students.  therefore, the `else` statement is currently obsolete.
- `randomHouse` declares `house` as an array of the 4 houses, then randomly selects a house, assigns that house to `selectedHouse`, then we return `selectedHouse`.
- `studentErrorBar` creates a domString that alerts the user to insert a student name.  this is called later, when the user doesn't include a name before submitting the form.
- `hideShowBadStudentDiv` shows the `badStudentsDiv` only when there are more than 0 students in the `badStudents` array
- `addStudent`:
  - first checks if the input field is blank, 
    - if so it calls `studentErrorBar()`, 
    - if it's not blank, it 
      - selects a house by calling `randomHouse()`, 
      - creates a `uniqueId` by contatenating the student's name with the `idCounter`,
      - creates a student object, giving it a `name`, `house`, and `id`,
      - resets the input field to an empty string,
      - iterates the counter,
      - adds the student to the `classroom` array,
      - and calls `pageReload()`
- `pageReload` calls:
  - `classroomBuilder()` and passes the `classroom` array to be printed to the DOM,
  - `badStudentBuilder()` and passes the `badStudents` array to be printed to the DOM, and
  - `hideShowBadStudentDiv()` to hide or show the div depending on if any students are in the `badStudents` array
- `expelStudent` pushes the target student to the `badStudents` array and splices the target student from the `classroom` array, then calls `pageReload()`
- `addBackToClass` pushes the target student to the `classroom` array and splices the target student from the `badStudents` array, then calls `pageReload()`
- `deleteStudent` removes the target student by splicing them from the `badStudents` array, then calls `pageReload()`
- `classroomBuilder`:
  - creates a domString using Bootstrap card styling to display the student's name, house, and an expel button,
  - calls `printToDom()` to display in the `student-cards` div
  - then loops through the `classroom` array, calling `expelEventListeners()`, and passing the unique `student.id`.  **this is so the `eventListener` will correctly target the card that the spell button is being clicked on.**
- `badStudentBuilder`:
  - creates a domString using Bootstrap card styling, and slightly different styling than `classroomBuilder` to display the student's name, Voldemort's Army, an add to class button, and a remove button
  - calls `printToDom()` to display in the `bad-students` div
  - then loops through the `classroom` array, calling:
    - `addToClassEventListeners()`, and passing the unique `student.id`.  **like before, this is so the `eventListener` will correctly target the card that the spell button is being clicked on.**
    - `deleteEventListeners()`, and passing the unique `student.id` with the word *remove* before it.  this is how i let the eventListeners know which button i clicked on the card.  if you look at the `badStudentBuilder`, i've also added the word *remove* before the `id` of the Remove button, so it corresponds.
- `cardSorter` passes the click event (later defined in `sortEventListeners()`), gets the `id` of the `target` (in this case, the button being clicked), sorts our `classroom` and `badStudent` arrays depending on which button was clicked, the calls `pageReload()`
- `expelEventListeners` calls `expelStudent()` upon click
- `addToClassEventListeners` calls `addBackToClass()` upon click
- `deleteEventListeners` calls `deleteStudent()` upon click
- `sortEvenetListeners` loops through the `cardSortBtns` and adds click even to each button that calls `cardSorter()` upon click
### Execution
- `init`:
  - calls `onLoad()` to make sure the right elements are showing on page load
  - adds an eventListener to `startBtn` that calls `formShowHide()` upon click, which will hide the jumbotron and show the add student form
  - adds an eventListener to `sortBtn` that calls `addStudent()` upon click
  - calls `sortEventListeners()` which gives functionality to the sort buttons at the bottom of the form
- then we invoke `init()`