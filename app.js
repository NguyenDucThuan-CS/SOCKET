
function connect(username) {
    console.log("SockJS", SockJS)
    console.log("Stomp", Stomp)

	var socket = new SockJS('http://localhost:8080/notify');
	stompClient = Stomp.over(socket);
	stompClient.connect({ username: username }, function() {
		console.log('Web Socket is connected');
		stompClient.subscribe('user/queue/notification', function(message) {
			$("#message").text(message.body);
		});
	});
}

$(function() {
	$("form").on('submit', function(e) {
		e.preventDefault();
	});
	$("#connect").click(function() {
		connect($("#username").val());
	});
	$("#send").click(function() {
		stompClient.send("/dhjo/hello", {}, $("#name").val());
	});
});