# twilio-caller

Tool for calling using twilio API from the browser. Useful for testing. Uses `@twilio/voice-sdk`.

In twilio create a new number and an app, e.g. `twilio-caller` and link it to the number. Also create an API key.

Then create a Function in Twilio with path `/twilio-caller/handle-call` and set the app's Webhook (Request URL) to the full URL of the Function. This function will simply forward the call to `@twilio/voice-sdk` in the browser:

```js
const assert = require('node:assert');

exports.handler = function(context, event, callback) {
  const callerId = '+123456789'; // Update with your twilio number

  // Only handle outgoing calls
  assert(event.To !== callerId.replaceAll(/[^\d+]/g, ''));

	const twiml = new Twilio.twiml.VoiceResponse();

  // set the callerId (from)
  let dial = twiml.dial({ callerId });

  dial.number(event.To);

  // This callback is what is returned in response to this function being invoked.
  // It's really important! E.g. you might respond with TWiML here for a voice or SMS response.
  // Or you might return JSON data to a studio flow. Don't forget it!
  callback(null, twiml);
};
```

Ref:
- https://www.twilio.com/docs/serverless/functions-assets/functions/invocation
- https://www.twilio.com/docs/voice/twiml/dial


Setup `.env` with data from Twilio admin, then:

```bash
tsx makeAccessToken.ts

yarn dev
```

and go to your browser