const item = $input.first()?.json || {};
const userText = (item.userText ?? item.user_input ?? "").trim();
const callerNumber = item.caller_number || "unknown";
const callSid = item.call_sid || "unknown";
const detectedLanguage = item.detected_language || "english";
const promptLanguage = item.prompt_language || "English";
const voice = item.voice || "Polly.Aditi";
const gatherLanguage = item.gather_language || "en-IN";

// ============================================================
// FULLY DETERMINISTIC RULE-BASED CLASSIFIER
// No LLM involved - no hallucination possible
// ============================================================

if (!userText) {
  return { json: {
    classification: "Pleasetalk",
    user_input: "",
    extracted_symptoms: [],
    emergency_level: "none",
    next_action: "redirect_to_medical",
    caller_number: callerNumber,
    call_sid: callSid,
    detected_language: detectedLanguage,
    prompt_language: promptLanguage,
    voice: voice,
    gather_language: gatherLanguage
  }};
}

const lower = userText.toLowerCase();

// ── KEYWORD LISTS ──────────────────────────────────────────
const keywords = {
  emergency: {
    english: ['difficulty breathing', 'cant breathe', 'cannot breathe', 'chest pain', 'heart attack', 'stroke', 'severe bleeding', 'unconscious', 'not breathing', 'choking'],
    telugu:  ['శ్వాస ఇబ్బంది', 'గుండె నొప్పి', 'స్ట్రోక్', 'తీవ్రమైన రక్తస్రావం', 'అపస్మారక', 'గుండెపోటు', 'శ్వాస తీసుకోలేను'],
    hindi:   ['सांस लेने में कठिनाई', 'सीने में दर्द', 'स्ट्रोक', 'गंभीर रक्तस्राव', 'बेहोश', 'हार्ट अटैक', 'दिल का दौरा', 'सांस नहीं आ रही']
  },
  prescription: {
    english: ['need medicine', 'want medicine', 'talk to doctor', 'speak to doctor', 'prescription', 'connect to doctor', 'doctor please', 'see doctor', 'consult doctor'],
    telugu:  ['మందు కావాలి', 'డాక్టర్ అవసరం', 'డాక్టర్ తో మాట్లాడాలి', 'వైద్యుడు', 'డాక్టర్ కావాలి', 'మందు ఇవ్వండి'],
    hindi:   ['दवा चाहिए', 'डॉक्टर से बात', 'डॉक्टर चाहिए', 'दवाई चाहिए', 'नुस्खा चाहिए']
  },
  symptom: {
    english: ['headache', 'head ache', 'fever', 'temperature', 'pain', 'nausea', 'cough', 'vomiting', 'vomit', 'sick', 'sore throat', 'body ache', 'stomach ache', 'stomach pain', 'cold', 'runny nose', 'dizziness', 'dizzy', 'tired', 'fatigue', 'rash', 'swelling', 'diarrhea', 'constipation', 'back pain'],
    telugu:  ['తలనొప్పి', 'తలనోపి', 'జ్వరం', 'నొప్పి', 'వాంతులు', 'వాంతి', 'దగ్గు', 'అస్వస్థత', 'గొంతు నొప్పి', 'శరీర నొప్పి', 'కడుపు నొప్పి', 'జలుబు', 'తలతిరగడం', 'అలసట', 'దద్దుర్లు', 'వాపు', 'వెన్నునొప్పి'],
    hindi:   ['सिरदर्द', 'बुखार', 'दर्द', 'उल्टी', 'मतली', 'खांसी', 'बीमार', 'गले में खराश', 'बदन दर्द', 'पेट दर्द', 'सर्दी', 'चक्कर', 'थकान', 'दाने', 'सूजन', 'कमर दर्द']
  },
  greeting: {
    english: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
    telugu:  ['నమస్కారం', 'హలో', 'శుభోదయం', 'శుభ మధ్యాహ్నం', 'శుభ సాయంత్రం'],
    hindi:   ['नमस्ते', 'हैलो', 'सुप्रभात', 'शुभ दोपहर', 'शुभ संध्या', 'हाय']
  },
  goodbye: {
    english: ['goodbye', 'bye', 'thank you', 'thanks', 'that\'s all', 'thats all', 'done'],
    telugu:  ['వీడ్కోలు', 'ధన్యవాదాలు', 'సరే', 'అంతే'],
    hindi:   ['अलविदा', 'धन्यवाद', 'शुक्रिया', 'बस', 'ठीक है']
  }
};

// ── MATCHING FUNCTION ──────────────────────────────────────
// Check keywords for the detected language + always check English as fallback
function matches(category) {
  const langKeys = keywords[category][detectedLanguage] || [];
  const engKeys = keywords[category]['english'] || [];
  const allKeys = [...new Set([...langKeys, ...engKeys])];
  
  return allKeys.some(kw => {
    // For non-latin scripts, check original text (case-sensitive)
    if (/[^\u0000-\u007F]/.test(kw)) {
      return userText.includes(kw);
    }
    // For English, check lowercase
    return lower.includes(kw.toLowerCase());
  });
}

// ── EXTRACT SYMPTOMS ──────────────────────────────────────
function extractSymptoms() {
  const found = [];
  const symKeys = [...(keywords.symptom[detectedLanguage] || []), ...(keywords.emergency[detectedLanguage] || [])];
  const engSymKeys = [...keywords.symptom.english, ...keywords.emergency.english];
  const allKeys = [...new Set([...symKeys, ...engSymKeys])];
  
  for (const kw of allKeys) {
    if (/[^\u0000-\u007F]/.test(kw)) {
      if (userText.includes(kw)) found.push(kw);
    } else {
      if (lower.includes(kw.toLowerCase())) found.push(kw);
    }
  }
  return [...new Set(found)];
}

// ── CLASSIFY ──────────────────────────────────────────────
const isEmergency    = matches('emergency');
const isPrescription = matches('prescription');
const isSymptom      = matches('symptom');
const isGreeting     = matches('greeting') && userText.length < 20;
const isGoodbye      = matches('goodbye');

let classification, emergencyLevel, nextAction;

if (isEmergency) {
  classification = "EMERGENCY_KEYWORDS";
  emergencyLevel = "critical";
  nextAction = "emergency_response";
} else if (isPrescription) {
  classification = "PRESCRIPTION_REQUEST";
  emergencyLevel = "none";
  nextAction = "connect_doctor";
} else if (isSymptom) {
  classification = "SYMPTOM_DESCRIPTION";
  emergencyLevel = "low";
  nextAction = "symptom_analysis";
} else if (isGreeting) {
  classification = "GREETING";
  emergencyLevel = "none";
  nextAction = "greeting_response";
} else if (isGoodbye) {
  classification = "GOODBYE";
  emergencyLevel = "none";
  nextAction = "provide_closure";
} else {
  classification = "GENERAL_CONVERSATION";
  emergencyLevel = "none";
  nextAction = "redirect_to_medical";
}

return { json: {
  classification,
  user_input: userText,
  extracted_symptoms: extractSymptoms(),
  emergency_level: emergencyLevel,
  next_action: nextAction,
  caller_number: callerNumber,
  call_sid: callSid,
  detected_language: detectedLanguage,
  prompt_language: promptLanguage,
  voice: voice,
  gather_language: gatherLanguage
}};