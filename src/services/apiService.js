// ==========================================
// API SERVICE — Connect your backend here
// ==========================================
//
// HOW TO USE:
// 1. Set API_BASE_URL to your backend server URL
// 2. Your backend should expose the endpoints listed in API_DATA_GUIDE.md
// 3. If the API is unreachable, the dashboard falls back to mock data
//

const API_BASE_URL = localStorage.getItem('voicehealth_api_url') || '';

// Helper: fetch with timeout + fallback
async function apiFetch(endpoint, fallbackData) {
    if (!API_BASE_URL) return fallbackData;
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            signal: controller.signal,
            headers: { 'Content-Type': 'application/json' },
        });
        clearTimeout(timeout);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (err) {
        console.warn(`[API] ${endpoint} failed, using mock data:`, err.message);
        return fallbackData;
    }
}

// --- Public API Functions ---

export async function fetchActiveCalls(fallback) {
    return apiFetch('/api/calls/active', fallback);
}

export async function fetchCallLogs(fallback) {
    return apiFetch('/api/calls/logs', fallback);
}

export async function fetchPatients(fallback) {
    return apiFetch('/api/patients', fallback);
}

export async function fetchAmbulances(fallback) {
    return apiFetch('/api/ambulances', fallback);
}

export async function fetchRevenue(fallback) {
    return apiFetch('/api/revenue', fallback);
}

export async function fetchKPIs(fallback) {
    return apiFetch('/api/kpis', fallback);
}

// --- Settings ---
export function getApiUrl() {
    return localStorage.getItem('voicehealth_api_url') || '';
}

export function setApiUrl(url) {
    localStorage.setItem('voicehealth_api_url', url);
    window.location.reload(); // Reload to use the new URL
}
