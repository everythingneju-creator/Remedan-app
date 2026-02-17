/* ================================
   APP INITIALIZATION
   ================================ */

// Initialize app on load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Ramadan App Initialized');
    
    // Check and reset tracker if new day
    checkAndResetTracker();
});

// Check if it's a new day and reset tracker
function checkAndResetTracker() {
    const lastDate = localStorage.getItem('lastTrackerDate');
    const today = new Date().toDateString();
    
    if (lastDate !== today) {
        // New day - reset tracker
        const dayInfo = getCurrentRamadanDay();
        if (dayInfo.isRamadan) {
            resetTodayTracker();
            localStorage.setItem('lastTrackerDate', today);
        }
    }
}

// Sound playback helper
function playSound(soundName) {
    try {
        const audio = new Audio(`assets/sounds/${soundName}.mp3`);
        audio.volume = 0.5;
        audio.play().catch(e => {
            console.log('Sound play failed (this is normal):', e.message);
        });
    } catch (error) {
        console.log('Sound error:', error.message);
    }
}

// Haptic feedback (for mobile)
function hapticFeedback(type = 'light') {
    if (navigator.vibrate) {
        const patterns = {
            light: [10],
            medium: [20],
            heavy: [30],
            success: [10, 50, 10]
        };
        navigator.vibrate(patterns[type] || patterns.light);
    }
}

// Show toast notification
function showToast(message, duration = 2000) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 90px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--bg-card);
        color: var(--text-primary);
        padding: 12px 24px;
        border-radius: 24px;
        box-shadow: var(--shadow-strong);
        border: 1px solid var(--border-subtle);
        z-index: 10000;
        font-size: 14px;
        opacity: 0;
        transition: opacity 0.3s ease;
        max-width: 80%;
        text-align: center;
    `;
    
    document.body.appendChild(toast);
    
    // Fade in
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 10);
    
    // Fade out and remove
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}

// Format time (HH:MM)
function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

// Convert 24h to 12h format
function formatTime12h(time24) {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
}

// Get greeting based on time
function getGreeting() {
    const hour = new Date().getHours();
    
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    if (hour < 21) return 'Good Evening';
    return 'Good Night';
}

// Format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Copy to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copied to clipboard');
        }).catch(err => {
            console.error('Copy failed:', err);
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showToast('Copied to clipboard');
        } catch (err) {
            console.error('Copy failed:', err);
        }
        document.body.removeChild(textArea);
    }
}

// Check if app is running in Capacitor
function isCapacitor() {
    return window.Capacitor !== undefined;
}

// Log for debugging
function debugLog(message, data) {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log(`[DEBUG] ${message}`, data || '');
    }
}