// ==================== MOCK DATA ====================

export const activeCalls = [
    { id: 1, region: "Warangal Rural", status: "Live", duration: "0:45", language: "Telugu", type: "Triage", signal: 80, caller: "Caller #9901", phone: "+91-9xxxxx1234" },
    { id: 2, region: "Adilabad", status: "Redirecting", duration: "2:10", language: "Hindi", type: "Emergency", signal: 40, caller: "Caller #9902", phone: "+91-9xxxxx5678" },
    { id: 3, region: "Khammam", status: "Live", duration: "1:20", language: "Telugu", type: "General", signal: 95, caller: "Caller #9903", phone: "+91-9xxxxx9012" },
    { id: 4, region: "Nalgonda", status: "Analyzing", duration: "0:12", language: "Telugu", type: "Triage", signal: 65, caller: "Caller #9904", phone: "+91-9xxxxx3456" },
    { id: 5, region: "Karimnagar", status: "Live", duration: "3:05", language: "Telugu", type: "Follow-up", signal: 88, caller: "Caller #9905", phone: "+91-9xxxxx7890" },
    { id: 6, region: "Nizamabad", status: "Redirecting", duration: "0:55", language: "Urdu", type: "Emergency", signal: 30, caller: "Caller #9906", phone: "+91-9xxxxx2345" },
];

export const recentLogs = [
    { id: 101, time: "10:42 AM", date: "2026-02-24", user: "Caller #8821", symptom: "Chest Pain (Acute)", outcome: "Ambulance Dispatched", revenue: 2.50, status: "Critical", duration: "4:32" },
    { id: 102, time: "10:38 AM", date: "2026-02-24", user: "Caller #8820", symptom: "Mild Fever / Cough", outcome: "Home Care Advice", revenue: 0.50, status: "Resolved", duration: "2:15" },
    { id: 103, time: "10:35 AM", date: "2026-02-24", user: "Caller #8819", symptom: "Unclear Audio", outcome: "Retry Prompted", revenue: 0.00, status: "Failed", duration: "0:45" },
    { id: 104, time: "10:30 AM", date: "2026-02-24", user: "Caller #8818", symptom: "Dengue Symptoms", outcome: "Referral to PHC", revenue: 5.00, status: "Referral", duration: "6:10" },
    { id: 105, time: "10:22 AM", date: "2026-02-24", user: "Caller #8817", symptom: "Pregnancy Complication", outcome: "Ambulance Dispatched", revenue: 3.00, status: "Critical", duration: "5:20" },
    { id: 106, time: "10:15 AM", date: "2026-02-24", user: "Caller #8816", symptom: "Skin Rash / Allergy", outcome: "Home Care Advice", revenue: 0.50, status: "Resolved", duration: "3:05" },
    { id: 107, time: "10:08 AM", date: "2026-02-24", user: "Caller #8815", symptom: "Diabetic Emergency", outcome: "Hospital Referral", revenue: 4.50, status: "Referral", duration: "7:00" },
    { id: 108, time: "09:55 AM", date: "2026-02-24", user: "Caller #8814", symptom: "Snake Bite", outcome: "Ambulance Dispatched", revenue: 3.00, status: "Critical", duration: "2:30" },
    { id: 109, time: "09:48 AM", date: "2026-02-24", user: "Caller #8813", symptom: "High Blood Pressure", outcome: "Referral to PHC", revenue: 2.00, status: "Referral", duration: "4:45" },
    { id: 110, time: "09:40 AM", date: "2026-02-24", user: "Caller #8812", symptom: "Child Diarrhea", outcome: "Home Care Advice", revenue: 0.50, status: "Resolved", duration: "3:20" },
];

