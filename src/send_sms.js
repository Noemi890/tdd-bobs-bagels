// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = "ACff1dcffc25fe6036b465a61e4ca9d275";
const authToken = "e32ea0c66b0dc5120030ecd87424cc07";
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'YAOZA! Your order is on his way right now, shouldn\'t arrive later than 11:50am. Thank you for shopping with us',
     from: '+17692248237',
     to: '+447495435595'
   })
  .then(message => console.log(message.sid));