/* ================================
   NOTIFICATIONS & REMINDERS
   Version 2.1 - FIXED PERSISTENT
   ================================ */

// Check if notifications are supported
function isNotificationSupported() {
    return 'Notification' in window;
}

// Request notification permission
async function requestNotificationPermission() {
    if (!isNotificationSupported()) {
        console.log('Notifications not supported');
        return false;
    }
    
    if (Notification.permission === 'granted') {
        return true;
    }
    
    if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
    }
    
    return false;
}

// Show notification permission dialog
function showNotificationPermissionDialog() {
    const hasAsked = localStorage.getItem('notification_permission_asked');
    
    if (hasAsked === 'true') return;
    
    const dialog = document.createElement('div');
    dialog.className = 'permission-dialog-overlay';
    dialog.innerHTML = `
        <div class="permission-dialog">
            <div class="permission-icon">
                <i class="fas fa-bell"></i>
            </div>
            <h2 class="permission-title">Enable Prayer Notifications?</h2>
            <p class="permission-text">Get notified with Adhan sound when it's prayer time, even when the app is closed.</p>
            <div class="permission-actions">
                <button class="permission-btn permission-btn-cancel" id="notifDecline">Not Now</button>
                <button class="permission-btn permission-btn-confirm" id="notifAllow">Allow</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(dialog);
    
    const style = document.createElement('style');
    style.textContent = `
        .permission-dialog-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(10, 14, 39, 0.95);
            backdrop-filter: blur(8px);
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }
        
        .permission-dialog {
            background: var(--bg-card);
            border-radius: 20px;
            padding: 32px 24px;
            width: 90%;
            max-width: 380px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            border: 1px solid var(--border-subtle);
            text-align: center;
        }
        
        .permission-icon {
            width: 64px;
            height: 64px;
            background: var(--glow-gold);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
        }
        
        .permission-icon i {
            font-size: 28px;
            color: var(--accent-gold);
        }
        
        .permission-title {
            font-size: 20px;
            color: var(--text-primary);
            margin-bottom: 12px;
        }
        
        .permission-text {
            font-size: 14px;
            color: var(--text-secondary);
            line-height: 1.6;
            margin-bottom: 24px;
        }
        
        .permission-actions {
            display: flex;
            gap: 12px;
        }
        
        .permission-btn {
            flex: 1;
            padding: 14px;
            border-radius: 12px;
            font-size: 15px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            border: none;
            font-family: var(--font-english);
        }
        
        .permission-btn-cancel {
            background: var(--bg-secondary);
            color: var(--text-secondary);
            border: 1px solid var(--border-subtle);
        }
        
        .permission-btn-confirm {
            background: linear-gradient(135deg, #D4AF37 0%, #B8963C 100%);
            color: #0A0E27;
        }
        
        body.light-theme .permission-btn-confirm {
            color: white;
        }
    `;
    document.head.appendChild(style);
    
    const allowBtn = document.getElementById('notifAllow');
    const declineBtn = document.getElementById('notifDecline');
    
    if (allowBtn) {
        allowBtn.addEventListener('click', async function() {
            const granted = await requestNotificationPermission();
            localStorage.setItem('notification_permission_asked', 'true');
            if (granted) {
                localStorage.setItem('adhan_enabled', 'true');
                alert('✅ Prayer notifications enabled!');
                schedulePrayerNotifications();
            } else {
                alert('❌ Permission denied. You can enable it later in settings.');
            }
            dialog.remove();
        });
    }
    
    if (declineBtn) {
        declineBtn.addEventListener('click', function() {
            localStorage.setItem('notification_permission_asked', 'true');
            localStorage.setItem('adhan_enabled', 'false');
            dialog.remove();
        });
    }
}

function getAdhanSettings() {
    const settings = localStorage.getItem('adhan_settings');
    if (settings) {
        return JSON.parse(settings);
    }
    
    return {
        fajr: true,
        dhuhr: true,
        asr: true,
        maghrib: true,
        isha: true
    };
}

function saveAdhanSettings(settings) {
    localStorage.setItem('adhan_settings', JSON.stringify(settings));
}

function isAdhanEnabled() {
    return localStorage.getItem('adhan_enabled') === 'true';
}

function schedulePrayerNotifications() {
    if (!isAdhanEnabled()) return;
    
    const prayerTimes = getPrayerTimes();
    if (!prayerTimes || !prayerTimes.times) return;
    
    const settings = getAdhanSettings();
    const now = new Date();
    
    Object.keys(prayerTimes.times).forEach(prayer => {
        if (prayer === 'sunrise') return;
        
        if (!settings[prayer]) return;
        
        const time = prayerTimes.times[prayer];
        const [hours, minutes] = time.split(':');
        const prayerTime = new Date();
        prayerTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        
        if (prayerTime <= now) return;
        
        const delay = prayerTime - now;
        
        console.log(`Scheduling ${prayer} notification in ${Math.round(delay/1000/60)} minutes`);
        
        setTimeout(() => {
            showPrayerNotification(prayer, time);
        }, delay);
    });
}

function showPrayerNotification(prayer, time) {
    if (!isAdhanEnabled()) return;
    
    console.log('Showing prayer notification for:', prayer);
    
    const prayerNames = {
        fajr: 'Fajr',
        dhuhr: 'Dhuhr',
        asr: 'Asr',
        maghrib: 'Maghrib',
        isha: 'Isha'
    };
    
    const title = `${prayerNames[prayer]} Prayer Time`;
    const body = `It's time for ${prayerNames[prayer]} prayer`;
    
    playAdhan(prayer);
    
    if (Notification.permission === 'granted') {
        const notification = new Notification(title, {
            body: body,
            icon: 'assets/icons/icon-192.png',
            badge: 'assets/icons/icon-192.png',
            tag: `prayer-${prayer}`,
            requireInteraction: true
        });
        
        notification.onclick = function() {
            window.focus();
            notification.close();
            stopAdhan();
        };
    }
    
    showInAppPrayerNotification(prayerNames[prayer], time);
}