export const patients = [
    { id: "P001", name: "Ramesh K.", age: 45, gender: "Male", phone: "+91-9xxx1234", condition: "Cardiac Monitoring", visits: 3, status: "Active", lastVisit: "2026-02-24", hospital: "NIMS Hyderabad" },
    { id: "P002", name: "Lakshmi D.", age: 32, gender: "Female", phone: "+91-9xxx5678", condition: "Prenatal Care", visits: 7, status: "Active", lastVisit: "2026-02-23", hospital: "Gandhi Hospital" },
    { id: "P003", name: "Suresh M.", age: 58, gender: "Male", phone: "+91-9xxx9012", condition: "Diabetes Type 2", visits: 12, status: "Active", lastVisit: "2026-02-22", hospital: "Osmania Hospital" },
    { id: "P004", name: "Priya S.", age: 28, gender: "Female", phone: "+91-9xxx3456", condition: "Dengue Recovery", visits: 4, status: "Recovered", lastVisit: "2026-02-20", hospital: "Area Hospital Warangal" },
    { id: "P005", name: "Venkat R.", age: 62, gender: "Male", phone: "+91-9xxx7890", condition: "Post-Surgery Follow Up", visits: 2, status: "Active", lastVisit: "2026-02-24", hospital: "NIMS Hyderabad" },
    { id: "P006", name: "Anjali T.", age: 35, gender: "Female", phone: "+91-9xxx2345", condition: "Asthma Management", visits: 6, status: "Active", lastVisit: "2026-02-21", hospital: "Gandhi Hospital" },
    { id: "P007", name: "Raju P.", age: 50, gender: "Male", phone: "+91-9xxx6789", condition: "Hypertension", visits: 9, status: "Active", lastVisit: "2026-02-23", hospital: "Osmania Hospital" },
    { id: "P008", name: "Kavita N.", age: 40, gender: "Female", phone: "+91-9xxx0123", condition: "Thyroid Disorder", visits: 5, status: "Active", lastVisit: "2026-02-22", hospital: "Area Hospital Karimnagar" },
];

export const ambulances = [
    { id: "AMB-01", vehicle: "KA-01-XX-1234", driver: "Ravi Kumar", status: "Dispatched", location: "Warangal Rural", eta: "6 min", patient: "Caller #8821", hospital: "Area Hospital Warangal", fuel: 72 },
    { id: "AMB-02", vehicle: "TS-09-YY-5678", driver: "Mohan Das", status: "En Route", location: "Adilabad", eta: "12 min", patient: "Caller #9902", hospital: "District Hospital Adilabad", fuel: 85 },
    { id: "AMB-03", vehicle: "TS-05-ZZ-9012", driver: "Sunil Yadav", status: "Available", location: "Karimnagar Hub", eta: "-", patient: "-", hospital: "-", fuel: 95 },
    { id: "AMB-04", vehicle: "TS-12-AA-3456", driver: "Prasad G.", status: "Returning", location: "Khammam", eta: "18 min", patient: "-", hospital: "Govt Hospital Khammam", fuel: 40 },
    { id: "AMB-05", vehicle: "TS-07-BB-7890", driver: "Naresh B.", status: "Dispatched", location: "Nalgonda", eta: "8 min", patient: "Caller #8814", hospital: "Area Hospital Nalgonda", fuel: 60 },
    { id: "AMB-06", vehicle: "TS-14-CC-2345", driver: "Srinivas T.", status: "Available", location: "Nizamabad Hub", eta: "-", patient: "-", hospital: "-", fuel: 90 },
    { id: "AMB-07", vehicle: "TS-03-DD-6789", driver: "Kishore M.", status: "Maintenance", location: "Central Depot", eta: "-", patient: "-", hospital: "-", fuel: 15 },
];

export const revenueData = {
    today: 1240.50,
    yesterday: 1105.00,
    thisWeek: 7832.75,
    thisMonth: 31250.00,
    lastMonth: 28900.50,
    perCallAvg: 2.15,
    sources: [
        { name: "Triage Consultations", amount: 15200, percent: 48.6 },
        { name: "Emergency Dispatches", amount: 8500, percent: 27.2 },
        { name: "Hospital Referrals", amount: 4800, percent: 15.4 },
        { name: "Follow-up Calls", amount: 2750, percent: 8.8 },
    ],
    monthly: [
        { month: "Sep", amount: 18500 },
        { month: "Oct", amount: 22100 },
        { month: "Nov", amount: 25400 },
        { month: "Dec", amount: 27600 },
        { month: "Jan", amount: 28900 },
        { month: "Feb", amount: 31250 },
    ],
};

export const kpiData = {
    totalCalls: 14582,
    callsToday: 247,
    avgCallDuration: "3:42",
    successRate: 94.2,
    activeUsers: 1842,
    newUsersToday: 38,
    treatmentActive: 326,
    treatmentCompleted: 516,
    ambulancesTotal: 7,
    ambulancesActive: 3,
    avgResponseTime: "8 min",
    hospitalsConnected: 24,
};

export const chartBars = [20, 35, 45, 30, 50, 65, 45, 60, 80, 95, 75, 55, 40, 60, 45, 30];
