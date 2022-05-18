'use strict';

const main = async() => {
  /*NB: we cannot have an await at global level -> we need to put it into an async function*/
  const response = await fetch('http://localhost:3001/api/exams');
  if(response.ok) {
    const data = await response.text();
    document.querySelector('#result').innerText = data;
  }
    
}

main();
