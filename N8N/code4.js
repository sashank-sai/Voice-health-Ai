const items = $input.all();

return items.map(item => {
  const data = item.json;

  const userReply = data.user_input || "No clarification provided.";
  
  // Get ALL symptoms mentioned so far
  const allSymptoms = Array.isArray(data.all_accumulated_symptoms)
    ? data.all_accumulated_symptoms
    : [];

  const allSymptomsText = allSymptoms.length > 0
    ? allSymptoms.join(", ")
    : "no symptoms";

  // Current turn symptoms
  const newSymptoms = Array.isArray(data.extracted_symptoms)
    ? data.extracted_symptoms.join(", ")
    : "none";

  const chatInput = `Complete symptom history for this call: ${allSymptomsText}. User's latest reply: "${userReply}". New symptoms mentioned this turn: ${newSymptoms}. Acknowledge all symptoms and ask ONE relevant follow-up question if needed.`;

  return {
    json: {
      ...data,
      chatInput
    }
  };
});