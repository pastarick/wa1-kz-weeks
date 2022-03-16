'use strict';

const dayjs = require('dayjs');
const sqlite = require('sqlite3');

function Exam(code, name, credits, date, score, laude = false) {
  this.code = code;
  this.name = name;
  this.credits = credits;
  this.date = dayjs(date);
  this.score = score;
  this.laude = laude;

  this.toString = () => `${this.code} - ${this.name}: ${laude ? this.score + 'L' : this.score}\n`;
}

function ExamList() {
  const db = new sqlite.Database('exams.sqlite', err => {if(err) throw err});

  // add
  this.add = (exam) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO score(coursecode, score, laude, datepassed) \
                   VALUES(?, ?, ?, DATE(?))';
      // NB: exame.date is a dayjs object -> .format
      db.run(sql, [exam.code, exam.score, exam.laude, exam.date.format('YYYY-MM-DD')], function (err) {
        if(err)
          reject(err); // reject because we are inside a promise
        else
          resolve(this.lastID);
      });
    });
  };

  // getAll
  this.getAll = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM course JOIN score ON course.code = score.coursecode';
      db.all(sql, [], (err, rows) => {
        if(err)
          reject(err);
        else {
          // we can use both code and course code because of the join
          const exams = rows.map(row => new Exam(row.code, row.name, row.CFU, row.datepassed, row.score, row.laude ? true : false));
          resolve(exams);
        }
      });
    });
  };

  // find
  this.find = (code) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM course C, score S\
                   WHERE C.code = S.coursecode\
                   AND C.code = ?';
      db.get(sql, [code], (err, row) => {
        if(err)
          reject(err);
        else {
          resolve(new Exam(row.code, row.name, row.CFU, row.date, row.score, row.laude));
        }
      });
    });
  }

  // afterDate
  this.afterDate = (date) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM course C, score S\
                   WHERE C.code = S.coursecode\
                   AND S.datepassed > DATE(?)';
      db.all(sql, [date.format('YYYY-MM-DD')], (err, rows) => {
        if(err)
          reject(err);
        else {
          const exams = rows.map(row => new Exam(row.code, row.name, row.CFU, row.datepassed, row.score, row.laude));
          resolve(exams);
        }
      });
    });
  }

  //getWorst
  this.getWorst = (num) => {
    // write something clever
    return new Promise((resolve, reject) => {
      if(num <= 0) {
        reject(num);
      }
      const sql = 'SELECT * \
                   FROM course C, score S\
                   WHERE C.code = S.coursecode\
                   ORDER BY S.score ASC';
      db.all(sql, [], (err, rows) => {
        if(err)
          reject(err);
        else {
          const worst = rows.slice(0, num).map(row => new Exam(row.code, row.name, row.CFU, row.datepassed, row.score, row.laude));
          resolve(worst);
        }
      });
    });
  };
}


/* TESTING */

async function main() {
  const examDb = new ExamList();

  const wa1 = new Exam('01TXYOV', 'Web Application I', 6, dayjs('2022-06-07'), 30, true);
  const softeng = new Exam('04GSPOV', 'Software Engineering I', 6, dayjs('2022-07-02'), 28);
  
  // console.log("Test add\n");
  // const id = await examDb.add(softeng);
  // console.log(id);

  console.log("Test getAll\n");
  const myExams = await examDb.getAll();
  console.log(myExams.toString());

  console.log("Test find\n");
  const wa1_2 = await examDb.find('01TXYOV');
  console.log(wa1_2.toString());

  console.log("Test afterDate\n");
  const examsAfter = await examDb.afterDate(dayjs('2022-06-01'));
  console.log(examsAfter.toString());

  console.log("Test getWorst\n");
  const worst = await examDb.getWorst(2);
  console.log(worst.toString());
}

main();