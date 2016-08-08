function ChatCtrl($scope, $sce, ChatSocket) {
  'ngInject';

  const TYPING_TIMER_LENGTH = 400; // ms

  let ctrl = this;
  ctrl.username = null;
  ctrl.connected = false;
  ctrl.typing = false;

  ctrl.messages = [{
  	username: 'person',
  	message: 'hey durr'
  },{
  	username: 'person',
  	message: 'hey durr'
  },{
  	username: 'person',
  	message: 'hey durr'
  }];
  ctrl.message = '';
  // Log a message
/*  ctrl.log (message, options) {
    var $el = $('<li>').addClass('log').text(message);
    addMessageElement($el, options);
  }*/

/*  ctrl.addParticipantsMessage (data) {
    var message = '';
    if (data.numUsers === 1) {
      message += "there's 1 participant";
    } else {
      message += "there are " + data.numUsers + " participants";
    }
    log(message);
  }*/

  // Sets the client's username
  ctrl.setUsername = (name) => {
    ctrl.username = $sce.$sanitize(name);

    // If the username is valid
    if (ctrl.username) {
      // Tell the server your username
      ChatSocket.emit('add user', username);
    }
  }

  // Sends a chat message
  ctrl.sendMessage = (message) => {
    // Prevent markup from being injected into the message
    message = $sce.$sanitize(message);
    // if there is a non-empty message and a socket connection
    if (message && ctrl.connected) {
      ctrl.addChatMessage({
        username: ctrl.username,
        message: message
      });
      // tell server to execute 'new message' and send along one parameter
      ChatSocket.emit('new message', message);
    }
  }

  // Adds the visual chat message to the message list
  ctrl.addChatMessage = (data) => {
    ctrl.messages.push(data);
  }

  // Adds the visual chat typing message
  ctrl.addChatTyping = (data) => {
    data.typing = true;
    data.message = 'is typing';
    addChatMessage(data);
  }

  // Removes the visual chat typing message
  ctrl.removeChatTyping = () => {
    // getTypingMessages(data).fadeOut(function () {
    //   $(this).remove();
    // });
  }

  ctrl.updateTyping = () => {
    if (ctrl.connected) {
      if (!ctrl.typing) {
        ctrl.typing = true;
        ChatSocket.emit('typing');
      }
      let lastTypingTime = (new Date()).getTime();

      setTimeout(function () {
        let typingTimer = (new Date()).getTime();
        let timeDiff = typingTimer - lastTypingTime;
        if (timeDiff >= TYPING_TIMER_LENGTH && ctrl.typing) {
          ChatSocket.emit('stop typing');
          ctrl.typing = false;
        }
      }, TYPING_TIMER_LENGTH);
    }
  }

  // Socket events

  // Whenever the server emits 'login', log the login message
  ChatSocket.on('login', data => {
    ctrl.connected = true;
    // Display the welcome message
    let message = `Welcome to Socket.IO Chat – ${data}`;
    // log(message, {
    //   prepend: true
    // });
    addParticipantsMessage(data);
  });

  // Whenever the server emits 'new message', update the chat body
  ChatSocket.on('new message', data => {
    addChatMessage(data);
  });

  // Whenever the server emits 'user joined', log it in the chat body
  ChatSocket.on('user joined', data => {
    log(data.username + ' joined');
    addParticipantsMessage(data);
  });

  // Whenever the server emits 'user left', log it in the chat body
  ChatSocket.on('user left', data => {
    log(data.username + ' left');
    addParticipantsMessage(data);
    removeChatTyping(data);
  });

  // Whenever the server emits 'typing', show the typing message
  ChatSocket.on('typing', data => {
    addChatTyping(data);
  });

  // Whenever the server emits 'stop typing', kill the typing message
  ChatSocket.on('stop typing', data => {
    removeChatTyping(data);
  });

}

export default {
  name: 'ChatCtrl',
  fn: ChatCtrl
};