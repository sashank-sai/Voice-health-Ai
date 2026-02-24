const items = $input.all();

return items.map(item => {
  const data = item.json;

  // Get ALL accumulated symptoms
  const allSymptoms = Array.isArray(data.all_accumulated_symptoms)
    ? data.all_accumulated_symptoms
    : [];

  const allSymptomsText = allSymptoms.length > 0
    ? allSymptoms.join(", ")
    : "no symptoms yet";

  // Current symptoms
  const currentSymptoms = Array.isArray(data.extracted_symptoms)
    ? data.extracted_symptoms.join(", ")
    : "no new symptoms";

  const chatInput = `Patient symptom history: ${allSymptomsText}. Latest user message: "${data.user_input}". New symptoms this turn: ${currentSymptoms}. Emergency level: ${data.emergency_level}. Please ask the most relevant follow-up question without repeating what they've already described.`;

  return {
    json: {
      ...data,
      chatInput
    }
  };
});