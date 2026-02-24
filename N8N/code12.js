const inputData = $input.all()[0]?.json || {};
const rawOutput = inputData.output || "Thank you for speaking with me. Stay healthy!";

function extractTextFromSay(str) {
  if (!str) return "";
  str = str.replace(/<\?xml[^?]*\?>/gi, '').trim();
  str = str.replace(/<[^>]+>/g, ' ').trim();
  str = str.replace(/\s+/g, ' ').trim();
  return str;
}

const messageText = extractTextFromSay(rawOutput);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Aditi" volume="loud">${messageText}</Say>
  <Say voice="Polly.Aditi" volume="loud">Goodbye!</Say>
  <Hangup />
</Response>`;

return [{
  headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  body: xml
}];