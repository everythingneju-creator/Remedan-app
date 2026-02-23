/* ================================
   IBADAH TRACKER LOGIC
   ================================ */

// Default tracker items
const DEFAULT_TRACKER_ITEMS = [
    { id: 'fajr', name: 'Fajr Prayer', type: 'prayer', order: 1 },
    { id: 'dhuhr', name: 'Dhuhr Prayer', type: 'prayer', order: 2 },
    { id: 'asr', name: 'Asr Prayer', type: 'prayer', order: 3 },
    { id: 'maghrib', name: 'Maghrib Prayer', type: 'prayer', order: 4 },
    { id: 'isha', name: 'Isha Prayer', type: 'prayer', order: 5 },
    { id: 'quran', name: 'Quran Reading (1 page)', type: 'quran', order: 6 },
    { id: 'dhikr', name: 'Dhikr (100x)', type: 'dhikr', order: 7 },
    { id: 'dua', name: 'Daily Dua', type: 'dua', order: 8 }
];

// Get today's tracker progress
function getTodayProgress() {
    const today = new Date().toDateString();
    const stored = getStorageData(STORAGE_KEYS.TRACKER_DATA);
    
    // Check if we have data for today
    if (stored && stored.date === today) {
        // Sync with custom tasks (in case new ones were added)
        const customTasks = getCustomTasks();
        const existingCustomIds = stored.items
            .filter(item => item.type === 'custom')
            .map(item => item.customId);
        
        // Add any new custom tasks that aren't in the tracker yet
        customTasks.forEach((task, index) => {
            if (!existingCustomIds.includes(task.id)) {
                stored.items.push({
                    id: `custom_${task.id}`,
                    name: task.name,
                    type: 'custom',
                    order: 100 + index,
                    completed: false,
                    customId: task.id
                });
            }
        });
        
        // Remove deleted custom tasks
        stored.items = stored.items.filter(item => {
            if (item.type !== 'custom') {
                return true;
            }
            return customTasks.some(task => task.id === item.customId);
        });
        
        // Save updated tracker
        setStorageData(STORAGE_KEYS.TRACKER_DATA, stored);
        return stored;
    }
    
    // Create new tracker for today
    const newTracker = {
        date: today,
        items: DEFAULT_TRACKER_ITEMS.map(item => ({
            ...item,
            completed: false
        }))
    };
    
    // Add custom tasks
    const customTasks = getCustomTasks();
    customTasks.forEach((task, index) => {
        newTracker.items.push({
            id: `custom_${task.id}`,
            name: task.name,
            type: 'custom',
            order: 100 + index,
            completed: false,
            customId: task.id
        });
    });
    
    setStorageData(STORAGE_KEYS.TRACKER_DATA, newTracker);
    return newTracker;
}

// Toggle tracker item
function toggleTrackerItem(itemId) {
    const progress = getTodayProgress();
    const item = progress.items.find(i => i.id === itemId);
    
    if (item) {
        item.completed = !item.completed;
        setStorageData(STORAGE_KEYS.TRACKER_DATA, progress);
        
        // Play sound and haptic
        if (item.completed) {
            playSound('completion');
            hapticFeedback('success');
        } else {
            playSound('click');
            hapticFeedback('light');
        }
        
        return progress;
    }
    
    return null;
}

// Reset today's tracker
function resetTodayTracker() {
    const today = new Date().toDateString();
    const newTracker = {
        date: today,
        items: DEFAULT_TRACKER_ITEMS.map(item => ({
            ...item,
            completed: false
        }))
    };
    
    // Add custom tasks
    const customTasks = getCustomTasks();
    customTasks.forEach((task, index) => {
        newTracker.items.push({
            id: `custom_${task.id}`,
            name: task.name,
            type: 'custom',
            order: 100 + index,
            completed: false,
            customId: task.id
        });
    });
    
    setStorageData(STORAGE_KEYS.TRACKER_DATA, newTracker);
    playSound('click');
    return newTracker;
}

// Initialize tracker page (REMOVED - moved to HTML)
// This function is no longer needed as we handle it in tracker.html

// Reset today's tracker (FIXED VERSION)
function resetTodayTracker() {
    const today = new Date().toDateString();
    const newTracker = {
        date: today,
        items: DEFAULT_TRACKER_ITEMS.map(item => ({
            ...item,
            completed: false
        }))
    };
    
    // Add custom tasks
    const customTasks = getCustomTasks();
    customTasks.forEach((task, index) => {
        newTracker.items.push({
            id: `custom_${task.id}`,
            name: task.name,
            type: 'custom',
            order: 100 + index,
            completed: false,
            customId: task.id
        });
    });
    
    setStorageData(STORAGE_KEYS.TRACKER_DATA, newTracker);
    
    if (typeof playSound === 'function') {
        playSound('click');
    }
    
    return newTracker;
}