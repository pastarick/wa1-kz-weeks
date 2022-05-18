"use strict";

const express = require('express');
const morgan = require('morgan');
const dao = require('./dao');
const {response} = require("express");

// Init express
const app = express();
const PORT = 3001; // because react uses 3000


// Set up the middlewares
app.use(morgan('dev')); // for logging
app.use(express.json()); // for serializing and deserializing the body

/*************** APIs ***************/

//GET all exams
app.get('/api/exams', (request, response) => {
  dao.listExams()
      .then(exams => response.json(exams.map(e => {
        e.date = e.date.format('YYYY-MM-DD');
        return e;
      })))// resolve promise
      .catch(() => response.status(500).end()); // reject promise
});

//PUT a new exam
app.put('/api/exams/:code', async (res, req) => {
  const examToUpdate = req.body;

  // verify that the code in the body matched the code in the URL
  if(req.params.code === examToUpdate.code) {
    try {
      await dao.updateExam(examToUpdate);
      res.status(200).end();
    }
    catch(error) {
      res.status(503).json({error: `Database error while updating ${examToUpdate.code}`}).end();
    }
  }
  else {
    res.status(503).json({error: `Wrong code in the request body (${examToUpdate.code})`})
  }

  req.params.code;
})


// Start the server
app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));