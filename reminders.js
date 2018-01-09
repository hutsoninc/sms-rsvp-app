require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

var client = require('twilio')(accountSid, authToken);

var rsvpData = require('./data/rsvp-data.json');

exports.send = function(locationNumber){

  var location, eventDate, eventAddress;
  var startTime = '8:00 am';

  if(locationNumber == 1){

    location = 'Bill Cherry Expo Center';
    eventAddress = '2101 College Farm Road, Murray, KY 42071';
    eventDate = 'January 23rd';

  }else if(locationNumber == 2){

    location = 'James Bruce Convention Center';
    eventAddress = '303 Conference Center Drive, Hopkinsville, KY 42240';
    eventDate = 'January 25th';

  }else if(locationNumber == 3){

    location = 'Morganfield Hutson Store';
    eventAddress = '1540 State Route 130 S., Morganfield, KY 42437';
    eventDate = 'January 30th';

  }else if(locationNumber == 4){

    location = 'Vanderburgh 4-H Center';
    eventAddress = '201 E. Booneville-New Harmony Road, Evansville, IN 47725';
    eventDate = 'February 1st';
    
  }

  var dataArray = rsvpData.data[locationNumber];

  dataArray.forEach(el => {
    client.messages.create({
      to: el,
      from: twilioPhoneNumber,
      body: 'Reminder from Hutson: The Hutson Planter Clinic is ' + eventDate + ' at the ' + location + ' - ' + eventAddress + ' starting at ' + startTime + '. We look forward to seeing you there!'
    }).then((message) => console.log('Message sent. SID: ' + message.sid));
  });

}