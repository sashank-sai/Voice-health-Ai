const d = $input.all()[0]?.json || {};
const rawOutput = d.output || "Hello! Welcome. How can I assist you with your health today?";
const actionUrl = "https://nueral.app.n8n.cloud/webhook/8e4f1f25-a957-4afd-917e-7dad6d2efa90";
function clean(s) { return (s||'').replace(/<\?xml[^?]*\?>/gi,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim(); }
const xml = `<?xml version="1.0" encoding="UTF-8"?><Response><Gather input="speech" action="${actionUrl}" method="POST" speechTimeout="auto" timeout="10"><Say voice="Polly.Aditi" volume="loud">${clean(rawOutput)}</Say></Gather><Say voice="Polly.Aditi" volume="loud">I didn't hear you. Could you say that again?</Say></Response>`;
return [{ json: { headers: {'Content-Type':'application/xml; charset=utf-8'}, body: xml } }];