let adhanAudio = null;

function playAdhan(prayer) {
    stopAdhan();
    
    const adhanFile = prayer === 'fajr' ? 'adhan-fajr.mp3' : 'adhan.mp3';
    
    adhanAudio = new Audio(`assets/sounds/${adhanFile}`);
    adhanAudio.loop = false;
    adhanAudio.volume = 0.8;
    
    adhanAudio.play().catch(err => {
        console.log('Adhan play failed:', err);
    });
    
    setTimeout(() => {
        stopAdhan();
    }, 5 * 60 * 1000);
}

function stopAdhan() {
    if (adhanAudio) {
        adhanAudio.pause();
        adhanAudio.currentTime = 0;
        adhanAudio = null;
    }
}

function showInAppPrayerNotification(prayerName, time) {
    const existing = document.querySelector('.prayer-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'prayer-notification';
    notification.innerHTML = `
        <div class="prayer-notification-content">
            <div class="prayer-notification-icon">
                <i class="fas fa-mosque"></i>
            </div>
            <div class="prayer-notification-text">
                <div class="prayer-notification-title">${prayerName} Prayer Time</div>
                <div class="prayer-notification-time">${time}</div>
            </div>
            <button class="prayer-notification-dismiss" onclick="dismissPrayerNotification()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    if (!document.getElementById('prayer-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'prayer-notification-styles';
        style.textContent = `
            .prayer-notification {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 99998;
                animation: slideDown 0.4s ease;
            }
            
            .prayer-notification-content {
                background: var(--bg-card);
                border-radius: 16px;
                padding: 16px 20px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                border: 2px solid var(--accent-gold);
                display: flex;
                align-items: center;
                gap: 12px;
                min-width: 280px;
            }
            
            .prayer-notification-icon {
                width: 48px;
                height: 48px;
                background: var(--glow-gold);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }
            
            .prayer-notification-icon i {
                font-size: 20px;
                color: var(--accent-gold);
            }
            
            .prayer-notification-text {
                flex: 1;
            }
            
            .prayer-notification-title {
                font-size: 15px;
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: 2px;
            }
            
            .prayer-notification-time {
                font-size: 13px;
                color: var(--accent-gold);
            }
            
            .prayer-notification-dismiss {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: transparent;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            }
            
            .prayer-notification-dismiss:hover {
                background: var(--glow-gold);
                color: var(--accent-gold);
            }
            
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function dismissPrayerNotification() {
    const notification = document.querySelector('.prayer-notification');
    if (notification) {
        notification.remove();
    }
    stopAdhan();
}

// FIXED: Task reminder with persistence
function setTaskReminder(taskId, taskName, time) {
    console.log('Setting reminder for:', taskName, 'at', time);
    
    const reminders = getTaskReminders();
    reminders[taskId] = {
        taskName: taskName,
        time: time,
        enabled: true
    };
    localStorage.setItem('task_reminders', JSON.stringify(reminders));
    
    // Schedule immediately
    scheduleTaskReminder(taskId, taskName, time);
    
    if (typeof showToast === 'function') {
        showToast(`⏰ Reminder set for ${formatTime12h(time)}`);
    } else {
        alert(`⏰ Reminder set for ${formatTime12h(time)}`);
    }
}

function getTaskReminders() {
    const reminders = localStorage.getItem('task_reminders');
    return reminders ? JSON.parse(reminders) : {};
}

// FIXED: Proper scheduling with persistence
function scheduleTaskReminder(taskId, taskName, time) {
    console.log('Scheduling reminder for:', taskName, 'at', time);
    
    const [hours, minutes] = time.split(':');
    const reminderTime = new Date();
    reminderTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    const now = new Date();
    
    // If time is in the past today, schedule for tomorrow
    if (reminderTime <= now) {
        reminderTime.setDate(reminderTime.getDate() + 1);
    }
    
    const delay = reminderTime - now;
    const minutesUntil = Math.round(delay / 1000 / 60);
    
    console.log(`Reminder will fire in ${minutesUntil} minutes`);
    
    setTimeout(() => {
        showTaskReminder(taskName, time);
        // Re-schedule for tomorrow
        scheduleTaskReminder(taskId, taskName, time);
    }, delay);
}

function showTaskReminder(taskName, time) {
    console.log('Showing task reminder for:', taskName);
    
    if (typeof playSound === 'function') {
        playSound('completion');
    }
    
    if (Notification.permission === 'granted') {
        const notification = new Notification('Ibadah Reminder ⏰', {
            body: `Time for: ${taskName}`,
            icon: 'assets/icons/icon-192.png',
            tag: `task-${taskName}`,
            requireInteraction: false
        });
        
        setTimeout(() => notification.close(), 10000);
    }
    
    if (typeof showToast === 'function') {
        showToast(`⏰ ${taskName} - ${formatTime12h(time)}`, 5000);
    } else {
        alert(`⏰ Time for: ${taskName}`);
    }
}

// FIXED: Initialize with restoration of all reminders
function initNotifications() {
    console.log('=== Initializing Notifications ===');
    
    // Show permission dialog after 2 seconds
    setTimeout(() => {
        const hasAsked = localStorage.getItem('notification_permission_asked');
        console.log('Has asked before:', hasAsked);
        
        if (hasAsked !== 'true') {
            showNotificationPermissionDialog();
        } else if (isAdhanEnabled()) {
            console.log('Scheduling prayer notifications...');
            schedulePrayerNotifications();
        }
    }, 2000);
    
    // FIXED: Restore ALL task reminders on page load
    console.log('Restoring task reminders...');
    const reminders = getTaskReminders();
    const reminderCount = Object.keys(reminders).length;
    console.log(`Found ${reminderCount} saved reminders`);
    
    Object.keys(reminders).forEach(taskId => {
        const reminder = reminders[taskId];
        if (reminder.enabled) {
            console.log(`Restoring reminder: ${reminder.taskName} at ${reminder.time}`);
            scheduleTaskReminder(taskId, reminder.taskName, reminder.time);
        }
    });
    
    console.log('=== Notifications Initialized ===');
}

// Helper function for 12h format
function formatTime12h(time24) {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
}

console.log('notifications.js loaded successfully');