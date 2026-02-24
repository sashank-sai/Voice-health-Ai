const item     = $input.first().json;
const llmText  = (item.text || "").trim();     // Gemini translation output
const original = item.userTextOriginal || item.userText || "";

// Use translated English text for all internal processing
// Keep original text stored for reference
const englishText = item.needsTranslation ? (llmText || original) : original;

return { json: {
  ...item,
  userText:         englishText,   // ← now English, used by classifier + AI agents
  userTextOriginal: original,      // ← original Telugu/Hindi, kept for logs
  userTextEnglish:  englishText
}};