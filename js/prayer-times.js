/* ================================
   PRAYER TIMES CALCULATION
   ================================ */

// Initialize prayer times
function initPrayerTimes(forceUpdate = false) {
    const widget = document.getElementById('prayerTimesWidget');
    if (!widget) return;
    
    const stored = getPrayerTimes();
    const today = new Date().toDateString();
    
    // Use cached times if available and not forcing update
    if (!forceUpdate && stored && stored.date === today && stored.times) {
        displayPrayerTimes(stored.times, stored.location);
        return;
    }
    
    // Get location and calculate
    getLocationAndCalculate();
}

// Get location and calculate prayer times
function getLocationAndCalculate() {
    const locationDisplay = document.getElementById('locationDisplay');
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                // Get city name from coordinates (reverse geocoding)
                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
                    .then(response => response.json())
                    .then(data => {
                        const city = data.address.city || data.address.town || data.address.village || 'Gojjam';
                        const country = data.address.country || 'Ethiopia';
                        
                        calculatePrayerTimes(lat, lng, city, country);
                    })
                    .catch(error => {
                        console.log('Geocoding failed, using default location');
                        // Default to Gojjam coordinates
                        calculatePrayerTimes(11.5, 37.4, 'Gojjam', 'Ethiopia');
                    });
            },
            function(error) {
                console.log('Geolocation failed:', error);
                showToast('Location access denied. Using Gojjam, Ethiopia.');
                // Default to Gojjam coordinates
                calculatePrayerTimes(11.5, 37.4, 'Gojjam', 'Ethiopia');
            }
        );
    } else {
        console.log('Geolocation not supported');
        showToast('Geolocation not supported. Using Gojjam, Ethiopia.');
        calculatePrayerTimes(11.5, 37.4, 'Gojjam', 'Ethiopia');
    }
}

// Calculate prayer times using simple astronomical calculation
function calculatePrayerTimes(lat, lng, city, country) {
    const today = new Date();
    const times = {};
    
    // Simplified prayer time calculation
    // Using approximate times for Ethiopia (Muslim World League method)
    
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const declination = 23.45 * Math.sin((360/365) * (dayOfYear - 81) * Math.PI / 180);
    
    // Calculate sunrise and sunset
    const equation = -Math.tan(lat * Math.PI / 180) * Math.tan(declination * Math.PI / 180);
    const hourAngle = Math.acos(Math.max(-1, Math.min(1, equation))) * 180 / Math.PI;
    
    const sunrise = 12 - hourAngle / 15 - lng / 15 + 3; // +3 for Ethiopia timezone
    const sunset = 12 + hourAngle / 15 - lng / 15 + 3;
    
    // Calculate prayer times
    times.fajr = formatPrayerTime(sunrise - 1.5); // 1.5 hours before sunrise
    times.sunrise = formatPrayerTime(sunrise);
    times.dhuhr = formatPrayerTime(12 - lng / 15 + 3); // Solar noon
    times.asr = formatPrayerTime(12 - lng / 15 + 3 + 5.5); // Afternoon
    times.maghrib = formatPrayerTime(sunset);
    times.isha = formatPrayerTime(sunset + 1.5); // 1.5 hours after sunset
    
    // Save to storage
    const prayerData = {
        date: today.toDateString(),
        times: times,
        location: `${city}, ${country}`
    };
    savePrayerTimes(prayerData);
    
    // Display
    displayPrayerTimes(times, prayerData.location);
}

// Format time as HH:MM
function formatPrayerTime(decimalHours) {
    let hours = Math.floor(decimalHours);
    let minutes = Math.floor((decimalHours - hours) * 60);
    
    // Handle overflow
    if (hours >= 24) hours -= 24;
    if (hours < 0) hours += 24;
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

// Display prayer times
function displayPrayerTimes(times, location) {
    const grid = document.getElementById('prayerTimesGrid');
    const locationDisplay = document.getElementById('locationDisplay');
    
    if (!grid) return;
    
    const prayers = [
        { name: 'Fajr', time: times.fajr },
        { name: 'Dhuhr', time: times.dhuhr },
        { name: 'Asr', time: times.asr },
        { name: 'Maghrib', time: times.maghrib },
        { name: 'Isha', time: times.isha }
    ];
    
    grid.innerHTML = '';
    
    prayers.forEach(prayer => {
        const item = document.createElement('div');
        item.className = 'prayer-time-item';
        item.innerHTML = `
            <span class="prayer-name">${prayer.name}</span>
            <span class="prayer-time">${formatTime12h(prayer.time)}</span>
        `;
        grid.appendChild(item);
    });
    
    if (locationDisplay && location) {
        locationDisplay.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${location}`;
    }
}