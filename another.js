
$(document).ready(function(){
    $('#btn-connect').click(function(){
        client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt");
        client.subscribe($("#topic").val());
        console.log('connect button when clicked');
         $("#status").text("Connecting...");
         $("#status").css("background-color", "rgb(230, 230, 0)");
        client.on("connect", function(){
             $("#status").text("Successfully connected!!!!");
                console.log("success");
        });
    
        $("#btn-disconnect").click(function() {
          
                  $("#status").text("Disconnected");
                  $("#status").css("color","red")
        }
    
        $("#btn-publish").click(function() {
            var topic = $("#topic").val();
            var payload = $("#message").val();
            if (topic == "" && payload == "") {
                
            }
            else { 
                client.publish(topic,payload, function(err) {
                      if (err){
                        Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: 'There is an error!',
                          });
                    } else {
                        console.log("published")
                        Swal.fire(' topic has been published successfully!')
                        var row = $("<tr>");
                        $("<td>").text(topic).appendTo($(row));
                        $("<td>").text(payload).appendTo($(row));
                        $("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row));
                        $("#tbl-body-pub").append($(row));
    
                    }
                });
                
                
            }
    
        })
        $("#btn-subscribe").click(function() {
            var subscribe = $("#topic-sub").val();
            var topic = $("#topic").val();
            if (subscribe != topic) {
                Swal.fire({
                  type: 'error',
                  title: 'Oops...',
                  text: 'Topic is not available!',
                });
                 
            }
            else if (subscribe == topic && topic !== "") {
                client.subscribe(topic, function(err) {
                    if(err) {
                       
                        Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: 'An error occurs!',
                          });
                    } else {
                        var row = $("<tr>").attr("id", "mysub");
                        $("<td>").text(topic).appendTo($(row));
                        $("<td>").text(payload).appendTo($(row));
                        $("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row));
                        $("#tbl-body-subscribe").append($(row));
                            Swal.fire('Subscribed successfully!');
                    }
                });
                
            }
                
        });
        $("#btn-unsubsribe").click(function() {
            var topic = $("#topic").val();
            client.unsubscribe(topic, function(err) {
                if(err) {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'An error occurs!',
                        });
                } else {
                    swal.fire({
                        title: 'Confirm',
                        text: 'Are you sure you want to unsubscribe?',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: 'green'
                 });
                }
            });
    })
    
        client.on("message", function (topic, payload) {
            // console.log([topic, payload].join(": "));
            var row = $("<tr>");
            $("<td>").text(topic).appendTo($(row));
            $("<td>").text(payload).appendTo($(row));
            $("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row));
            $("#tbl-body").append($(row));
        })
      })
    });
