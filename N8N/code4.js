const items = $input.all();
return items.map(item => {
  const data = item.json;
  const prevSymptoms = Array.isArray(data.extracted_symptoms) ? data.extracted_symptoms.join(", ") : (data.extracted_symptoms || 'none');
  const allSymptoms = Array.isArray(data.all_symptoms) ? data.all_symptoms.join(", ") : "none";
  const chatInput = `The user replied: "${data.user_input || ''}". Previously reported symptoms: ${prevSymptoms}. ALL symptoms reported this entire call: ${allSymptoms}. Acknowledge their reply. If they asked for suggestions, use ALL past symptoms to give advice. Otherwise ask one relevant follow-up question.`;
  return { json: { ...data, all_symptoms: data.all_symptoms || [], chatInput } };
});