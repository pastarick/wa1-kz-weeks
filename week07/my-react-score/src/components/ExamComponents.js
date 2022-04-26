import {Col, Table, Button, Form} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useState} from "react";
import dayjs from "dayjs";

function ExamScores(props) {
    return (
        <Col>
            <ExamTable exams={props.exams} deleteExam={props.deleteExam} addExam={props.addExam}></ExamTable>
        </Col>
    );
}

function ExamTable(props) {

    //this state doesn't hold data, but control information
    const [showForm, setShowForm] = useState(false);

    return (<>
            <Table striped>
                <thead>
                <tr>
                    <th>Code</th>
                    <th>Exam</th>
                    <th>Score</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.exams.map((ex) => <ExamRow exam={ex} key={ex.code} deleteExam={props.deleteExam}/>)
                }
                </tbody>
            </Table>

            {showForm
                ?
                <ExamForm addExam={props.addExam}/>
                :
                <Button variant="success" onClick={() => setShowForm(true)}>Add</Button>
            }
        </>
    );
}

function ExamRow(props) {
    return (
        <tr><ExamData exam={props.exam}/><ExamActions deleteExams={props.deleteExam} exam={props.exam}/></tr>
    );
}

function ExamData(props) {
    return (
        <>
            <td>{props.exam.code}</td>
            <td>{props.exam.name}</td>
            <td>{props.exam.score}</td>
            <td>{props.exam.date.format('YYYY-MM-DD')}</td>
        </>
    );
}

function ExamActions(props) {
    return <td><Button variant='danger' onClick={() => props.deleteExams(props.exam.code)}><i className='bi bi-trash3'></i></Button></td>
}

function ExamForm(props) {

    // NEED 3 things: component, state and onChange

    const [code, setCode] = useState('');
    const [course, setCourse] = useState('');
    const [score, setScore] = useState(30);
    const [date, setDate] = useState(dayjs());

    return (
        <Form>
            <Form.Group>
                <Form.Label>Course code</Form.Label>
                <Form.Control type="text" value={code} onChange={event => setCode(event.target.value)} placeholder="Course code"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Course name</Form.Label>
                <Form.Control type="text" value={course} onChange={event => setCourse(event.target.value)} placeholder="Course name"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Course score</Form.Label>
                <Form.Control type="number" value={score} onChange={event => setScore(event.target.value)} placeholder="Course score"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Exam date</Form.Label>
                <Form.Control type="date" value={date.format('YYYY-MM-DD')} onChange={event => setDate(dayjs(event.target.value))}/>
            </Form.Group>

            <Button type="submit">Submit</Button>
        </Form>
    );
}

export default ExamScores;