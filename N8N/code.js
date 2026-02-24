// Get the array of items passed from the previous node
const inputItems = $input.all();

// Prepare mapped outputs
return inputItems.map(item => {
  const data = item.json;

  // Parse extracted_symptoms whether string or array
  let symptomsList;
  try {
    symptomsList = Array.isArray(data.extracted_symptoms)
      ? data.extracted_symptoms
      : JSON.parse(data.extracted_symptoms);
  } catch {
    symptomsList = [];
  }

  const symptomSummary = symptomsList.length > 0
    ? symptomsList.join(", ")
    : "a medical emergency";

  const chatInput = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="speech" action=https://nueralnavigators.app.n8n.cloud/webhook/8e4f1f25-a957-4afd-917e-7dad6d2efa90" method="POST" speechTimeout="3" timeout="10">
    <Say voice="Polly.Aditi">
Please stay calm. You said, "${data.user_input}". This may indicate a serious emergency such as ${symptomSummary}. Help is on the way. Can you please tell me your exact location, and whether you're experiencing any other symptoms?
    </Say>
  </Gather>
</Response>`;

  return {
    json: {
      ...data,
      chatInput,
      call_sid: data.call_sid
    }
  };
});
