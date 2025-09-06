/* ===========================================
   ENGLISHPTOPIA - MAIN JAVASCRIPT FILE
   =========================================== */

/**
 * Navigation Configuration
 * Defines the navigation items for the sidebar/header
 */
const navItems = [
  { href: "homepage.html", label: "Home" },
  { href: "quizzes.html", label: "Quizzes" },
  { href: "level-test.html", label: "Test" },
  { href: "videos.html", label: "Videos" },
  { href: "books.html", label: "Books" },
  { href: "profile.html", label: "Profile" },
  { href: "settings.html", label: "Settings" }
];

/**
 * Builds the navigation bar dynamically
 * This function creates navigation links and marks the current page as active
 */
function buildNavbar() {
  const nav = document.getElementById("navbar");
  if (!nav) return; // Exit if navbar element doesn't exist
  
  // Get the current page filename from the URL
  const current = window.location.pathname.split("/").pop();
  
  // Generate HTML for navigation items
  nav.innerHTML = navItems.map(
    item => `<a href="${item.href}" class="${item.href === current ? "active" : ""}">${item.label}</a>`
  ).join("");
}

// Initialize the navbar when the script loads
buildNavbar();

/* ===========================================
   AUTHENTICATION SYSTEM
   =========================================== */

/**
 * User Management Functions
 * These functions handle user registration, login, and session management
 */

/**
 * Retrieves all users from localStorage
 * @returns {Array} Array of user objects
 */
function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

/**
 * Saves users array to localStorage
 * @param {Array} users - Array of user objects to save
 */
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

/**
 * Registers a new user
 * @param {string} username - User's chosen username
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Object} Result object with success status and message
 */
function signupUser(username, email, password) {
  const users = getUsers();
  
  // Check if email already exists
  if (users.find(u => u.email === email)) {
    return { success: false, message: "Email already exists" };
  }
  
  // Add new user to the array
  users.push({ username, email, password });
  saveUsers(users);
  
  return { success: true, message: "Account created" };
}

/**
 * Authenticates a user login
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Object} Result object with success status, user data, and message
 */
function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Set login session
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));
    return { success: true, user };
  }
  
  return { success: false, message: "Invalid email or password" };
}

/**
 * Logs out the current user
 * Removes login session and user data from localStorage
 */
function logoutUser() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("currentUser");
}

/**
 * Gets the currently logged-in user
 * @returns {Object|null} Current user object or null if not logged in
 */
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser") || "null");
}

/* ===========================================
   UTILITY FUNCTIONS
   =========================================== */

/**
 * Universal Event Listener Function
 * Handles both click and touch events for better mobile support
 * @param {string} selector - CSS selector for elements to attach listeners to
 * @param {string} action - Description of the action for logging
 * @param {Function} callback - Function to execute when event is triggered
 */
function addEventListeners(selector, action, callback) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
    // Add click event listener
    element.addEventListener('click', () => {
      console.log(`${action} clicked`);
      callback();
    });
    
    // Add touch event listener for mobile devices
    element.addEventListener('touchstart', (e) => {
      e.preventDefault(); // Prevent click event from firing twice on touch devices
      console.log(`${action} tapped`);
      callback();
    });
  });
}

/**
 * Navigation Helper Functions
 * These functions provide consistent navigation behavior across all pages
 */

/**
 * Sets up navigation event listeners for sidebar/header navigation
 * This function should be called on each page to enable navigation
 */
function setupNavigation() {
  // Home navigation
  addEventListeners('[data-action="home"]', 'Home button', () => window.location.href = 'homepage.html');
  
  // Quizzes navigation
  addEventListeners('[data-action="quizzes"]', 'Quizzes button', () => window.location.href = 'quizzes.html');
  
  // Level test navigation
  addEventListeners('[data-action="test"]', 'Test button', () => window.location.href = 'level-test.html');
  
  // Videos navigation
  addEventListeners('[data-action="videos"]', 'Videos button', () => window.location.href = 'videos.html');
  
  // Books navigation
  addEventListeners('[data-action="books"]', 'Books button', () => window.location.href = 'books.html');
  
  // Profile navigation
  addEventListeners('[data-action="profile"]', 'Profile button', () => window.location.href = 'profile.html');
  
  // Settings navigation
  addEventListeners('[data-action="settings"]', 'Settings button', () => window.location.href = 'settings.html');
}

/**
 * Form Validation Helper
 * Provides common validation functions for forms
 */

/**
 * Validates email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid, false otherwise
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with success status and message
 */
function validatePassword(password) {
  if (password.length < 6) {
    return { success: false, message: "Password must be at least 6 characters long" };
  }
  return { success: true, message: "Password is valid" };
}

/**
 * Shows a message to the user
 * @param {string} message - Message to display
 * @param {string} type - Type of message ('success', 'error', 'info')
 * @param {string} elementId - ID of the element to display the message in
 */
function showMessage(message, type = 'info', elementId = 'message') {
  const messageElement = document.getElementById(elementId);
  if (!messageElement) return;
  
  messageElement.textContent = message;
  messageElement.style.color = type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#6b7280';
}

/**
 * Quiz and Test Management Functions
 * These functions handle quiz data and test results
 */

/**
 * Stores quiz results in localStorage
 * @param {Object} results - Quiz results object
 */
function storeQuizResults(results) {
  localStorage.setItem('quizResults', JSON.stringify(results));
}

/**
 * Retrieves quiz results from localStorage
 * @returns {Object|null} Quiz results object or null if not found
 */
function getQuizResults() {
  const results = localStorage.getItem('quizResults');
  return results ? JSON.parse(results) : null;
}

/**
 * Stores level test results in localStorage
 * @param {Object} results - Level test results object
 */
function storeLevelTestResults(results) {
  localStorage.setItem("levelTestResults", JSON.stringify(results));
}

/**
 * Retrieves level test results from localStorage
 * @returns {Object|null} Level test results object or null if not found
 */
function getLevelTestResults() {
  const results = localStorage.getItem("levelTestResults");
  return results ? JSON.parse(results) : null;
}

/**
 * Settings Management Functions
 * These functions handle user preferences and settings
 */

/**
 * Changes the font family for the entire application
 * @param {string} font - Font family to apply
 */
function changeFont(font) {
  document.body.style.fontFamily = font || 'Inter, sans-serif';
  // Store font preference in localStorage
  localStorage.setItem('preferredFont', font);
}

/**
 * Resets all user data from localStorage
 * @returns {boolean} True if reset was successful
 */
function resetData() {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error resetting data:', error);
    return false;
  }
}

/**
 * Deletes user account and all associated data
 * @returns {boolean} True if deletion was successful
 */
function deleteAccount() {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error deleting account:', error);
    return false;
  }
}

/**
 * Initialization Function
 * Sets up the application when the DOM is loaded
 */
function initializeApp() {
  // Apply saved font preference
  const savedFont = localStorage.getItem('preferredFont');
  if (savedFont) {
    changeFont(savedFont);
  }
  
  // Setup navigation
  setupNavigation();
  
  // Check if user is logged in and update UI accordingly
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  if (isLoggedIn) {
    // User is logged in - update any UI elements that depend on login state
    console.log('User is logged in');
  }
}

// Initialize the app when the DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}