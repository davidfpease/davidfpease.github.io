drift.on('ready', function (api, payload) {
  // interact with the api here
  drift.on("startConversation", function (data) {
    console.log("User started a new conversation " + data.conversationId);
    let id = data.conversationId;

    $.ajax({
      url: `https://driftapi.com/conversations/${id}/messages`,
      type: "POST",
      data: {
        "type": "chat",
        "body": "test",
        "accessToken": "IgGOsxA2AdB7RqHXkABs4IxDykEfSZvj",
        
  },
      success: function (result) {
        console.log(result);
      }
    });



  });

  //wait for a user to enter text.  
  //immediately reply with "I'm on my way!  While you wait, would you like to hear a dad joke?"
  //add a button to retrieve data from dajokes.
  //once retrieved add it to the convo
  //ask if they want another one


  
})