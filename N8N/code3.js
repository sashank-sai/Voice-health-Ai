const items = $input.all();
return items.map(item => {
  const data = item.json;
  const chatInput = `The user said: "${data.user_input || ''}". Acknowledge their comment and gently guide them to describe any health-related symptoms.`;
  return { json: { ...data, chatInput, all_symptoms: data.all_symptoms || [] } };
});