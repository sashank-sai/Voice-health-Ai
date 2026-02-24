const items = $input.all();

return items.map(item => {
  const data = item.json;

  const userFarewell = data.user_input || "Thank you, goodbye.";
  
  const allSymptomsSummary = Array.isArray(data.all_symptoms) ? data.all_symptoms.join(', ') : 'none';

  const chatInput = `The user ended the conversation with: "${userFarewell}". ` +
    `All symptoms reported during this conversation: ${allSymptomsSummary}. ` +
    `Please respond in a friendly and professional tone. Politely acknowledge the end of the conversation, thank them for reaching out, and wish them well. ` +
    `Format your entire reply as valid XML using <Say> inside <Response>.`;

  return {
    json: {
      ...data,
      chatInput,
      all_symptoms: data.all_symptoms || []
    }
  };
});
