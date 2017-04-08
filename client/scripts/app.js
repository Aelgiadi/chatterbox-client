// YOUR CODE HERE:
console.log(window)

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
  		contentType: 'application/json', 
  		success: function (data) { 
  			console.log('Message sent successfully')
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
	  	var data = data.results;
	  	var renderobj = {}
	  	var room;
	  	for(var i = 0; i < data.length; i++){
	  		console.log(data);
	  		app.renderMessage(data[i]);

			room = data[i].roomname

			renderobj[room] = room;

	  	}

	  	for ( var key in renderobj) {

	  		app.renderRoom(renderobj[key]);
	  	}
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
	$('#chats').append('<div class="message"><div class="username">'+message.username+'</div><div class="chat">'+message.text+'</div></div>');
	// $('#main').append('<div class="username">'+message.username+'</div>')
}

app.renderRoom = function(string) {

	$('#roomSelect').append('<ul><a href="#" class="room">'+string+'</a></ul>');

}

app.handleUsernameClick =function() {
}


app.handleSubmit = function() {
	// find your name
	//set your name into some object 
	//grab text and 
	var obj = {
		username: window.location.search,
		text: $('#textFeild').val()
	}

	app.send(obj);
}



// var search = function() {
// 	var messagesArray = app.fetch();
// 	for (var i = 0; i < messagesArray.results.length; i++){

// 		app.renderMessage(i);
// 	}
// }

// search();



