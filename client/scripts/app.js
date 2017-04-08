$(document).ready(function() {

var app = {
	server: "http://parse.sfm8.hackreactor.com/chatterbox/classes/messages",
}; 

var ESC_MAP = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
	};

function escapeHTML(s, forAttribute) {
	    return s.replace(forAttribute ? /[&<>'"]/g : /[&<>]/g, function(c) {
	        return ESC_MAP[c];
	    });
	}


app.init = function() { 

	//var roomName = escapeHTML(messages.roomname)

	$('.username').on('click', app.handleUsernameClick);
	$('#send').on('click',function(e){
		// console.log("WTFFFFF");
		 app.handleSubmit();
	});
	//$('#roomSelect').on('click', app.callOnlytheRoom);
	// $('#send').on('submit click', app.handleSubmit());
	app.fetch();
		setInterval(function(){
		app.clearMessages();
		app.fetch()}, 5000);
}


app.send = function(message) {

	console.log("The Message", message)
	$.ajax({ 

		url:this.server,
		type: 'POST',
		data: JSON.stringify(message),
  		contentType: 'application/json', 
  		success: function (data) { 
  			console.log('Message sent successfully', data);
 		 },
  			error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    		console.error('chatterbox: Failed to send message', data);
 		 }
 		})

	
}
var renderobj = {};
app.fetch = function() {
	$.ajax({
	  url: this.server, 
	  type: 'GET',
	  data: {
	  	order: '-createdAt',
	  },
	  success: function(data) {
	  	var data = data.results;
	  	
	  	var room;

	  	

	  	for(var i = 0; i < data.length; i++){
	  		// console.log(data);
	  		app.renderMessage(data[i]);

			room = data[i].roomname
			// if ( renderobj[room] = data[i].roomname) {
			// 	continue;
			// }
			renderobj[room] = room;
			app.renderRoom(renderobj[room]);
	  	}
	  	

	  }

	  // data: 
	  // success: success,
	  // dataType: dataType
	});
}

app.clearMessages = function() {	

	$('#chats').empty();
	$('#roomSelect').empty();
}

app.renderMessage = function(message) {
	// console.log("rendering message:",message.username, message.text);
	// message.username = "OVERRIDE";
	// message.text = "OVERRIDE FROM RENDERMESSAGE FUNCTION";
	
	var messages = escapeHTML(message.text)
	var usernames = escapeHTML(message.username)
	var roomName = escapeHTML(message.roomname)

	$('#chats').append('<div class="'+roomName+'"><div class="username">'+usernames+'</div><div class="chat">'+messages+'</div></div>');
	// $('#main').append('<div class="username">'+message.username+'</div>')
}

app.renderRoom = function(string) {

	// string = 'OVERRIDE RENDEROOM FUNCTION';
		

	// .

	$('#roomSelect').append('<option value="'+string+'">'+string+'</option>');

}



app.handleUsernameClick =function() {
}

app.callOnlytheRoom = function() {

	//var roomName = $('#roomSelect').val();

	//$('#chats').DOSOMEFUNCTION("'"+roomName"'");
}


app.handleSubmit = function() {
	// find your name
	//events.stopPropagation(); 
	
	//set your name into some object 
	//grab text and 
	console.log('hi');

	var message = $('.newtext').val();

	console.log("message", message)
	var name = window.location.search.slice(10);

	var obj = {
		username: name,
		text: message,
		roomname: 'lobby'}
		
	console.log("message object", obj)
	
	app.send(obj);
}


app.init();
})



//app.init();

// var search = function() {
// 	var messagesArray = app.fetch();
// 	for (var i = 0; i < messagesArray.results.length; i++){

// 		app.renderMessage(i);
// 	}
// }

// search();



