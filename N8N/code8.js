const inputData = $input.all()[0]?.json || {};
const rawOutput = inputData.output || "We understand this is an emergency. Please describe your location clearly.";
const callerNumber = inputData.caller_number || "unknown";
const callSid = inputData.call_sid || "unknown";

function extractTextFromSay(str) {
  if (!str) return "";
  str = str.replace(/<\?xml[^?]*\?>/gi, '').trim();
  str = str.replace(/<[^>]+>/g, ' ').trim();
  str = str.replace(/\s+/g, ' ').trim();
  return str;
}

const messageText = extractTextFromSay(rawOutput);
const address = 'Amrita Vishwa Vidhyapeetham, Amaravati';

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Aditi" volume="loud">${messageText}</Say>
  <Say voice="Polly.Aditi" volume="loud">Emergency services are being notified. Please stay on the line.</Say>
</Response>`;

return [{
  headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  body: xml,
  emergencyMessage: address,
  callerNumber: callerNumber,
  callSid: callSid,
  emergencyContactNumber: "<__PLACEHOLDER_VALUE__emergency_contact_number__>"
}];