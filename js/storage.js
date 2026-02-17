/* ================================
   LOCAL STORAGE MANAGEMENT
   ================================ */

const STORAGE_KEYS = {
    TRACKER_DATA: 'ramadan_tracker_data',
    THEME: 'ramadan_theme',
    LOCATION: 'ramadan_location',
    PRAYER_TIMES: 'ramadan_prayer_times',
    CUSTOM_TASKS: 'ramadan_custom_tasks'
};

// Get data from localStorage
function getStorageData(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Storage read error:', error);
        return null;
    }
}

// Save data to localStorage
function setStorageData(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Storage write error:', error);
        return false;
    }
}

// Remove data from localStorage
function removeStorageData(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Storage remove error:', error);
        return false;
    }
}

// Clear all app data
function clearAllData() {
    try {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
        return true;
    } catch (error) {
        console.error('Storage clear error:', error);
        return false;
    }
}

// Get theme
function getTheme() {
    return getStorageData(STORAGE_KEYS.THEME) || 'dark';
}

// Save theme
function saveTheme(theme) {
    return setStorageData(STORAGE_KEYS.THEME, theme);
}

// Get location
function getLocation() {
    return getStorageData(STORAGE_KEYS.LOCATION);
}

// Save location
function saveLocation(locationData) {
    return setStorageData(STORAGE_KEYS.LOCATION, locationData);
}

// Get prayer times
function getPrayerTimes() {
    return getStorageData(STORAGE_KEYS.PRAYER_TIMES);
}

// Save prayer times
function savePrayerTimes(times) {
    return setStorageData(STORAGE_KEYS.PRAYER_TIMES, times);
}

// Get custom tasks
function getCustomTasks() {
    return getStorageData(STORAGE_KEYS.CUSTOM_TASKS) || [];
}

// Save custom tasks
function saveCustomTasks(tasks) {
    return setStorageData(STORAGE_KEYS.CUSTOM_TASKS, tasks);
}

// Add custom task
function addCustomTask(taskName) {
    const tasks = getCustomTasks();
    const newTask = {
        id: Date.now(),
        name: taskName,
        createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    saveCustomTasks(tasks);
    return newTask;
}

// Delete custom task
function deleteCustomTask(taskId) {
    const tasks = getCustomTasks();
    const filtered = tasks.filter(task => task.id !== taskId);
    saveCustomTasks(filtered);
    return true;
}