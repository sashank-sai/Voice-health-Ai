const item = $input.first()?.json || {};
const userText = item.userText ?? item.user_input ?? item.text ?? "";
const llmRaw = item.text ?? item.llm_output ?? "{}";
const callerNumber = item.caller_number || "unknown";
const callSid = item.call_sid || "unknown";

if (!userText || userText.trim() === "") {
  return { json: { classification: "Pleasetalk", user_input: "", extracted_symptoms: [], emergency_level: "none", next_action: "redirect_to_medical", caller_number: callerNumber, call_sid: callSid } };
}

let parsed;
try {
  const cleaned = llmRaw.replace(/```json/gi, "").replace(/```/g, "").trim();
  parsed = JSON.parse(cleaned);
} catch (e) {
  parsed = { classification: "Pleasetalk", user_input: userText, extracted_symptoms: [], emergency_level: "none", next_action: "redirect_to_medical" };
}

return { json: { classification: parsed.classification || "Pleasetalk", user_input: parsed.user_input || userText, extracted_symptoms: Array.isArray(parsed.extracted_symptoms) ? parsed.extracted_symptoms : [], emergency_level: parsed.emergency_level || "none", next_action: parsed.next_action || "redirect_to_medical", caller_number: callerNumber, call_sid: callSid } };