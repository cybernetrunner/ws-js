'use strict';

/* Блок с идентификаторами */
const SERVER_ADDRESS = 'ws://localhost:8080/ws';
let socket = null;
let counter = 0;

/* Блок с элементами */
const [startButton] = document.getElementsByName('startButton');
const [sendButton] = document.getElementsByName('sendButton');
const [userNameInput] = document.getElementsByName('userName');
const [xValueInput] = document.getElementsByName('xValue');
const [yValueInput] = document.getElementsByName('yValue');
const forms = document.getElementsByName('form');
const ul = document.getElementById('ul');

/* Блок со слушателями */
forms.forEach((form) =>
  form.addEventListener('click', (event) => event.stopImmediatePropagation()),
);
startButton.addEventListener('click', (event) => connect(event));
sendButton.addEventListener('click', (event) => sendData(event));

/* Блок с логикой */
function connect(event) {
  event.preventDefault();
  socket = new WebSocket(SERVER_ADDRESS);

  socket.onmessage = drawServerData;
}

// function drawServerData(serverEvent) {
//   const serverData = serverEvent.data.text()
//   console.log(serverData)
//   serverData.then(data => ul.insertAdjacentHTML('beforeend', `<li>${data}</li>`))
// }
function drawServerData(serverEvent) {
  const serverData = serverEvent.data.text()
  serverData.then(data => {
    const parsedData = JSON.parse(data); 
    ul.insertAdjacentHTML('beforeend', `<li>Name: ${parsedData.name} Number ${parsedData.number} X: ${parsedData.x} Y: ${parsedData.y} Answer: ${parsedData.answer}</li>`)
  })
}

function sendData(event) {
  event.preventDefault();

  ++counter;

  const data = {
    name: userNameInput.value,
    number: counter,
    x: Number(xValueInput.value),
    y: Number(yValueInput.value),
    answer: 0,
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {type : 'application/json'});
  socket.send(blob);
}
