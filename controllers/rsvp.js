const twilio = require('twilio');
const MessagingResponse = twilio.twiml.MessagingResponse;
const fs = require('fs');

var rsvpData = require('../data/rsvp-data.json');

exports.process = function(request, response){
  
  const sender = request.body.From;
  const body = request.body.Body;
  var responseMessage, entryData, entryDataIndex, entryFound;

  var locationResponse = "To RSVP for an upcoming clinic, please respond with a " + 
                         "'1' for Murray, KY (Jan. 23rd, 2018 at the Bill Murray Expo Center); " + 
                         "'2' for Hopkinsville (Jan. 25th, 2018 at the James Bruce Convention Center); " + 
                         "'3' for Morganfield (Jan. 30th, 2018 at the Morganfield Hutson Store); or " + 
                         "'4' for Evansville (Feb. 1st, 2018 at the Vanderburgh 4-H Center).";

  var guestCountResponse = "Please let us know how many people you are bringing (including yourself). " + 
                           "This will ensure that we order enough food for all of our guests. " + 
                           "You can send an estimate or respond later if you don't have a count at this time. " + 
                           "Please respond only with a number.";

  console.log("Sender: " + sender + ", Body: " + body);
  
  // stage 1: entry made and email saved
  // stage 2: location number saved
  // stage 3: guest count saved, rsvp completed

  // find entry in rsvp data and store in local variable
  findEntry();

  if(body.toLowerCase() == 'rsvp'){
    
    if(entryFound){
      // already saved email, need to find where they are in the process and resend information

      if(entryData.stage == 1){
        // asked for location

        responseMessage = locationResponse;

      }else if(entryData.stage == 2){
        // asked for guest count

        responseMessage = guestCountResponse;

      }else if(entryData.stage == 3){
        // rsvp completed

        responseMessage = createThanksResponse();

      }else{
        // something unexpected, ask for location

        responseMessage = locationResponse;

      }

    }else{
      
      rsvpData.data[0].push({
        sender: sender,
        stage: 1
      });

      // save data to file
      saveData();
      
      responseMessage = locationResponse;
    
    }
    
  }else{
    // body != 'rsvp'

    if(entryFound){

      // entry found, check stage number
      if(entryData.stage == 1){
        // asked for location

        if(body == 1){

          // Murray
          entryData.location = 1;
          entryData.stage = 2;

          // save data to local variable
          saveLocationData(sender, 1);

          // save data to file
          saveData();

          responseMessage = guestCountResponse;

        }else if(body == 2){

          // Hopkinsville
          entryData.location = 2;
          entryData.stage = 2;

          // save data to local variable
          saveLocationData(sender, 2);

          // save data to file
          saveData();

          responseMessage = guestCountResponse;

        }else if(body == 3){

          // Morganfield
          entryData.location = 3;
          entryData.stage = 2;

          // save data to local variable
          saveLocationData(sender, 3);

          // save data to file
          saveData();

          responseMessage = guestCountResponse;

        }else if(body == 4){

          // Evansville
          entryData.location = 4;
          entryData.stage = 2;

          // save data to local variable
          saveLocationData(sender, 4);

          // save data to file
          saveData();

          responseMessage = guestCountResponse;

        }else{

          // invalid message body, resend locations
          responseMessage = locationResponse;

        }
        

      }else if(entryData.stage == 2){
        // asked for number of people

        if(typeof body == 'number'){

          // save guest count
          entryData.guestCount = body;
          entryData.stage = 3;

          // save data to file
          saveData();

          responseMessage = createThanksResponse();

        }else{

          // invalid message body, resend guest count question
          responseMessage = guestCountResponse;

        }

      }else{
        // rsvp completed

        responseMessage = createThanksResponse();

      }

    }else{

      // no entry found, add new sender entry
      rsvpData.data[0].push({
        sender: sender,
        stage: 1
      });

      // save data to file
      saveData();

      responseMessage = locationResponse;

    }

  }
  
  const twiml = new MessagingResponse();
  
  twiml.message(responseMessage);

  response.writeHead(200, {'Content-Type': 'text/xml'});
  response.end(twiml.toString());

  function findEntry(){

    rsvpData.data[0].forEach((element, index) => {
  
      if(sender == element.sender){
  
        entryData = element;
        entryDataIndex = index;
        entryFound = true;
  
      }
  
    });
  
  }

  function createThanksResponse(){

    var resLocation, resEventData, resLocationDescription;
    var resStartTime = '8:00 am';
  
    if(entryData.location == 1){
  
      resLocation = 'Bill Cherry Expo Center';
      resLocationDescription = '2101 College Farm Road, Murray, KY 42071';
      resEventData = 'January 23rd';
  
    }else if(entryData.location == 2){
  
      resLocation = 'James Bruce Convention Center';
      resLocationDescription = '303 Conference Center Drive, Hopkinsville, KY 42240';
      resEventData = 'January 25th';
  
    }else if(entryData.location == 3){
  
      resLocation = 'Morganfield Hutson Store';
      resLocationDescription = '1540 State Route 130 S., Morganfield, KY 42437';
      resEventData = 'January 30th';
  
    }else if(entryData.location == 4){
  
      resLocation = 'Vanderburgh 4-H Center';
      resLocationDescription = '201 E. Booneville-New Harmony Road, Evansville, IN 47725';
      resEventData = 'February 1st';
  
    }
  
    return 'Thank you for your RSVP to the Huston Spring Clinic at ' + resLocation + '. The event will be on ' + resEventData + ' at the ' + resLocationDescription + ' starting at ' + resStartTime + '. We will send a text reminder to this number before the event.';
  
  }
  
  function saveLocationData(phoneNum, locationNum){
    
    rsvpData.data[locationNum].push(phoneNum);
  
  }
  
  function saveData(){
  
    if(entryDataIndex){
  
      // update entry in local variable
      rsvpData.data[entryDataIndex] = entryData;
  
    }
  
    // write updated data to file
    fs.writeFile('data/rsvp-data.json', JSON.stringify(rsvpData), (err) => {
      if (err) throw err;
      console.log('The JSON data was saved.');
    });
  
  }
  
};

