const items = $input.all();

return items.map(item => {
  const data = item.json;

  const userMessage = data.user_input || "Hello, just wanted to chat";
  
  // Check for accumulated symptoms
  const allSymptoms = Array.isArray(data.all_accumulated_symptoms)
    ? data.all_accumulated_symptoms
    : [];

  const hasSymptoms = allSymptoms.length > 0;

  const chatInput = hasSymptoms
    ? `The user said: "${userMessage}". They have already mentioned these symptoms during this call: ${allSymptoms.join(", ")}. Politely acknowledge their comment and redirect back to discussing their symptoms.`
    : `The user said: "${userMessage}". They haven't mentioned any symptoms yet. Politely acknowledge their comment and gently guide them to describe any health-related symptoms.`;

  return {
    json: {
      ...data,
      chatInput
    }
  };
});