// YOUR CODE HERE:


var app = {
	server: "http://parse.sfm8.hackreactor.com/chatterbox/classes/messages",
}; 


app.init = function() { 

$('.username').on('click', app.handleUsernameClick());
$('#send .submit').on('submit', app.handleSubmit());

}


app.send = function(message) {


	$.ajax({ 

		url:this.server,
		type: 'POST',
		data: JSON.stringify(message),
  		contentType: 'application/json', success: function (data) { console.log('chatterbox: Message sent');
 		 },
  			error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    		console.error('chatterbox: Failed to send message', data);
 		 }
 		})

	
}

app.fetch = function() {
	$.ajax({
	  url: this.server, 
	  type: 'GET',
	  contentType: 'application/json',
	  success: function(data) {
	  	console.log(data);
	  }

	  // data: 
	  // success: success,
	  // dataType: dataType
	});
}

app.clearMessages = function() {	
	$('#chats').empty();
}

app.renderMessage = function(message) {
	$('#chats').append('<div class="username">'+message.username+'</div>');
	$('#main').append('<div class="username">'+message.username+'</div>')

}

app.renderRoom = function(string) {

	$('#roomSelect').append('<div class= '+string+'>'+string+'</div>')

}

app.handleUsernameClick =function() {



}


app.handleSubmit = function() {


}








