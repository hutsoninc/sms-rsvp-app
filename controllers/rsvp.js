const twilio = require('twilio');
const MessagingResponse = twilio.twiml.MessagingResponse;
const fs = require('fs');

exports.create = function(request, response){
  
  const sender = request.body.From;
  const body = request.body.Body;
  var responseMessage;

  if(body == 1){
    // Murray
    responseMessage = createResponse('Murray', 'Bill Cherry Expo Center', '8:00 am');
    saveData(sender, body);
  }else if(body == 2){
    // Hopkinsville
    responseMessage = createResponse('Hopkinsville', 'Hopkinsville Hutson store', '8:00 am');
    saveData(sender, body);
  }else if(body == 3){
    // Morganfield
    responseMessage = createResponse('Morganfield', 'Morganfield Hutson store', '8:00 am');
    saveData(sender, body);
  }else if(body == 4){
    // Evansville
    responseMessage = createResponse('Evansville', 'Vanderburgh 4-H Center', '8:00 am');
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

function createResponse(location, locationDescription, startTime){
  return 'Thank you for your RSVP to the Huston Spring Clinic at ' + location + '. The event will be at the ' + locationDescription + ' starting at ' + startTime + '. We will send a text reminder to this number the day before the event.';
}

function saveData(sender, body){
  var csvFormat = sender + ',' + body + '\r\n';
  var jsonFormat = {sender: sender, body: body};

  console.log('sender: ' + sender);
  console.log('body: ' + body);

  fs.appendFile('reqData.csv', csvFormat, (err) => {
    if (err) throw err;
    console.log('The data was appended to reqData.csv.');
  });

  fs.appendFile('reqData.json', (JSON.stringify(jsonFormat) + ','), (err) => {
    if (err) throw err;
    console.log('The data was appended to reqData.json.');
  });
}