const inputItems = $input.all();
return inputItems.map(item => {
  const data = item.json;
  let symptomsList;
  try { symptomsList = Array.isArray(data.extracted_symptoms) ? data.extracted_symptoms : JSON.parse(data.extracted_symptoms); } catch { symptomsList = []; }
  const symptomSummary = symptomsList.length > 0 ? symptomsList.join(", ") : "a medical emergency";
  const chatInput = `Please stay calm. You said: "${data.user_input}". This may indicate: ${symptomSummary}. Help is on the way. Please tell me your exact location.`;
  return { json: { ...data, chatInput, all_symptoms: data.all_symptoms || [] } };
});