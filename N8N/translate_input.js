const item = $input.first().json;
const userText = item.userText || "";
const lang     = item.detected_language || "english";

// If already English, skip translation - pass through as-is
if (lang === "english" || !userText) {
  return { json: { ...item, userTextOriginal: userText, userTextEnglish: userText }};
}

// Use Gemini (via Basic LLM Chain) to translate
// We store original + english version separately
// The translation prompt is embedded in chatInput for the LLM chain
const translatePrompt = `Translate the following ${lang === "telugu" ? "Telugu" : "Hindi"} text to English. Return ONLY the translated English text, nothing else, no explanation.

Text to translate: "${userText}"`;

return { json: {
  ...item,
  userTextOriginal: userText,       // save original for language detection
  userText: userText,               // keep for reference  
  translatePrompt: translatePrompt, // used by the LLM translation chain
  needsTranslation: true
}};