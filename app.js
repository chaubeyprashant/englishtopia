// Navbar generator
const navItems = [
    { href: "index.html", label: "Home" },
    { href: "quizzes.html", label: "Quizzes" },
    { href: "level-test.html", label: "Test" },
    { href: "videos.html", label: "Videos" },
    { href: "books.html", label: "Books" },
    { href: "profile.html", label: "Profile" },
    { href: "settings.html", label: "Settings" }
  ];
  
  function buildNavbar() {
    const nav = document.getElementById("navbar");
    if (!nav) return;
    const current = window.location.pathname.split("/").pop();
    nav.innerHTML = navItems.map(
      item => `<a href="${item.href}" class="${item.href === current ? "active" : ""}">${item.label}</a>`
    ).join("");
  }
  buildNavbar();
  
  // --- Auth logic ---
  function getUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
  }
  function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }
  function signupUser(username, email, password) {
    const users = getUsers();
    if (users.find(u => u.email === email)) {
      return { success: false, message: "Email already exists" };
    }
    users.push({ username, email, password });
    saveUsers(users);
    return { success: true, message: "Account created" };
  }
  function loginUser(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, message: "Invalid email or password" };
  }
  function logoutUser() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
  }
  function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser") || "null");
  }
  