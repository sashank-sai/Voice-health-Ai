const inputData = $input.all()[0]?.json || {};
const rawOutput = inputData.output || "I'm always here if you need to talk about your health.";
const actionUrl = "https://nueralnavigators1.app.n8n.cloud/webhook/8e4f1f25-a957-4afd-917e-7dad6d2efa90";

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
  <Gather input="speech" action="${actionUrl}" method="POST" speechTimeout="auto" timeout="10">
    <Say voice="Polly.Aditi" volume="loud">${messageText}</Say>
  </Gather>
  <Say voice="Polly.Aditi" volume="loud">Feel free to say anything about your health condition.</Say>
</Response>`;

return [{
  headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  body: xml
}];