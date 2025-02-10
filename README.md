# twilio-caller

Tool for calling using twilio API from the browser. Useful for testing. Uses `@twilio/voice-sdk`.

In twilio create a new number and an app, e.g. `twilio-caller` and link it to the number. Also create an [API key](https://console.twilio.com/us1/account/keys-credentials/api-keys).

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

Setup `.env` with data from Twilio admin. Next generate a token:

```bash
tsx makeAccessToken.ts

yarn dev
```

and go to your browser.

## Useful links

- [Twilio phone numbers](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming)
- [Twilio call logs](https://console.twilio.com/us1/monitor/logs/calls?frameUrl=%2Fconsole%2Fvoice%2Fcalls%2Flogs%3Fx-target-region%3Dus1)
- [Twilio billing / usage](https://console.twilio.com/us1/billing/usage/summary?frameUrl=%2Fconsole%2Fusage%3Fdate%3D2025-02%26__override_layout__%3Dembed%26bifrost%3Dtrue%26x-target-region%3Dus1)
