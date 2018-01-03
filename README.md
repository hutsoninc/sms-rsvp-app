# SMS RSVP App

API that allows users to RSVP to Hutson's 2018 Spring Clinics and sends reminders before the events.

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/en/)
* [Twilio Account](https://www.twilio.com/)

### Installing

A step by step series of examples that tell you have to get a development env running

`git clone` the repo

```
git clone https://github.com/hutsoninc/sms-rsvp-app.git
```

`cd` into the directory and run `npm install`

### Setup

Create a new file called `.env` and enter your environment variables.

```
TWILIO_ACCOUNT_SID = your-account-sid
TWILIO_AUTH_TOKEN = your-auth-token
TWILIO_PHONE_NUMBER = your-twilio-phone-number
MY_PHONE_NUMBER = your-phone-number
HOST = your-host-url
PORT = your-port-number
```

Run `node server.js` to start the server.

## Built With

* [Twilio-Node](https://github.com/twilio/twilio-node) - Helper library that lets you write Node.js code to make HTTP requests to the Twilio API.

## Authors

* **Austin Gordon** - *Development* - [GitHub](https://github.com/AustinLeeGordon)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
