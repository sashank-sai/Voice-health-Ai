const item        = $input.first().json;
const userText    = item.userText    || "";
const persistedLang = item.persisted_lang || null;

function detectScript(text) {
  if (!text.trim()) return null;
  if (/[\u0C00-\u0C7F]/.test(text)) return "telugu";   // Telugu Unicode block
  if (/[\u0900-\u097F]/.test(text)) return "hindi";    // Devanagari Unicode block
  return "english";
}

// If language was already established (from URL ?lang=), keep it.
// Otherwise detect fresh from script characters.
const detectedLanguage = persistedLang || detectScript(userText) || "english";

const cfg = {
  telugu:  { promptLang:"Telugu",  gather:"te-IN", ttsVoice:"Google.te-IN-Standard-A" },
  hindi:   { promptLang:"Hindi",   gather:"hi-IN", ttsVoice:"Polly.Aditi"             },
  english: { promptLang:"English", gather:"en-IN", ttsVoice:"Polly.Joanna"            }
}[detectedLanguage] || { promptLang:"English", gather:"en-IN", ttsVoice:"Polly.Joanna" };

console.log(`LANG=${detectedLanguage} | persisted=${persistedLang} | text="${userText.slice(0,40)}"`);

return { json: {
  ...item,
  detected_language: detectedLanguage,
  prompt_language:   cfg.promptLang,
  gather_language:   cfg.gather,
  tts_voice:         cfg.ttsVoice
}};