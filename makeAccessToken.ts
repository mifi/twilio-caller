import assert from 'node:assert';
import 'dotenv/config'

import { jwt } from 'twilio';

// https://www.twilio.com/docs/iam/access-tokens#creating-tokens
// https://www.twilio.com/en-us/blog/make-receive-phone-calls-browser-twilio-programmable-voice-python-javascript
// function handler hosted here:
// https://console.twilio.com/us1/develop/functions/editor/ZS83f6a234f7191bde5b2365e3e309cfd2/environment/ZE9328f7b4749661edceeb1976d1967c2e/function/ZH57f1e22b68f9bf1c4615a5014d6b6652

// Used when generating any kind of tokens
// To set up environmental variables, see http://twil.io/secure
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKey = process.env.TWILIO_API_KEY;
const twilioApiSecret = process.env.TWILIO_API_SECRET;
const outgoingApplicationSid = process.env.TWIML_APP_SID;
const identity = 'user';

assert(twilioAccountSid);
assert(twilioApiKey);
assert(twilioApiSecret);
assert(identity);

// Create a "grant" which enables a client to use Voice as a given user
const voiceGrant = new jwt.AccessToken.VoiceGrant({
  outgoingApplicationSid: outgoingApplicationSid,
  incomingAllow: true, // todo not sure if needed
});

// Create an access token which we will sign and return to the client,
// containing the grant we just created
const token = new jwt.AccessToken(
  twilioAccountSid,
  twilioApiKey,
  twilioApiSecret,
  { identity },
);
token.addGrant(voiceGrant);

// Serialize the token to a JWT string
console.log(token.toJwt());
