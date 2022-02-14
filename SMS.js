// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio_number = process.env.TWILIO_NUMBER;
const client = require('twilio')(accountSid, authToken);

const SMS = (number, text) => {
  //
  return client.messages.create({
    body: text,
    from: twilio_number,
    to: number,
  });
  //
};

module.exports = SMS;
