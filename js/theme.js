/* ================================
   THEME MANAGEMENT
   ================================ */

// Initialize theme
function initTheme() {
    const savedTheme = getTheme();
    applyTheme(savedTheme);
    
    // Setup toggle button
    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            saveTheme(newTheme);
            playSound('click');
            hapticFeedback('light');
        });
    }
}

// Apply theme
function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
    
    // Update meta theme color
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
        metaTheme.content = theme === 'light' ? '#F5F1E8' : '#0A0E27';
    }
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    saveTheme(newTheme);
}