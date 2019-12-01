"use strict";

// initialize variables and display
const http = new XMLHttpRequest()
let responseData = [];

// listen for and capture newly entered name
let inputName = document.querySelector('input');
inputName.onkeypress = function(event) {
  let name = inputName.value.trim();
  if (name.length == 0 || event.key !== 'Enter') {
    if (event.key === 'Enter') { 
      alert('Please enter a name.');
      inputName.value = '';
    }
    return;
  }
  inputName.value = '';
  getNames(name);
}

// get all names from database
function getNames(name) {
  http.open('GET', location + 'api/names');
  http.onreadystatechange = function() {
    if (http.readyState == XMLHttpRequest.DONE && http.status === 200) {
      responseData = JSON.parse(http.responseText);
      responseData.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
      updateResponseArea(responseData,name);
    } else if (http.readyState === XMLHttpRequest.DONE) {
      alert('An error occurred when getting names from the database.');
    }
  }
  http.send();
}

// update the response area with new data from database
function updateResponseArea(responseData,name) {

  let liList = document.querySelectorAll('li');
  for (let i = 0; i < liList.length; i++) {
    liList[i].parentElement.removeChild(liList[i]);
  }
  let responseHead = document.querySelector('#responseHead');
  let responseArea = document.querySelector('#responseArea');
  if (responseData.length === 0) {
    responseHead.textContent = 'No items in database.'
  } else {
    responseHead.textContent = 'Cloudant Database contents:'
    for (let i = 0; i < responseData.length; i++ ) {
      if(responseData[i].name == name){

        let li = document.createElement('LI');
        let li1 = document.createElement('LI');
        let li2 = document.createElement('LI');
        let li3 = document.createElement('LI');
        let li4 = document.createElement('LI');
        let li5 = document.createElement('LI');

        li.textContent = responseData[i].mobile_number;
        li1.textContent = responseData[i].minutes;
        li2.textContent = responseData[i].internet;
        li3.textContent = responseData[i].sms;
        li4.textContent = responseData[i].roaming;
        li5.textContent = responseData[i].Ad;

        responseArea.appendChild(li);
        responseArea1.appendChild(li1);
        responseArea2.appendChild(li2);
        responseArea3.appendChild(li3);
        responseArea4.appendChild(li4);
        responseArea5.appendChild(li5);
      }
    }
  }
}

// sanitize inputs to prevent xss
function sanitizeInput(str) {
  return String(str).replace(/&(?!amp;|lt;|gt;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}