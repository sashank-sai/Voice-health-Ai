const d = $input.all()[0]?.json || {};
const rawOutput = d.output || "Thank you for speaking with me. Stay healthy!";
function clean(s) { return (s||'').replace(/<\?xml[^?]*\?>/gi,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim(); }
const xml = `<?xml version="1.0" encoding="UTF-8"?><Response><Say voice="Polly.Aditi" volume="loud">${clean(rawOutput)}</Say><Say voice="Polly.Aditi" volume="loud">Goodbye!</Say><Hangup/></Response>`;
return [{ json: { headers: {'Content-Type':'application/xml; charset=utf-8'}, body: xml } }];