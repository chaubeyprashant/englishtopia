/* ===========================================
   UNOLINGO - MAIN JAVASCRIPT FILE
   =========================================== */

/**
 * @typedef {Object} User
 * @property {string} username
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} QuizResults
 * @property {string} quizId
 * @property {string} userEmail
 * @property {number[]} answers
 * @property {number} score
 * @property {string} completedAt
 */

/**
 * @typedef {Object} LevelTestResults
 * @property {string} level
 * @property {number} score
 * @property {string} completedAt
 */

/**
 * @typedef {Object} Result
 * @property {boolean} success
 * @property {string} [message]
 * @property {User} [user]
 */

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
 * Builds the navigation bar dynamically and marks current page as active.
 * Safe no-op if element `#navbar` is not present on the page.
 * @returns {void}
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
 * Retrieves all users from localStorage.
 * @returns {User[]} Array of user objects
 */
function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

/**
 * Saves users array to localStorage.
 * @param {User[]} users - Array of user objects to save
 * @returns {void}
 */
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

/**
 * Registers a new user after basic duplicate email check.
 * Note: Prototype only; passwords are stored in plaintext locally.
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @returns {Result}
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
 * Authenticates a user login and sets session keys on success.
 * @param {string} email
 * @param {string} password
 * @returns {Result}
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
 * Logs out the current user by removing client-side session keys.
 * @returns {void}
 */
function logoutUser() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("currentUser");
}

/**
 * Gets the currently logged-in user (if any).
 * @returns {User|null}
 */
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser") || "null");
}

/* ===========================================
   UTILITY FUNCTIONS
   =========================================== */

/**
 * Universal event listener helper for click and touchstart.
 * @param {string} selector - CSS selector for elements to attach listeners to
 * @param {string} action - Description of the action for logging
 * @param {() => void} callback - Function to execute when event is triggered
 * @returns {void}
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
 * Sets up navigation event listeners for sidebar/header navigation.
 * Should be called on each page to enable navigation.
 * @returns {void}
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
 * Validates email format.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates password strength (prototype: minimum length only).
 * @param {string} password
 * @returns {{success: boolean, message: string}}
 */
function validatePassword(password) {
  if (password.length < 6) {
    return { success: false, message: "Password must be at least 6 characters long" };
  }
  return { success: true, message: "Password is valid" };
}

/**
 * Shows a message to the user in a target element.
 * @param {string} message
 * @param {('success'|'error'|'info')} [type='info']
 * @param {string} [elementId='message']
 * @returns {void}
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
 * Stores quiz results in localStorage.
 * @param {QuizResults} results
 * @returns {void}
 */
function storeQuizResults(results) {
  localStorage.setItem('quizResults', JSON.stringify(results));
}

/**
 * Retrieves quiz results from localStorage (latest attempt).
 * @returns {QuizResults|null}
 */
function getQuizResults() {
  const results = localStorage.getItem('quizResults');
  return results ? JSON.parse(results) : null;
}

/**
 * Stores level test results in localStorage.
 * @param {LevelTestResults} results
 * @returns {void}
 */
function storeLevelTestResults(results) {
  localStorage.setItem("levelTestResults", JSON.stringify(results));
}

/**
 * Retrieves level test results from localStorage (latest result).
 * @returns {LevelTestResults|null}
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
 * Changes the font family for the entire application and persists the choice.
 * @param {string} font
 * @returns {void}
 */
function changeFont(font) {
  document.body.style.fontFamily = font || 'Inter, sans-serif';
  // Store font preference in localStorage
  localStorage.setItem('preferredFont', font);
}

/**
 * Resets all user data from localStorage.
 * @returns {boolean}
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
 * Deletes user account and all associated data (same as reset for prototype).
 * @returns {boolean}
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
 * Initialization entrypoint. Applies preferences, wires navigation, reports session state.
 * @returns {void}
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