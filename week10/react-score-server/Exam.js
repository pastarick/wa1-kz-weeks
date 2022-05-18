'use strict';
const dayjs = require('dayjs');

/**
 * Constructor function for new Exam objects
 * @param {string} code course code (e.g., '01ABC')
 * @param {string} name course name
 * @param {number} credits number of credits (e.g., 6)
 * @param {string} date date of the exam, in a format parseable by dayjs()
 * @param {number} score score attained at the exam
 * @param {boolean} laude whether the score is with laude or not
 */
function Exam (code, name, credits, date, score, laude = false) {
    this.code = code;
    this.name = name;
    this.credits = credits;
    this.date = dayjs(date);
    this.score = score;
    this.laude = laude;
}
// here we give a name to the exported Exam
exports.Exam = Exam;
// here we put the Exam module among the exported modules
exports.modules = {Exam};