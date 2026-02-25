const d = $input.all()[0]?.json || {};
const rawOutput = d.output || "We understand this is an emergency. Please describe your location clearly.";
const callerNumber = d.caller_number || "unknown";
const callSid = d.call_sid || "unknown";
function clean(s) { return (s||'').replace(/<\?xml[^?]*\?>/gi,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim(); }
const address = 'Amrita Vishwa Vidhyapeetham, Amaravati';
const xml = `<?xml version="1.0" encoding="UTF-8"?><Response><Say voice="Polly.Aditi" volume="loud">${clean(rawOutput)}</Say><Say voice="Polly.Aditi" volume="loud">Emergency services are being notified. Please stay on the line.</Say></Response>`;
return [{ json: { headers: {'Content-Type':'application/xml; charset=utf-8'}, body: xml, emergencyMessage: address, callerNumber: callerNumber, callSid: callSid } }];