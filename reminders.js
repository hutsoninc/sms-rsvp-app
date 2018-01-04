require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

var client = require('twilio')(accountSid, authToken);

var rsvpData = require('./data/rsvp-data.json');

exports.send = function(locationNumber){

  var location, eventDate, dataIndex;
  var startTime = '8:00 am'

  if(locationNumber == 1){
    location = 'Bill Cherry Expo Center',
    eventDate = 'January 23rd',
    dataIndex = 0;
  }else if(locationNumber == 2){
    location = 'James Bruce Convention Center',
    eventDate = 'January 25th',
    dataIndex = 1;
  }else if(locationNumber == 3){
    location = 'Morganfield Hutson Store',
    eventDate = 'January 30th',
    dataIndex = 2;
  }else if(locationNumber == 2){
    location = 'Vanderburgh 4-H Center',
    eventDate = 'February 1st',
    dataIndex = 3;
  }

  var dataArray = rsvpData.data[dataIndex];

  dataArray.forEach(el => {
    client.messages.create({
      to: el,
      from: twilioPhoneNumber,
      body: 'Reminder from Hutson: The Hutson Planter Clinic is ' + eventDate + ' at the ' + location + ' starting at ' + startTime + '. We look forward to seeing you there!',
    }).then((message) => console.log('Message sent. SID: ' + message.sid));
  });

}