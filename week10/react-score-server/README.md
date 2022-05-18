# `react-score-server`

The `react-score-server` is the server-side app companion of `react-scores`. It presents some APIs to perform CRUD operations on a student's university exams.

## APIs
Hereafter, we report the designed HTTP APIs, also implemented in the project.

### __List all the exams__

URL: `/api/exams`

HTTP Method: GET

Description: Get all the exams that the student has already passed

Request body: _None_

Response: `200 OK` (success) or `500 Internal Server Error`
(generic error)

Response body (a list of exams):
```
[
    {
        "code": "01abc",
        "name": "Web Applications I",
        "credits": 6,
        "score": 30,
        "laude": true,
        "date": "2022-06-03"
    },
    {
        "code": "02def",
        "name": "How to pass exams",
        "credits": 3,
        "score": 18,
        "laude": false,
        "date": "2021-09-15"
    },
    ...
]
```

### __Create a new exam__

URL: `/api/exams`

HTTP Method: POST

Description: Add a new passed exam

Request body:
<br/>_NB: the name and the credits can be retrieved from the course table using the exam code_
```
{
        "code": "01abc",
        "score": 30,
        "laude": true,
        "date": "2022-06-03"
}
```

Response: `201 Created` (success) or `503 Service Unavailable`
(generic error) or `422 Unprocessable Entity`

Response body: _None_


### __Update an exam__

URL: `/api/exams/<exam_code>`

HTTP Method: PUT

Description: Update a passed exam

Example: `/api/exams/01abc`

Request body:
<br/>_NB: the name and the credits can be retrieved from the course table using the exam code_
```
{
        "code": "01abc",
        "score": 30,
        "laude": true,
        "date": "2022-06-03"
}
```

Response: `200 OK` (success) or `503 Service Unavailable`
(generic error) or `422 Unprocessable Entity`

Response body: _None_

### __Delete an exam__

URL: `/api/exams/<exam_code>`

HTTP Method: DELETE

Description: Delete a passed exam given its code in the URL

Example: `/api/exams/01abc`

Request body: _None_

Response: `204 No Content` (success) or `503 Service Unavailable`
(generic error) or `404 Not Found`

Response body: _None_