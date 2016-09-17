import { element } from 'angular';

function ChatCtrl($scope, $sce, ChatSocket) {
  'ngInject';

  const TYPING_TIMER_LENGTH = 400; // ms

  const ctrl = this;
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
  ctrl.log = (message, options) => {
    const $el = element('<li>').addClass('log').text(message);
    ctrl.addMessageElement($el, options);
  }

  ctrl.addMessageElement = (el, options) => {
    //ctrl.messages.push(el, options);
  }

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
      ChatSocket.emit('add user', name);
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
        message
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
    ctrl.addChatMessage(data);
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
      const lastTypingTime = (new Date()).getTime();

      setTimeout( () => {
        const typingTimer = (new Date()).getTime();
        const timeDiff = typingTimer - lastTypingTime;
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
    const message = `Welcome to Socket.IO Chat – ${data}`;
    // ctrl.log(message, {
    //   prepend: true
    // });
    ctrl.addParticipantsMessage(data);
  });

  // Whenever the server emits 'new message', update the chat body
  ChatSocket.on('new message', data => {
    ctrl.addChatMessage(data);
  });

  // Whenever the server emits 'user joined', log it in the chat body
  ChatSocket.on('user joined', data => {
    ctrl.log(data.username + ' joined');
    ctrl.addParticipantsMessage(data);
  });

  // Whenever the server emits 'user left', log it in the chat body
  ChatSocket.on('user left', data => {
    ctrl.log(data.username + ' left');
    ctrl.addParticipantsMessage(data);
    ctrl.removeChatTyping(data);
  });

  // Whenever the server emits 'typing', show the typing message
  ChatSocket.on('typing', data => {
    ctrl.addChatTyping(data);
  });

  // Whenever the server emits 'stop typing', kill the typing message
  ChatSocket.on('stop typing', data => {
    ctrl.removeChatTyping(data);
  });

}

export default {
  name: 'ChatCtrl',
  fn: ChatCtrl
};