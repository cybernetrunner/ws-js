var server = "http://127.0.0.1:8080/ws"

var name = '';
var counter = 0;

function init() {
    $('#form').css('display', 'block');
}

function draw(data) {
    $('#x').prop('value', data.x);
    $('#y').prop('value', data.y);
    $('#answer').prop('value', data.answer);
}

function send() {
    counter++;
    var data = {
        name: name,
        counter: counter,
        x: $('#x').val(),
        y: $('#y').val(),
        answer: 0,
    }
    window.socket.send(JSON.stringify(data))
}

function onStart() {
    var socket = new WebSocket(server);
    name = $('#name').val();

    socket.onopen = function() {
        init();
    };
    socket.onmessage = function(event) {
        draw(JSON.parse(event.data));
    };

    window.socket = socket;
}