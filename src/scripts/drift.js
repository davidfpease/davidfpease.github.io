const j = "QeH";


drift.on('ready', function (api, payload) {
  // interact with the api here
  drift.on("startConversation", function (data) {
    console.log("User started a new conversation " + data.conversationId);
    let id = data.conversationId;
    let authorizationToken = "Bearer FfhkCAX2p2kYSJ4ku1B4NHJIrIy6y"+j;

    const settings = {
      "url": `https://driftapi.com/conversations/${id}/messages`,
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer  FfhkCAX2p2kYSJ4ku1B4NHJIrIy6y"+j
      },
      "data": JSON.stringify({
        "type": "chat",
        "body": "Hi!  I've sent a note to my human.  He'll jump in as soon as possible!  In the meantime"+
        " would you like to hear a joke?",
        "buttons": [
          {
            "value": "Yes please!",
            "label": "Yes please!",
            "type": "reply",
            "reaction": {
              "type": "replace",
              "message": "OK, one second while I think of a good one..."
            }
          }]
      }),
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });

  });

  // drift.on("startConversation", function (data){
  //   let id = data.conversationId;
  //   var settings = {
  //     "url": `https://h9yl5upfuk.execute-api.us-east-1.amazonaws.com/test/helloworld?conversationId=${id}`,
  //     "method": "GET",
  //     "timeout": 0,
  //   };

  //   $.ajax(settings).done(function (response) {
  //     console.log(response);
  //   });
  // })

  window.drift.on("conversation:buttonClicked", function (data) {
    console.log("user clicked a button with text: " + data.buttonBody);
    let authorizationToken = "Bearer FfhkCAX2p2kYSJ4ku1B4NHJIrIy6y" + j;
    //fetch dad joke
    let id = data.conversationId;

    const settings = {
      "url": "https://www.icanhazdadjoke.com",
      "method": "GET",
      "headers": {
        "accept": "application/json",
      }
    }

    $.ajax(settings).done(function(response){
      console.log(response);
      
      //send the joke as a response, add "do you want another one?" and a button
      const settings = {
        "url": `https://driftapi.com/conversations/${id}/messages`,
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json",
          "Authorization": "Bearer  FfhkCAX2p2kYSJ4ku1B4NHJIrIy6y" + j
        },
        "data": JSON.stringify({
          "type": "chat",
          "body": response.joke,
          "buttons": [
            {
              "value": "Yes please!",
              "label": "Yes please!",
              "type": "reply",
              "reaction": {
                "type": "replace",
                "message": "OK, one second while I think of a good one..."
              }
            }]
        }),
      };

      $.ajax(settings).done(function (response) {
        const settings2 = {
          "url": `https://driftapi.com/conversations/${id}/messages`,
          "method": "POST",
          "timeout": 0,
          "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer  FfhkCAX2p2kYSJ4ku1B4NHJIrIy6y" + j
          },
          "data": JSON.stringify({
            "type": "chat",
            "body": "Want to hear another one?",
            "buttons": [
              {
                "value": "Yes please!",
                "label": "Yes please!",
                "type": "reply",
                "reaction": {
                  "type": "replace",
                  "message": "OK, one second while I think of a good one..."
                }
              }]
          }),
        };



        $.ajax(settings2).done(function (response) {
          console.log(response);
        });
      });


      
    }).fail(function(response, status, error){
      //Send a message saying sorry
      const settings = {
        "url": `https://driftapi.com/conversations/${id}/messages`,
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json",
          "Authorization": "Bearer  FfhkCAX2p2kYSJ4ku1B4NHJIrIy6y" + j
        },
        "data": JSON.stringify({
          "type": "chat",
          "body": "Sorry!  I can't think of a joke right now.  But please hang out for a moment or two while I summon my human."+
          " See if you can solve the cube!",
        }),
      };

      $.ajax(settings).done(function (response) {
        console.log(response);
      });
      
    })


  });

  // drift.on("message:sent", function(data){
  //   let authorizationToken = "Bearer FfhkCAX2p2kYSJ4ku1B4NHJIrIy6y"+j;
  //   console.log("Message sent: ");
  //   console.log(data);

  //   $.ajax({
  //     url: `https://driftapi.com/conversations/${data.conversationId}/messages`,
  //     beforeSend: function (request) {
  //       request.setRequestHeader("authorization", authorizationToken);
  //     },
  //     type: "POST",
  //     contentType: "application/json",
  //     //processData: false,
  //     data: JSON.stringify({
  //       "type": "CHAT",
  //       "body": "test reply when a converstaion is replied to",
  //     }),
  //     success: function (result) {
  //       console.log(result);
  //     }
  //   });

  // })

  //wait for a user to enter text.  
  //immediately reply with "I'm on my way!  While you wait, would you like to hear a dad joke?"
  //add a button to retrieve data from dajokes.
  //once retrieved add it to the convo
  //ask if they want another one


  
})