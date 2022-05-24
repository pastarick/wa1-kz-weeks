import Exam from './Exam';

const SERVER_URL = "http://localhost:3001";

const getAllExams = async () => {
  const response = await fetch(`${SERVER_URL}/api/exams`);
  const examsJson = await response.json();
  if (response.ok) {
    return examsJson.map(ex => new Exam(ex.code, ex.name, ex.credits, ex.date, (ex.laude ? ex.score + 'L' : ex.score)));
  } else
    throw examsJson;
};

const addExam = async (exam) => {
  /* We need to modify the passed exam object, i.e. set the laude parameter
  * */
  if (exam.score === 31) {
    exam.score = 30;
    exam.laude = true;
  } else {
    // if we skip this line, everything will work but in the db there will be a null value instead of false
    exam.laude = false;
  }

  const response = await fetch(`${SERVER_URL}/api/exams`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        /*NB: create a new object: useful when the column names in the db have a different name from the object attributes*/
        body: JSON.stringify({
          code: exam.code,
          score: exam.score,
          laude: exam.laude,
          date: exam.date.format('YYYY-MM-DD')
        })
      }
  );

  if (!response.ok) { // REJECT THE PROMISE
    throw await response.json();
  }
  // HANDLE OTHER ERRORS
  else return null; // .then() PROMISE
}

const deleteExam = async (courseCode) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/exams/${courseCode}`, {
      method: 'DELETE'
    });

    if(response.ok) {
      return null;
    }
    else {
      throw await response.json();
    }
  } catch(err) {
    throw new Error('Cannot communicate with the server');
    // and/or get some info from the 'err' object
  }
}

const API = {getAllExams, addExam, deleteExam};
export default API;