# API Data Guide — VoiceHealth Dashboard

This document describes the exact JSON data your backend needs to send for the dashboard to display live data.

---

## Configuration

Set your API base URL in the **Settings** panel (gear icon) on the dashboard.  
Example: `https://your-server.com` or `http://localhost:5000`

If no URL is set, the dashboard uses built-in mock data.

---

## Endpoints

### 1. `GET /api/calls/active`

Returns currently active/live calls.

```json
[
  {
    "id": 1,
    "region": "Warangal Rural",
    "status": "Live",
    "duration": "0:45",
    "language": "Telugu",
    "type": "Triage",
    "signal": 80,
    "caller": "Caller #9901",
    "phone": "+91-9xxxxx1234"
  }
]
```

| Field | Type | Values |
|-------|------|--------|
| `id` | number | Unique ID |
| `region` | string | Location name |
| `status` | string | `"Live"`, `"Redirecting"`, `"Analyzing"` |
| `duration` | string | Call duration `"M:SS"` |
| `language` | string | `"Telugu"`, `"Hindi"`, `"Urdu"`, etc. |
| `type` | string | `"Triage"`, `"Emergency"`, `"General"`, `"Follow-up"` |
| `signal` | number | 0-100 signal strength |
| `caller` | string | Caller identifier |
| `phone` | string | Phone number |

---

### 2. `GET /api/calls/logs`

Returns recent/completed call logs.

```json
[
  {
    "id": 101,
    "time": "10:42 AM",
    "date": "2026-02-24",
    "user": "Caller #8821",
    "symptom": "Chest Pain (Acute)",
    "outcome": "Ambulance Dispatched",
    "revenue": 2.50,
    "status": "Critical",
    "duration": "4:32"
  }
]
```

| Field | Type | Values |
|-------|------|--------|
| `status` | string | `"Critical"`, `"Resolved"`, `"Failed"`, `"Referral"` |
| `revenue` | number | USD amount earned from this call |
| `outcome` | string | Action taken by AI |

---

### 3. `GET /api/patients`

Returns patients currently in treatment.

```json
[
  {
    "id": "P001",
    "name": "Ramesh K.",
    "age": 45,
    "gender": "Male",
    "phone": "+91-9xxx1234",
    "condition": "Cardiac Monitoring",
    "visits": 3,
    "status": "Active",
    "lastVisit": "2026-02-24",
    "hospital": "NIMS Hyderabad"
  }
]
```

| Field | Type | Values |
|-------|------|--------|
| `status` | string | `"Active"`, `"Recovered"` |
| `visits` | number | Total visit count |

---

### 4. `GET /api/ambulances`

Returns ambulance fleet data.

```json
[
  {
    "id": "AMB-01",
    "vehicle": "KA-01-XX-1234",
    "driver": "Ravi Kumar",
    "status": "Dispatched",
    "location": "Warangal Rural",
    "eta": "6 min",
    "patient": "Caller #8821",
    "hospital": "Area Hospital Warangal",
    "fuel": 72
  }
]
```

| Field | Type | Values |
|-------|------|--------|
| `status` | string | `"Dispatched"`, `"En Route"`, `"Available"`, `"Returning"`, `"Maintenance"` |
| `eta` | string | ETA or `"-"` if not active |
| `fuel` | number | 0-100 percentage |
| `patient` | string | Patient ID or `"-"` |

---

### 5. `GET /api/revenue`

Returns revenue breakdown.

```json
{
  "today": 1240.50,
  "yesterday": 1105.00,
  "thisWeek": 7832.75,
  "thisMonth": 31250.00,
  "lastMonth": 28900.50,
  "perCallAvg": 2.15,
  "sources": [
    { "name": "Triage Consultations", "amount": 15200, "percent": 48.6 }
  ],
  "monthly": [
    { "month": "Sep", "amount": 18500 }
  ]
}
```

---

### 6. `GET /api/kpis`

Returns top-level KPI numbers.

```json
{
  "totalCalls": 14582,
  "callsToday": 247,
  "avgCallDuration": "3:42",
  "successRate": 94.2,
  "activeUsers": 1842,
  "newUsersToday": 38,
  "treatmentActive": 326,
  "treatmentCompleted": 516,
  "ambulancesTotal": 7,
  "ambulancesActive": 3,
  "avgResponseTime": "8 min",
  "hospitalsConnected": 24
}
```

---

## Quick Start

1. Open dashboard → Click ⚙️ Settings icon
2. Enter your API URL (e.g. `http://localhost:5000`)
3. Click Save — dashboard reloads with live data
4. If your API is down, mock data is shown automatically
