"use strict";

/* we cannot use require dayjs because is for nodejs */
/* we cannot use import because we need a server to import something, but we are not in HTTP, we are in file:/// */
/* so we import it throush the <script> tag in HTML, but it MUST be BEFORE the <script> tag of this JavaScript file */

function Exam(code, name, credits, date, score, laude=false) {
    this.code = code;
    this.name = name;
    this.credits = credits;
    this.date = dayjs(date);
    this.score = score;
    this.laude = laude;
}

function ExamList() {
    this.list = [];

    /* initialize the list */
    this.init = () => {
        this.list.push(
            new Exam('02GOL', 'Computer Architecture', 10, '2022-02-01', 21),
            new Exam('01SQM', 'Data Science and Database Technology', 8, '2022-02-15', 30, true),
            new Exam('02KPN', 'Computer Network Technologies and Services', 6, '2022-02-06', 26)
        );
    };

    this.getAll = () => {
        return this.list;
    };
}

// SHORT WAY
/*
function createExamRow(exam) {
    // actual DOM manipulation
    return `<tr>
        <td>${exam.date.format('MMMM D, YYYY')}</td>
        <td>${exam.name}</td>
        <td>${exam.credits}</td>
        <td>${exam.score + (exam.laude ? 'L' : '')}</td>
        <td><button class="btn btn-danger">X</button></td>
    </tr>`;
}
*/

// LONGER WAY: create the single elements

function createExamRow(exam) {
    const tr = document.createElement('tr');

    // create 5 <td>
    // 1. first td
    const tdDate = document.createElement('td');
    tdDate.innerText = exam.date.format('DD-MM-YYYY');

    // append to <tr>
    tr.appendChild(tdDate);

    const tdName = document.createElement('td');
    tdName.innerText = exam.name;
    tr.appendChild(tdName);

    const tdCredits = document.createElement('td');
    tdCredits.innerText = exam.credits;
    tr.appendChild(tdCredits);

    const tdScore = document.createElement('td');
    tdScore.innerText = exam.score + (exam.laude ? 'L' : '');
    tr.appendChild(tdScore);

    const tdAction = document.createElement('td');
    tdAction.innerHTML = `<button id=exam-${exam.code} class="btn btn-danger">X</button>`;
    tr.appendChild(tdAction);
    
    tdAction.addEventListener('click', e => {
        // deletes the entire <tr>
        tr.remove();
        console.log(e.target.id);
    });
    

    return tr;
}


function fillExamTable(exams) {
    const examTable = document.getElementById('exam-table');
    // EQUIVALENT: document.querySelector('#exam-table');
    for(const exam of exams) {
        // create <tr> etc for the selected exam
        const examElement = createExamRow(exam);
        // add the <tr> to the table
        // classic way (reverse order):
        // examTable.prepend(examElement);
        // classic way (correct order)
        examTable.insertAdjacentElement('afterbegin', examElement);
        // string literal way:
        // examTable.insertAdjacentHTML('afterbegin', examElement);
    }
}

/*
cannot put here the event listener for the X button
we need to create things like this after the target has been created (after the creation of the X button)
*/


/* Main */
const examList = new ExamList();
examList.init();
const exams = examList.getAll();
fillExamTable(exams);