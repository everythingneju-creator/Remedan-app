/* ================================
   RAMADAN DAY CALCULATION ENGINE
   ================================ */

// Ramadan 1447 dates (Feb 28 - Mar 29, 2026)
const RAMADAN_START = new Date('2026-02-18T00:00:00');
const RAMADAN_END = new Date('2026-03-19T23:59:59');

const TOTAL_DAYS = 30;

// Hijri months
const HIJRI_MONTHS = [
    'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Shaban',
    'Ramadan', 'Shawwal', 'Dhul-Qadah', 'Dhul-Hijjah'
];

// Get current Ramadan day info
function getCurrentRamadanDay() {
    const now = new Date();
    const isBeforeRamadan = now < RAMADAN_START;
    const isAfterRamadan = now > RAMADAN_END;
    const isRamadan = !isBeforeRamadan && !isAfterRamadan;
    
    let dayNumber = 0;
    let dayText = '';
    let hijriDate = '';
    let gregorianDate = '';
    
    if (isBeforeRamadan) {
        // Before Ramadan
        const daysUntil = Math.ceil((RAMADAN_START - now) / (1000 * 60 * 60 * 24));
        dayText = `Ramadan starts in ${daysUntil} day${daysUntil !== 1 ? 's' : ''}`;
        gregorianDate = formatDate(now);
        hijriDate = 'شعبان ١٤٤٧'; // Shaban 1447
    } else if (isAfterRamadan) {
        // After Ramadan
        dayText = 'Ramadan 1447 has ended';
        gregorianDate = formatDate(now);
        hijriDate = 'شوال ١٤٤٧'; // Shawwal 1447
    } else {
        // During Ramadan
        dayNumber = Math.floor((now - RAMADAN_START) / (1000 * 60 * 60 * 24)) + 1;
        dayNumber = Math.min(dayNumber, TOTAL_DAYS); // Cap at 30
        
        dayText = `Day ${dayNumber} of ${TOTAL_DAYS}`;
        gregorianDate = formatDate(now);
        hijriDate = convertToHijri(dayNumber);
    }
    
    return {
        dayNumber,
        dayText,
        hijriDate,
        gregorianDate,
        isRamadan,
        isBeforeRamadan,
        isAfterRamadan,
        totalDays: TOTAL_DAYS
    };
}

// Convert day number to Hijri date
function convertToHijri(dayNumber) {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    const dayStr = String(dayNumber).split('').map(d => arabicNumerals[parseInt(d)]).join('');
    return `${dayStr} رمضان ١٤٤٧`;
}

// Get today's Ayah
function getTodayAyah() {
    const dayInfo = getCurrentRamadanDay();
    
    // If before or after Ramadan, return first ayah
    if (!dayInfo.isRamadan) {
        return AYAHS_DATA[0];
    }
    
    const index = dayInfo.dayNumber - 1;
    return AYAHS_DATA[index] || AYAHS_DATA[0];
}

// Get today's Dua
function getTodayDua() {
    const dayInfo = getCurrentRamadanDay();
    
    // If before or after Ramadan, return first dua
    if (!dayInfo.isRamadan) {
        return DUAS_DATA[0];
    }
    
    const index = dayInfo.dayNumber - 1;
    return DUAS_DATA[index] || DUAS_DATA[0];
}

// Get today's Message
function getTodayMessage() {
    const dayInfo = getCurrentRamadanDay();
    
    // If before or after Ramadan, return first message
    if (!dayInfo.isRamadan) {
        return MESSAGES_DATA[0];
    }
    
    const index = dayInfo.dayNumber - 1;
    return MESSAGES_DATA[index] || MESSAGES_DATA[0];
}

// Check if it's a new Ramadan day (for reset)
function isNewRamadanDay() {
    const lastCheckDate = localStorage.getItem('lastRamadanCheck');
    const today = new Date().toDateString();
    
    if (lastCheckDate !== today) {
        localStorage.setItem('lastRamadanCheck', today);
        return true;
    }
    
    return false;
}