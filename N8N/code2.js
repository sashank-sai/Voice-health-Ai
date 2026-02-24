const items = $input.all();

return items.map(item => {
  const data = item.json;

  const userGreeting = data.user_input || "Hello";
  
  // Check if symptoms already mentioned
  const allSymptoms = Array.isArray(data.all_accumulated_symptoms)
    ? data.all_accumulated_symptoms
    : [];

  const hasSymptoms = allSymptoms.length > 0;

  const chatInput = hasSymptoms
    ? `The user greeted with: "${userGreeting}". They have already mentioned these symptoms: ${allSymptoms.join(", ")}. Acknowledge the greeting and ask them to continue describing their symptoms.`
    : `The user greeted with: "${userGreeting}". This is a new conversation. Respond warmly, introduce yourself as a virtual medical assistant, and ask them to describe any symptoms or health concerns.`;

  return {
    json: {
      ...data,
      chatInput
    }
  };
});