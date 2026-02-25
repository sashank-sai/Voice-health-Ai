const items = $input.all();
return items.map(item => {
  const data = item.json;
  const allSymptomsSummary = Array.isArray(data.all_symptoms) && data.all_symptoms.length > 0 ? data.all_symptoms.join(', ') : 'none reported';
  const chatInput = `The user ended with: "${data.user_input || 'goodbye'}". ALL symptoms reported this call: ${allSymptomsSummary}. Respond warmly, thank them, give a brief summary of ALL their symptoms, and wish them well.`;
  return { json: { ...data, chatInput, all_symptoms: data.all_symptoms || [] } };
});