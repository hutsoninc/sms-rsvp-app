require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = require('twilio')(accountSid, authToken);

client.messages.create({
  to: process.env.MY_PHONE_NUMBER,
  from: twilioPhoneNumber,
  body: 'Hutson\'s Spring Clinic is coming soon!',
}).then((message) => console.log(message.sid));