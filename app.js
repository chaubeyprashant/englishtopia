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
const HOME_PAGE = "homepage.html";
const LANDING_PAGE = "index.html";

// API Configuration
const API_BASE_URL = (window.location.protocol === 'file:') ? 'http://localhost:3000' : '';

const navItems = [
  { href: HOME_PAGE, label: "Home" },
  { href: "quizzes.html", label: "Quizzes" },
  { href: "level-test.html", label: "Test" },
  { href: "videos.html", label: "Videos" },
  { href: "books.html", label: "Books" },
  { href: "translator.html", label: "Translator" },
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
/**
 * Registers a new user via API.
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Result>}
 */
async function signupUser(username, email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    return await response.json();
  } catch (error) {
    console.error('Signup error:', error);
    return { success: false, message: 'Server connection failed. Is Node running?' };
  }
}

/**
 * Authenticates a user login and sets session keys on success.
 * @param {string} email
 * @param {string} password
 * @returns {Result}
 */
/**
 * Authenticates a user via API.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Result>}
 */
async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const result = await response.json();

    if (result.success) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(result.user));
    }
    return result;
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Server connection failed' };
  }
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

/**
 * Gets the home page URL.
 * - If logged in: returns homepage.html
 * - If logged out: returns index.html (launch page)
 * @returns {string}
 */
function getHomeUrl() {
  return isLoggedIn() ? HOME_PAGE : LANDING_PAGE;
}

/**
 * Returns the current page filename (e.g. "index.html"). If not determinable, returns "".
 * @returns {string}
 */
function getCurrentPage() {
  try {
    // Prefer parsing from full href for file:// and odd hosting setups
    const href = String(window.location.href || "");
    const htmlMatch = href.match(/\/([^\/?#]+\.html)(?:[?#]|$)/i);
    if (htmlMatch && htmlMatch[1]) return htmlMatch[1];

    const path = String(window.location.pathname || "");
    const last = path.split("/").pop() || "";
    // Some servers may not include .html in the path; fall back to last segment anyway.
    return last;
  } catch {
    return "";
  }
}

/**
 * Normalizes a page identifier by stripping query/hash.
 * @param {string} page
 * @returns {string}
 */
function normalizePage(page) {
  return String(page || "").split("?")[0].split("#")[0];
}

/**
 * Returns whether the user is currently logged in.
 * @returns {boolean}
 */
function isLoggedIn() {
  return localStorage.getItem("loggedIn") === "true";
}

/**
 * Redirects to login page with an optional redirect target.
 * @param {string} [redirectTo]
 * @returns {void}
 */
function redirectToLogin(redirectTo) {
  const target = normalizePage(redirectTo || getCurrentPage() || "homepage.html");
  const url = `login.html?redirect=${encodeURIComponent(target)}`;
  window.location.replace(url);
}

/**
 * Enforces login for all non-public pages.
 * - If not logged in and on a protected page -> redirect to login
 * - If logged in and on login/signup/launch -> redirect to homepage
 * @returns {void}
 */
function enforceAuthGuard() {
  const href = String(window.location.href || "");
  // Force-detect common public pages even if pathname parsing is weird
  let page = normalizePage(getCurrentPage());
  // Netlify Pretty URLs may serve /signup instead of /signup.html, so allow both.
  const slug = (page || "").replace(/\.html$/i, "");
  const effectiveSlug = slug || "index";
  const publicSlugs = new Set(["index", "login", "signup"]);
  const isPublic = publicSlugs.has(effectiveSlug);

  if (!isLoggedIn() && !isPublic) {
    console.warn("[auth] redirecting to login", { page, slug: effectiveSlug, href });
    redirectToLogin(page || effectiveSlug);
    return;
  }

  if (isLoggedIn() && (effectiveSlug === "login" || effectiveSlug === "signup" || page === "login.html" || page === "signup.html")) {
    window.location.replace(getHomeUrl());
  }
}

// Run the auth guard as early as possible (prevents accessing protected pages before DOMContentLoaded)
try {
  enforceAuthGuard();
} catch (e) {
  console.warn("Auth guard failed:", e);
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
/**
 * Stores quiz results in localStorage and DB.
 * @param {QuizResults} results
 * @returns {Promise<void>}
 */
async function storeQuizResults(results) {
  // Always save to local for immediate UI access
  localStorage.setItem('quizResults', JSON.stringify(results));

  const user = getCurrentUser();
  if (user && user.id) {
    try {
      await fetch(`${API_BASE_URL}/api/results`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          quizType: results.quizType || 'practice',
          score: results.correctAnswers,
          total: results.totalQuestions,
          percentage: results.percentage,
          level: results.overallLevel || null
        })
      });
    } catch (e) {
      console.error('Failed to sync result to DB:', e);
    }
  }
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
 * Stores level test results in localStorage and DB.
 * @param {LevelTestResults} results
 * @returns {Promise<void>}
 */
async function storeLevelTestResults(results) {
  localStorage.setItem("levelTestResults", JSON.stringify(results));

  const user = getCurrentUser();
  if (user && user.id) {
    try {
      await fetch(`${API_BASE_URL}/api/results`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          quizType: 'level-test',
          score: results.correctAnswers,
          total: results.totalQuestions,
          percentage: results.percentage,
          level: results.overallLevel
        })
      });
    } catch (e) {
      console.error('Failed to save level test result:', e);
    }
  }
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
 * Level hierarchy for progress tracking
 * @type {string[]}
 */
