try {
  const body = $input.first().json.body || {};
  
  // Extract speech from various possible fields
  const speech = body.SpeechResult || 
                 body.UnstableSpeechResult ||
                 body.user_message || 
                 body.speech || 
                 body.RecognitionResult || 
                 body.text || 
                 "";
  
  // Extract call metadata
  const callSid = body.CallSid || "unknown";
  const from = body.From || "unknown";
  const callStatus = body.CallStatus || "unknown";
  
  console.log("=== WEBHOOK RECEIVED ===");
  console.log("Speech:", speech);
  console.log("CallSid:", callSid);
  console.log("CallStatus:", callStatus);
  console.log("Full Body:", JSON.stringify(body));
  
  // Determine if this is a greeting (empty speech) or actual input
  const isGreeting = speech.trim() === "";
  
  return [{
    json: {
      isGreeting: isGreeting ? "true" : "false",
      userText: speech.trim(),
      call_sid: callSid,
      caller_number: from,
      call_status: callStatus,
      debugInfo: body
    }
  }];
} catch (error) {
  console.error("Error processing webhook:", error);
  return [{
    json: {
      isGreeting: "true",
      userText: "",
      call_sid: "error",
      caller_number: "error",
      error: error.message
    }
  }];
}