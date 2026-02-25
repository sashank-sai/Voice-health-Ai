
# Ambulance + Doctor Call - n8n Workflow

An intelligent AI-powered healthcare assistant workflow that handles emergency calls, symptom analysis, and connects patients with doctors or ambulance services using Twilio and Google Gemini AI.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage Examples](#usage-examples)
- [Workflow Logic](#workflow-logic)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## 🎯 Overview

This n8n workflow provides an intelligent voice-based healthcare assistant that:
- Analyzes caller symptoms in real-time
- Detects emergency situations automatically
- Connects patients with doctors via conference calls
- Dispatches ambulances for critical emergencies
- Maintains conversation context throughout the call

---

## ✨ Features

- **Emergency Detection**: Automatically identifies critical keywords and symptoms
- **Symptom Analysis**: Uses AI to understand and categorize health concerns
- **Multi-path Routing**: 
  - Emergency ambulance dispatch
  - Doctor consultation setup
  - General health advice
- **Conference Calling**: Three-way calls between patient, doctor, and system
- **Conversation Memory**: Remembers context throughout the interaction
- **Natural Language Processing**: Understands conversational speech

---


## 📦 Prerequisites

Before setting up this workflow, ensure you have:

1. **n8n Instance** (version 1.0+)
   - Self-hosted or n8n Cloud
   - Active and running

2. **Twilio Account** (Free or Paid)
   - Account SID
   - Auth Token
   - Phone numbers (2 recommended: one for patient, one for system)

3. **Google Cloud Account**
   - Gemini API enabled
   - API Key generated

4. **Doctor's Contact Information**
   - Valid phone number for doctor consultations

---

The required Files about N8N are in the folder named as **N8N**

## 🚀 Installation

### Step 1: Import the Workflow

1. Download the `Complete_workflow.json` file from this repository
2. Open your n8n instance
3. Click on **"Workflows"** in the left sidebar
4. Click **"Import from File"** or **"Import from URL"**
5. Select the downloaded JSON file
6. Click **"Import"**

The workflow will be imported with all nodes and connections intact.
This JSON is actually enough but for clarity we also added code nodes which is already part of it for good understanding.
---

## ⚙️ Configuration

### Step 2: Configure Twilio Credentials

The workflow uses **Twilio** for making and receiving phone calls. You'll need to set up Twilio credentials in multiple nodes.

#### 2.1 Get Your Twilio Credentials

1. Log in to [Twilio Console](https://console.twilio.com/)
2. Navigate to **Account Info** on the dashboard
3. Copy your:
   - **Account SID** (e.g., `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
   - **Auth Token** (e.g., `your_auth_token_here`)

#### 2.2 Configure Twilio Nodes

You need to configure the following nodes with your Twilio credentials:

**Nodes to Configure:**
- `Call Emergency Contact`
- `Call Doctor for Prescription`
- `Patient Joins Conference`
- `Setup Doctor Conference`

**For Each Node:**

1. Double-click the node to open settings
2. Look for **Authentication** section
3. Click **"Create New Credentials"** or select existing
4. Enter:
   ```
   Account SID: ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   Auth Token: your_auth_token_here
   ```
5. Click **"Save"**

#### 2.3 Configure Phone Numbers

Update phone numbers in the workflow with **YOUR** numbers:

| Parameter | Example Value | Where to Find |
|-----------|---------------|---------------|
| **From Number** | `+1234567890` | Your Twilio purchased number |
| **To Number (Doctor)** | `+0987654321` | Doctor's contact number |
| **To Number (Ambulance)** | `+1122334455` | Emergency contact number |

**How to Update:**

1. Open each calling node (`Call Emergency Contact`, `Call Doctor for Prescription`)
2. Find the **"To"** parameter
3. Replace with actual phone number in E.164 format: `+[country_code][number]`
   - Example: `+911234567890` for India
   - Example: `+14155551234` for US

---

### Step 3: Configure Google Gemini AI

The workflow uses **Google Gemini** for natural language understanding and response generation.

#### 3.1 Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click **"Get API Key"**
3. Create a new API key or use existing
4. Copy the API key (e.g., `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`)

#### 3.2 Configure Gemini Nodes

You need to configure TWO Gemini nodes:

**Nodes to Configure:**
- `Google Gemini Chat Model` (Main classification model)
- `Google Gemini Chat Model1` (Response generation model)

**For Each Node:**

1. Double-click the node
2. In the **Credentials** section:
   - Click **"Create New Credentials"**
   - Or select existing **"Google Gemini API"**
3. Enter your API Key:
   ```
   API Key: AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```
4. Click **"Save"**

#### 3.3 Model Configuration

Both Gemini nodes we used:
```
Model: gemini-1.5-flash
```

---

### Step 4: Configure Webhook (Call Entry Point)

The workflow starts when Twilio receives an incoming call and sends data to your webhook.

#### 4.1 Activate the Workflow

1. Open the imported workflow
2. Click **"Active"**(Publish) toggle in top-right corner (should turn green)

#### 4.2 Get Webhook URL

1. Double-click the **"Webhook"** node (usually the first node)
2. Copy the **"Production URL"**
   - Format: `https://your-n8n-instance.com/webhook/xxxxx-xxxxx-xxxxx`

#### 4.3 Configure Twilio to Use Webhook

1. Go to [Twilio Phone Numbers](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming)
2. Click on your phone number
3. Scroll to **"Voice & Fax"** section
4. Under **"A CALL COMES IN"**:
   - Select: **"Webhook"**
   - Enter your n8n webhook URL
   - Method: **"HTTP POST"**
5. Click **"Save"**

---

### Step 5: Test Configuration

#### Quick Test Steps:

1. **Verify Workflow is Active**
   - Green "Active" (Publish) indicator visible
   - All nodes properly connected

2. **Test Webhook**
   - Send a test request to webhook URL using curl(Use Postman):
   ```bash
   curl -X POST https://your-n8n-instance.com/webhook/xxxxx \
     -H "Content-Type: application/json" \
     -d '{"SpeechResult":"I need help"}'
   ```

3. **Test Call Flow**
   - Call your Twilio number
   - Speak a test message
   - Verify AI responds appropriately

---

## 💬 Usage Examples

### Example 1: Normal Health Issue (Doctor Consultation)

**Scenario:** Patient has mild fever and needs medical advice.

```
📞 CALL FLOW:

Patient: "Hi, I've been having a fever since yesterday"

AI: "I understand you have a fever. Can you tell me your temperature 
     and any other symptoms you're experiencing?"

Patient: "My temperature is 101°F and I have a mild headache, Please suggest me something other than medicines."

AI: "Based on your symptoms, I suggest you to sleep sometime, frequent wet clotting, Drink hot water and if you want medicines 
doctor connection will help you for prescription."

[System initiates doctor conference call]

Doctor joins → Three-way consultation begins
```

**Classification:** `SYMPTOM_DESCRIPTION` → Doctor consultation path

**Actions Taken:**
- ✅ Symptoms recorded: fever, headache
- ✅ Emergency level: LOW
- ✅ Doctor conference call initiated
- ✅ Patient and doctor connected

**Main point that out agent doen't prescribe any medicines only it can give suggestions for prescriptions i can connect you with doctor**
---

### Example 2: Emergency - Ambulance Dispatch

**Scenario:** Patient experiencing chest pain (critical emergency).

```
📞 CALL FLOW:

Patient: "I'm having severe chest pain and difficulty breathing!"

AI: "I understand this is an emergency. I'm immediately dispatching 
     an ambulance to your location. Stay on the line and try to 
     remain calm."

[System automatically calls emergency contact/ambulance]

AI: "Help is on the way. Can you tell me your exact location?"

Patient: "I'm at 123 Main Street, Apartment 4B"

AI: "Thank you. The ambulance has been notified. Do not hang up. 
     Are you able to unlock your door?"

[Continuous monitoring until ambulance arrives]
```

**Classification:** `EMERGENCY_KEYWORDS` → Emergency dispatch path

**Trigger Keywords:** chest pain, difficulty breathing, can't breathe, heart attack

**Actions Taken:**
- 🚨 Emergency detected immediately
- 🚨 Ambulance call placed (automatically)
- 🚨 Location confirmation requested
- 🚨 Continuous patient monitoring

---

### Example 3: Prescription Request

**Scenario:** Patient needs prescription refill or new medication.

```
📞 CALL FLOW:

Patient: "Hello, I need to refill my blood pressure medication"

AI: "I can help you with a prescription request. Can you tell me 
     which medication you need to refill?"

Patient: "It's Lisinopril 10mg. I ran out yesterday"

AI: "Thank you. I'm connecting you with a doctor who can authorize 
     your prescription refill. Please hold."

[System sets up conference call with doctor]

Doctor joins → Prescription discussion

Doctor: "I'll send the prescription to your pharmacy. Which pharmacy 
         do you use?"

Patient: "CVS on Oak Street"

Doctor: "Done. Your prescription will be ready in 2 hours."
```

**Classification:** `PRESCRIPTION_REQUEST` → Doctor consultation path

**Actions Taken:**
- ✅ Request type identified
- ✅ Medication details captured
- ✅ Doctor conference initiated
- ✅ Prescription authorized by doctor

---

## 🔄 Workflow Logic

### Main Flow Diagram

```
Incoming Call (Webhook)
        ↓
Extract Speech Input
        ↓
AI Classification (Gemini)
        ↓
    [SWITCH]
        ↓
    ┌───┴───┬───────────┬──────────┬────────────┐
    ↓       ↓           ↓          ↓            ↓
Emergency  Symptom  Greeting  Prescription  General
Keywords   Analysis           Request        Chat
    ↓       ↓           ↓          ↓            ↓
Ambulance  Doctor   Welcome   Doctor      Advice
Dispatch   Consult   Message  Conference   Response
```

### Classification Types

| Classification | Description | Action |
|----------------|-------------|--------|
| `EMERGENCY_KEYWORDS` | Life-threatening situations | Immediate ambulance dispatch |
| `SYMPTOM_DESCRIPTION` | Health concerns needing medical advice | Doctor consultation |
| `PRESCRIPTION_REQUEST` | Medication refills or new prescriptions | Doctor conference |
| `GREETING` | Call initiation | Welcome message |
| `GENERAL_CONVERSATION` | Health questions | AI-powered advice |
| `CLARIFICATION_RESPONSE` | Follow-up questions | Context-aware response |
| `GOODBYE` | Call conclusion | Polite farewell |

### Emergency Keywords

The system automatically detects these critical phrases:

**Cardiac:**
- "chest pain", "heart attack", "cardiac arrest"
- "irregular heartbeat", "palpitations"

**Respiratory:**
- "can't breathe", "difficulty breathing", "choking"
- "severe asthma attack"

**Neurological:**
- "stroke", "seizure", "unconscious"
- "severe head injury", "paralysis"

**Trauma:**
- "heavy bleeding", "severe injury", "broken bone"
- "car accident", "fall from height"

**Other:**
- "overdose", "allergic reaction", "severe burn"
- "suicidal thoughts", "poisoning"

---

## 🛠️ Troubleshooting

### Common Issues and Solutions

#### Issue 1: Workflow Not Triggering

**Problem:** No response when calling Twilio number

**Solutions:**
```
✓ Check workflow is ACTIVE (green toggle)
✓ Verify webhook URL is correctly set in Twilio
✓ Ensure webhook node is set to "Production" mode
✓ Check n8n execution logs for errors
```

#### Issue 2: Gemini API Errors

**Problem:** "Invalid API Key" or "Quota exceeded"

**Solutions:**
```
✓ Verify API key is correct (no extra spaces)
✓ Check Gemini API is enabled in Google Cloud Console
✓ Confirm billing is set up (free tier available)
✓ Check API quota limits haven't been exceeded
```

#### Issue 3: Twilio Call Failures

**Problem:** Calls don't connect or drop immediately

**Solutions:**
```
✓ Verify Account SID and Auth Token are correct
✓ Check phone numbers are in E.164 format (+1234567890)
✓ Ensure "From" number is a valid Twilio number you own
✓ Check Twilio account balance (for paid accounts)
✓ Verify destination number can receive calls
```

#### Issue 4: Conference Calls Not Working

**Problem:** Doctor or patient doesn't join conference

**Solutions:**
```
✓ Ensure both phone numbers are correct
✓ Check "Setup Doctor Conference" node configuration
✓ Verify Twilio has conference calling enabled
✓ Test with simple two-person call first
```

#### Issue 5: AI Not Understanding Input

**Problem:** Incorrect classification or nonsensical responses

**Solutions:**
```
✓ Check Gemini model is set to "gemini-1.5-flash"
✓ Review prompt in "Basic LLM Chain" node
✓ Ensure speech-to-text is working correctly
✓ Test with clearer, more direct phrases
```

---

## 📊 Node Configuration Summary

### Essential Nodes and Their Purpose

| Node Name | Type | Purpose | Configuration Required |
|-----------|------|---------|------------------------|
| `Webhook` | Webhook | Receives Twilio calls | Enable in workflow |
| `Google Gemini Chat Model` | AI | Classifies user intent | Gemini API Key |
| `Google Gemini Chat Model1` | AI | Generates responses | Gemini API Key |
| `Call Emergency Contact` | HTTP Request | Dials ambulance | Twilio credentials, phone numbers |
| `Call Doctor for Prescription` | HTTP Request | Calls doctor | Twilio credentials, doctor's number |
| `Setup Doctor Conference` | HTTP Request | Creates 3-way call | Twilio credentials |
| `Switch` | Logic | Routes based on classification | No config needed |
| `AI Agent1-6` | AI Agent | Context-aware responses | Connected to Gemini model |

---

## 🔐 Security Best Practices

1. **Never commit credentials to Git**
   ```bash
   # Add to .gitignore:
   .env
   credentials.json
   twilio-config.json
   ```

2. **Use Environment Variables**
   - Store sensitive data in n8n environment variables
   - Access via `{{ $env.VARIABLE_NAME }}`

3. **Rotate API Keys Regularly**
   - Change Gemini API keys every 90 days
   - Update Twilio Auth Token periodically

4. **Restrict Webhook Access**
   - Use Twilio's IP whitelist if possible
   - Enable webhook authentication

5. **HIPAA Compliance** (if handling real patient data)
   - Ensure n8n instance is hosted in compliant environment
   - Enable encryption at rest and in transit
   - Implement proper logging and audit trails

---

## 📝 Sample Configuration Files

### Example: Twilio Configuration

```json
{
  "account_sid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "auth_token": "your_auth_token_here",
  "phone_numbers": {
    "system": "+1234567890",
    "doctor": "+0987654321",
    "ambulance": "+1122334455"
  }
}
```

### Example: Gemini Configuration

```json
{
  "api_key": "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "model": "gemini-1.5-flash",
  "temperature": 0.7,
  "max_tokens": 1024
}
```

---

## 🚀 Advanced Customization

### Adding Custom Emergency Keywords

1. Open the **"Parse LLM Output"** node
2. Modify the keyword detection logic:
```javascript
const emergencyKeywords = [
  'chest pain', 'heart attack', 'stroke',
  'cant breathe', 'seizure', 'unconscious',
  // Add your custom keywords here
  'severe allergy', 'anaphylaxis'
];
```

### Modifying AI Prompts

1. Open **"Basic LLM Chain"** node
2. Edit the system prompt:
```
You are a medical triage assistant. Classify the user's 
message into one of these categories:
- EMERGENCY_KEYWORDS: Life-threatening situations
- SYMPTOM_DESCRIPTION: Health concerns
- PRESCRIPTION_REQUEST: Medication needs
...

[Customize based on your requirements]
```

### Adding Multiple Doctors

1. Modify **"Switch"** node to add doctor specialization logic
2. Create separate calling nodes for different specialists
3. Update classification to include specialty detection

---

## 📞 Testing Checklist

Before going live, test these scenarios:

- [ ] Normal symptom description → Doctor consultation
- [ ] Emergency keyword → Ambulance dispatch
- [ ] Prescription request → Doctor conference
- [ ] Greeting message → Welcome response
- [ ] General health question → AI advice
- [ ] Unclear input → Clarification request
- [ ] Call disconnect → Proper cleanup
- [ ] Multiple symptoms → Full capture
- [ ] Non-English speech → Error handling
- [ ] Network interruption → Reconnection

---

## 📚 Additional Resources

- [n8n Documentation](https://docs.n8n.io/)
- [Twilio Voice API Docs](https://www.twilio.com/docs/voice)
- [Google Gemini API Docs](https://ai.google.dev/docs)
- [Twilio Conference Call Guide](https://www.twilio.com/docs/voice/tutorials/conference-calling)
- [n8n Community Forum](https://community.n8n.io/)

---

## 🤝 Contributing

If you improve this workflow, please consider:
1. Fork the repository
2. Make your enhancements
3. Test thoroughly
4. Submit a pull request with detailed description

---

## ⚠️ Disclaimer

This workflow is a demonstration tool and should not be used as-is for actual emergency medical services without:
- Proper medical oversight
- Compliance with healthcare regulations (HIPAA, GDPR, etc.)
- Certification from relevant authorities
- Rigorous testing and validation
- Backup systems and failover mechanisms

Always consult with legal and medical professionals before deploying healthcare-related automation systems.

---

## 📧 Support

For questions or issues:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review n8n execution logs
3. Post in n8n Community Forum
4. Check Twilio and Google Cloud status pages

---

**Last Updated:** January 2025  
**Workflow Version:** 1.0  
**n8n Compatibility:** v1.0+

---

## Quick Start Summary

```bash
1. Import JSON file into n8n
2. Add Twilio credentials (Account SID + Auth Token)
3. Add Gemini API key
4. Update phone numbers
5. Activate workflow
6. Copy webhook URL to Twilio
7. Test with a call
8. 🎉 You're live!
```

Good luck with your healthcare assistant! 🏥



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