const LEVEL_HIERARCHY = ["Beginner", "Elementary", "Intermediate", "Advanced"];

/**
 * Updates the highest level achieved if the new level is higher.
 * @param {string} newLevel - The level achieved (Beginner, Elementary, Intermediate, Advanced)
 * @returns {void}
 */
function updateHighestLevel(newLevel) {
  if (!newLevel) return;

  // Get current highest level, initializing if needed
  let currentHighest = localStorage.getItem("highestLevel");
  if (!currentHighest) {
    currentHighest = getHighestLevel(); // This will initialize from userLevel if available
  }

  const currentIndex = LEVEL_HIERARCHY.indexOf(currentHighest);
  const newIndex = LEVEL_HIERARCHY.indexOf(newLevel);

  // Only update if new level is higher than current highest
  if (newIndex > currentIndex) {
    localStorage.setItem("highestLevel", newLevel);
    console.log('Highest level updated to:', newLevel);
  }
}

/**
 * Gets the highest level achieved by the user.
 * @returns {string} The highest level achieved
 */
function getHighestLevel() {
  let highestLevel = localStorage.getItem("highestLevel");

  // If no highestLevel is set, try to initialize from userLevel
  if (!highestLevel) {
    const userLevel = localStorage.getItem("userLevel");
    if (userLevel && userLevel !== "Not tested yet") {
      // Map userLevel to standard level format if needed
      const levelMap = {
        "A1": "Beginner",
        "A2": "Elementary",
        "B1": "Elementary",
        "B": "Intermediate",
        "B+": "Intermediate",
        "C1": "Intermediate",
        "A": "Advanced"
      };

      const mappedLevel = levelMap[userLevel] || userLevel;

      // Check if it's a valid level
      if (LEVEL_HIERARCHY.includes(mappedLevel)) {
        highestLevel = mappedLevel;
        localStorage.setItem("highestLevel", highestLevel);
      } else {
        highestLevel = "Beginner";
      }
    } else {
      highestLevel = "Beginner";
    }
  }

  return highestLevel;
}

/**
 * Calculates progress percentage based on level.
 * @param {string} level - The level (Beginner, Elementary, Intermediate, Advanced)
 * @returns {number} Progress percentage (0-100)
 */
function getLevelProgress(level) {
  const index = LEVEL_HIERARCHY.indexOf(level);
  if (index === -1) return 0;
  // Beginner = 0%, Elementary = 33%, Intermediate = 67%, Advanced = 100%
  return Math.round((index / (LEVEL_HIERARCHY.length - 1)) * 100);
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

/**
 * Updates all home links on the page to use the correct URL based on login status.
 * Should be called after DOM is loaded.
 * @returns {void}
 */
function updateHomeLinks() {
  const homeLinks = document.querySelectorAll('a[href*="index.html"], a[href*="homepage.html"], .nav-button[href*="index"], .nav-button[href*="homepage"], #home-link');
  const homeUrl = getHomeUrl();

  homeLinks.forEach(link => {
    // If it's a sidebar home button or explicitly marked as home, set it to HOME_PAGE or correct URL
    const isSidebarHome = link.classList.contains('nav-button') && (link.textContent.includes('Home') || link.id === 'home-link');

    if (isSidebarHome) {
      // Force home button to go to the app's home if logged in, otherwise landing
      link.setAttribute('href', homeUrl);
    } else {
      const href = link.getAttribute('href');
      if (href && (href.includes('index.html') || href.includes('homepage.html'))) {
        link.setAttribute('href', homeUrl);
      }
    }
  });

  // Also update onclick handlers
  const homeButtons = document.querySelectorAll('button[onclick*="index.html"], button[onclick*="homepage.html"]');
  homeButtons.forEach(btn => {
    const onclick = btn.getAttribute('onclick');
    if (onclick) {
      btn.setAttribute('onclick', onclick.replace(/['"]index\.html['"]|['"]homepage\.html['"]/g, `'${homeUrl}'`));
    }
  });
}

// Update home links when app initializes
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateHomeLinks);
} else {
  updateHomeLinks();
}