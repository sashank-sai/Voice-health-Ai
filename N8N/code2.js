const items = $input.all();
return items.map(item => {
  const data = item.json;
  const chatInput = `The user greeted with: "${data.user_input || 'Hello'}". Respond warmly, introduce yourself as a virtual medical assistant, and ask about their health concerns.`;
  return { json: { ...data, chatInput, all_symptoms: data.all_symptoms || [] } };
});