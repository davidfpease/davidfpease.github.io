


drift.on('ready', function (api, payload) {
  // interact with the api here

  drift.on("startConversation", function (data){
    let id = data.conversationId;
    const settings = {
      "url": `https://h9yl5upfuk.execute-api.us-east-1.amazonaws.com/test/helloworld?conversationId=${id}`+
              `&newConversation=true`,
      "method": "GET",
      "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  })

  //TODO: add response to follow on text messages from the visitor, ie. "Please be patient!"
  drift.on("message:sent", function(data){
    console.log(data);
  })

  drift.on("conversation:buttonClicked", function (data) {
    console.log("user clicked a button with text: " + data.buttonBody);
    
    //send request for dad joke to Lambda
    let id = data.conversationId;
    
    const jokeSettings = {
      "url": `https://h9yl5upfuk.execute-api.us-east-1.amazonaws.com/test/helloworld?conversationId=${id}` +
        `&dadJoke=true`,
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json",
      }
    };

    $.ajax(jokeSettings).done(function (response) {
      console.log(response);
    });
  });

})