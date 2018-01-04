const twilio = require('twilio');
const MessagingResponse = twilio.twiml.MessagingResponse;
const fs = require('fs');

var rsvpData = require('../data/rsvp-data.json');

exports.create = function(request, response){
  
  const sender = request.body.From;
  const body = request.body.Body;
  var responseMessage;

  console.log("Sender: " + sender + ", Body: " + body);

  if(body == 1){
    // Murray
    responseMessage = createResponse('Murray', 'Bill Cherry Expo Center', '8:00 am', 'January 23rd, 2018');
    saveData(sender, body);
  }else if(body == 2){
    // Hopkinsville
    responseMessage = createResponse('Hopkinsville', 'James Bruce Convention Center', '8:00 am', 'January 25th, 2018');
    saveData(sender, body);
  }else if(body == 3){
    // Morganfield
    responseMessage = createResponse('Morganfield', 'Morganfield Hutson store', '8:00 am', 'January 30th, 2018');
    saveData(sender, body);
  }else if(body == 4){
    // Evansville
    responseMessage = createResponse('Evansville', 'Vanderburgh 4-H Center', '8:00 am', 'February 1st, 2018');
    saveData(sender, body);
  }else{
    // Invalid message
    responseMessage = "To RSVP for an upcoming clinic, please respond with a '1' for Murray, '2' for Hopkinsville, '3' for Morganfield, or '4' for Evansville.";
  }

  const twiml = new MessagingResponse();
  
  twiml.message(responseMessage);

  response.writeHead(200, {'Content-Type': 'text/xml'});
  response.end(twiml.toString());
  
};

function createResponse(location, locationDescription, startTime, eventDate){
  return 'Thank you for your RSVP to the Huston Spring Clinic at ' + location + '. The event will be on ' + eventDate + ' at the ' + locationDescription + ' starting at ' + startTime + '. We will send a text reminder to this number before the event.';
}

function saveData(sender, body){

  rsvpData.data[body - 1].push(sender);

  fs.writeFile('data/rsvp-data.json', JSON.stringify(rsvpData), (err) => {
    if (err) throw err;
    console.log('The data was saved.');
  });

}