const items = $input.all();
return items.map(item => {
  const data = item.json;
  const symptoms = Array.isArray(data.extracted_symptoms) ? data.extracted_symptoms.join(", ") : "no symptoms listed";
  const allSymptoms = Array.isArray(data.all_symptoms) ? data.all_symptoms.join(", ") : "none";
  const chatInput = `User message: "${data.user_input}". Current symptoms: ${symptoms}. ALL symptoms reported this call: ${allSymptoms}. Emergency level: ${data.emergency_level}. Ask the most relevant medical follow-up question. If user wants advice/suggestions, use ALL past symptoms to respond.`;
  return { json: { ...data, all_symptoms: data.all_symptoms || [], chatInput } };
});