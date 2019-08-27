// Create a client instance
// var client = new Paho.MQTT.Client(location.hostname, Number(location.port), "clientId");
// client=new Paho.Client()
var btnconnect=document.getElementById("btn-connect");
var btnpublish=document.getElementById("btn-publish");
var wordtext=document.getElementById("word")


 var client=new Paho.Client("broker.hivemq.com",8000,"clientId");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
// client.connect({onSuccess:onConnect});


// called when the client connects

function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("World");
//   message = new Paho.Message("Hello World!!!!!!!!!!!");
//   message.destinationName = "World";
//   client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
}
btnconnect.addEventListener("click",function(e){
    e.preventDefault();
    console.log("connect button.....")
    client.connect({onSuccess:onConnect});
})
btnpublish.addEventListener("click",function(e){
    e.preventDefault();
    console.log("publish button.....")
    message = new Paho.Message(document.getElementById("word").value);
    message.destinationName = "World";
    client.send(message);
})
// wordtext.addEventListener("input",function(e){
//     e.preventDefault();
//     console.log("publish button.....")
//     message = new Paho.Message(document.getElementById("word").value);
//     message.destinationName = "World";
//     client.send(message);
    
// })
