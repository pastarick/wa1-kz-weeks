import {Button, Form} from 'react-bootstrap';
import {useState} from 'react';
import dayjs from 'dayjs';

function ExamForm(props) {
  // NB it's not recommended to initialize a state with props but for the form is allowed
  const [code, setCode] = useState(props.exam ? props.exam.code : '');
  const [course, setCourse] = useState(props.exam ? props.exam.name : '');
  const [score, setScore] = useState(props.exam ? props.exam.score : 30);
  const [date, setDate] = useState(props.exam ? props.exam.date : dayjs());

  /*
  The default behavior of the form is to reload the page on submit, but this resets all the page to default values
  -> we need to handle the submission in order to continue the state of the app
  * */
  const handleSubmit = (event) => {
    // to avoid the reloading of the page
    event.preventDefault();
    // the fields of the form define the state of the form object
    // NB: here we need to perform some validation
    const exam = {code: code, name: course, score: score, date: dayjs(date)};
    if (props.exam === undefined) {
      props.addExam(exam);
    } else {
      props.editExam(exam);
    }

  };

  return (
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Course Code</Form.Label>
          <Form.Control type="text" required minLength={5} maxLength={7} value={code}
                        onChange={event => setCode(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Course Name</Form.Label>
          <Form.Control type="text" required value={course} onChange={event => setCourse(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Score</Form.Label>
          <Form.Control type="number" min={18} max={31} value={score} onChange={event => setScore(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" value={date.format('YYYY-MM-DD')} onChange={event => setDate(event.target.value)}/>
        </Form.Group>

        <Button variant="primary" type="submit">Save</Button>
        &nbsp;
        <Button variant="danger" onClick={props.cancel}>Cancel</Button>
        <br/>
      </Form>)
}

export default ExamForm;