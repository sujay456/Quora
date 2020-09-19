class Chatengine {
  constructor(chatbox, username, userEmail) {
    this.chatbox = $(`.${chatbox}`);

    this.username = username;
    this.userEmail = userEmail;
    this.currentRoom = userEmail;

    // this is just a request to the observer/server to connnect
    // and we are using the chatserver as u can see the port is 5000
    this.socket = io.connect("http://localhost:5000");
    if (this.userEmail) {
      this.connectHandler();
    }
  }

  connectHandler() {
    let self = this;
    this.socket.on("connect", function () {
      console.log("Connection established using sockets...");

      self.socket.emit("online", {
        user_name: self.username,
        user_email: self.userEmail,
      });

      self.socket.on("up", function (data) {
        console.log("You are online", data);
      });

      self.socket.emit("join-room", {
        user_name: self.username,
        chatroom: self.userEmail,
      });
    });
    this.socket.on("user-joined", function (data) {
      console.log("You have joined ur room", data);
    });

    $(".user").click(() => {
      console.log("In the chatting engine");
      // self.socket.emit("leave", {
      //   chatroom: self.currentRoom,
      // });
      $("#chat-messages-list li").remove();
      let chatroom = $(event.target).attr("userEmail");
      self.currentRoom = chatroom;
      self.socket.emit("join-room", {
        user_name: self.username,
        chatroom: self.currentRoom,
      });

      openChat();
    });

    // sending message
    $("#message-form").submit(() => {
      event.preventDefault();
      // console.log(event);
      let message = event.target[0].value;
      console.log(message);
      event.target.reset();
      if (message != "") {
        self.socket.emit("send_message", {
          message: message,
          user_name: self.username,
          user_email: self.userEmail,
          chatroom: self.currentRoom,
        });
      }
    });

    this.socket.on("recieve-message", function (data) {
      console.log("message recived", data);
      if (
        self.currentRoom != data.user_email &&
        data.user_email != self.userEmail
      ) {
        $("audio")[0].play();
        console.log("Someone is messaging u in the background");

        let dot = '<div id="newnoti" ></div>';

        $(".notification").append(dot);

        let noty = $("<li>");

        let mssg = "New  Message from " + data.user_name;
        $.ajax({
          type: "post",
          url: `/notification/create?email=${data.user_email}`,
          data: { mssg: mssg },
          success: function (data) {
            console.log(data);
          },
          error: function (err) {
            console.log("Error", err.responseText);
          },
        });
        return;
      }

      let newMessage = $("<li>");
      let mssgType = "other animate__animated animate__backInLeft";
      console.log(data.user_email);
      if (data.user_email == self.userEmail) {
        mssgType = "mine animate__animated animate__backInUp";
      }
      let mssgdata = "<span>" + data.message + "</span>";
      newMessage.append(mssgdata);
      newMessage.addClass(mssgType);
      console.log(newMessage);

      $("#chat-messages-list").append(newMessage);
      setTimeout(() => {
        var messageBody = document.querySelector("#chat-messages-list");
        console.log("yaha dekho", messageBody.scrollTop);
        messageBody.scrollTop =
          messageBody.scrollHeight - messageBody.clientHeight;
      }, 700);
    });
  }
}
console.log($("audio"));

console.log($("#notification-list"));
