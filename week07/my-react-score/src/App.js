import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Container, Row, Col} from 'react-bootstrap';
import dayjs from 'dayjs';
import {ExamScores} from './components/ExamComponents';
import {useState} from "react";

const fakeExams = [
    {code: '01TYMOV', name: 'Information systems security', score: 30, date: dayjs('2022-02-01')},
    {code: '01SQJOV', name: 'Data Science and Database Technology', score: 21, date: dayjs('2021-06-15')},
    {code: '04GSPOV', name: 'Software Engineering', score: 26, date: dayjs('2022-06-04')}
];

//OBS: the exams represent the state
/* since we need also the length (in addition to the list), it's more convenient to hold the state in App.js,
   because it's always better to hold the state to the upper component which accesses it
 - if we put the state in ExamTable (for example) we need to initialize everything through the props, which is
   always better not to do
 - when the data will come from a DB, the server is reached through App.js, so it's better to leave here the declaration
   of the exam list
 */

function App() {
    const [exams, setExams] = useState(fakeExams);
    return (
        <Container className='App'>
            <Row>
                <Col>
                    <h1>My Exams ({exams.length})</h1>
                </Col>
            </Row>
            <Row>
                <ExamScores exams={exams}></ExamScores>
            </Row>
        </Container>
    );
}

export default App;
