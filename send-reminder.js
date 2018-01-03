require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

var client = require('twilio')(accountSid, authToken);

var rsvpData = require('./data/rsvp-data.json');

var location = 'Bill Cherry Expo Center',
    startTime = '8:00 am',
    dataIndex = 0;

const dataArray = rsvpData.data[dataIndex];

dataArray.forEach(el => {
  client.messages.create({
    to: el.sender,
    from: twilioPhoneNumber,
    body: 'Reminder from Hutson: The Hutson Planter Clinic is tomorrow at the ' + location + ' starting at ' + startTime + '. We look forward to seeing you there!',
  }).then((message) => console.log('Message sent. SID: ' + message.sid));
});
