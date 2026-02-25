try {
  const body = $input.first().json.body || {};
  const speech = body.SpeechResult || body.UnstableSpeechResult || body.user_message || body.speech || body.RecognitionResult || body.text || "";
  const callSid = body.CallSid || "unknown";
  const from = body.From || "unknown";
  const callStatus = body.CallStatus || "unknown";
  return [{ json: { isGreeting: speech.trim() === "" ? "true" : "false", userText: speech.trim(), call_sid: callSid, caller_number: from, call_status: callStatus, debugInfo: body } }];
} catch (error) {
  return [{ json: { isGreeting: "true", userText: "", call_sid: "error", caller_number: "error", error: error.message } }];
}