/*
  PURPOSE:
  - Normalize LLM classification output
  - HARD-HANDLE empty / silent user input
  - Make test & production behavior identical
*/

/* =========================
   1. DECLARE INPUTS
   ========================= */

// Incoming item from previous node (LLM or webhook)
const item = $input.first()?.json || {};

// Speech text captured from webhook (safe defaults)
const userText =
  item.userText ??
  item.user_input ??
  item.text ??
  "";

// LLM raw text output (stringified JSON)
const llmRaw =
  item.text ??
  item.llm_output ??
  "{}";

// Call metadata (optional)
const callerNumber = item.caller_number || "unknown";
const callSid = item.call_sid || "unknown";

/* =========================
   2. HARD RULE — EMPTY INPUT
   ========================= */

if (!userText || userText.trim() === "") {
  return {
    json: {
      classification: "Pleasetalk",
      user_input: "",
      extracted_symptoms: [],
      emergency_level: "none",
      next_action: "redirect_to_medical",
      caller_number: callerNumber,
      call_sid: callSid
    }
  };
}

/* =========================
   3. PARSE LLM OUTPUT
   ========================= */

let parsed;

try {
  const cleaned = llmRaw
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  parsed = JSON.parse(cleaned);
} catch (e) {
  // Absolute fallback
  parsed = {
    classification: "Pleasetalk",
    user_input: userText,
    extracted_symptoms: [],
    emergency_level: "none",
    next_action: "redirect_to_medical"
  };
}

/* =========================
   4. NORMALIZE OUTPUT
   ========================= */

return {
  json: {
    classification: parsed.classification || "Pleasetalk",
    user_input: parsed.user_input || userText,
    extracted_symptoms: Array.isArray(parsed.extracted_symptoms)
      ? parsed.extracted_symptoms
      : [],
    emergency_level: parsed.emergency_level || "none",
    next_action: parsed.next_action || "redirect_to_medical",
    caller_number: callerNumber,
    call_sid: callSid
  }
};
