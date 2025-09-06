# System Flowcharts and Diagrams

## 1. User Navigation Flowchart

```
┌─────────────────┐
│   Homepage      │
│   (index.html)  │
└─────────┬───────┘
          │
          ├─── Login ────┐
          │              │
          ├─── Signup ───┤
          │              │
          └─── Get Started ──┐
                             │
                             ▼
                    ┌─────────────────┐
                    │  Level Test     │
                    │ (level-test.html)│
                    └─────────┬───────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  Level Results  │
                    │(level-result.html)│
                    └─────────┬───────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   Dashboard     │
                    │  (Sidebar Nav)  │
                    └─────────┬───────┘
                              │
                              ├─── Quizzes ────┐
                              │                │
                              ├─── Videos ─────┤
                              │                │
                              ├─── Books ──────┤
                              │                │
                              ├─── Profile ────┤
                              │                │
                              └─── Settings ───┘
```

## 2. User Authentication Flow

```
┌─────────────────┐
│  User Access    │
│  (Login/Signup) │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  Validate Input │
│  (Email/Password)│
└─────────┬───────┘
          │
          ├─── Invalid ────┐
          │                │
          ▼                │
┌─────────────────┐        │
│  Show Error     │        │
│  Message        │        │
└─────────┬───────┘        │
          │                │
          └────────────────┘
          │
          ▼
┌─────────────────┐
│  Check User     │
│  Exists         │
└─────────┬───────┘
          │
          ├─── New User ────┐
          │                 │
          ▼                 │
┌─────────────────┐         │
│  Create Account │         │
│  & Save Data    │         │
└─────────┬───────┘         │
          │                 │
          └─────────────────┘
          │
          ▼
┌─────────────────┐
│  Login Success  │
│  & Redirect     │
└─────────────────┘
```

## 3. Quiz System Flow

```
┌─────────────────┐
│  Start Quiz     │
│  (Select Quiz)  │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  Load Questions │
│  & Initialize   │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  Display        │
│  Question       │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  User Selects   │
│  Answer         │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  Store Answer   │
│  & Check if     │
│  More Questions │
└─────────┬───────┘
          │
          ├─── Yes ────┐
          │            │
          ▼            │
┌─────────────────┐    │
│  Next Question  │    │
└─────────┬───────┘    │
          │            │
          └────────────┘
          │
          ▼
┌─────────────────┐
│  Calculate      │
│  Final Score    │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  Display        │
│  Results        │
└─────────────────┘
```

## 4. Data Storage Flow

```
┌─────────────────┐
│  User Action    │
│  (Save Data)    │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  Validate Data  │
│  Format         │
└─────────┬───────┘
          │
          ├─── Invalid ────┐
          │                │
          ▼                │
┌─────────────────┐        │
│  Show Error     │        │
│  & Return       │        │
└─────────────────┘        │
          │                │
          └────────────────┘
          │
          ▼
┌─────────────────┐
│  Convert to     │
│  JSON String    │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  Store in       │
│  Local Storage  │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  Confirm Save   │
│  Success        │
└─────────────────┘
```

## 5. System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Englishtopia Application                │
├─────────────────────────────────────────────────────────────┤
│  Presentation Layer (HTML5)                                │
│  ├── index.html (Homepage)                                 │
│  ├── login.html (Authentication)                           │
│  ├── signup.html (User Registration)                       │
│  ├── quizzes.html (Quiz Selection)                         │
│  ├── level-test.html (Assessment)                          │
│  ├── quiz-taking.html (Quiz Interface)                     │
│  ├── videos.html (Video Resources)                         │
│  ├── books.html (Book Resources)                           │
│  ├── profile.html (User Profile)                           │
│  ├── settings.html (User Settings)                         │
│  └── level-result.html (Results Display)                   │
├─────────────────────────────────────────────────────────────┤
│  Styling Layer (CSS3)                                      │
│  ├── style.css (Consolidated Styles)                       │
│  ├── Responsive Design (Mobile-First)                      │
│  ├── Accessibility Features (Dyslexia Support)             │
│  └── Cross-Browser Compatibility                           │
├─────────────────────────────────────────────────────────────┤
│  Logic Layer (JavaScript)                                  │
│  ├── app.js (Main Application Logic)                       │
│  ├── User Management (Authentication)                      │
│  ├── Quiz System (Questions & Scoring)                     │
│  ├── Data Persistence (Local Storage)                      │
│  └── Event Handling (User Interactions)                    │
├─────────────────────────────────────────────────────────────┤
│  Data Layer (Browser Storage)                              │
│  ├── User Data (Profiles, Settings)                        │
│  ├── Quiz Results (Scores, Progress)                       │
│  ├── Application State (Current Session)                   │
│  └── Preferences (Font, Theme, etc.)                       │
└─────────────────────────────────────────────────────────────┘
```

## 6. Component Interaction Diagram

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   User      │    │   HTML      │    │   CSS       │
│ Interface   │◄──►│   Pages     │◄──►│   Styles    │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ JavaScript  │    │   Event     │    │   Data      │
│ Functions   │◄──►│ Handlers    │◄──►│ Storage     │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Quiz      │    │   User      │    │   Results   │
│   Logic     │    │ Management  │    │ Processing  │
└─────────────┘    └─────────────┘    └─────────────┘
```

## 7. Error Handling Flow

```
┌─────────────────┐
│  User Action    │
│  (Any Function) │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  Try Execute    │
│  Function       │
└─────────┬───────┘
          │
          ├─── Success ────┐
          │                │
          ▼                │
┌─────────────────┐        │
│  Return Result  │        │
│  to User        │        │
└─────────────────┘        │
          │                │
          └────────────────┘
          │
          ▼
┌─────────────────┐
│  Catch Error    │
│  (if any)       │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  Log Error      │
│  & Show User    │
│  Friendly       │
│  Message        │
└─────────────────┘
```

## 8. Mobile Responsiveness Flow

```
┌─────────────────┐
│  Page Load      │
│  (Any Device)   │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  Detect Screen  │
│  Size           │
└─────────┬───────┘
          │
          ├─── Desktop ────┐
          │                │
          ▼                │
┌─────────────────┐        │
│  Full Sidebar   │        │
│  Layout         │        │
└─────────────────┘        │
          │                │
          └────────────────┘
          │
          ├─── Tablet ─────┐
          │                │
          ▼                │
┌─────────────────┐        │
│  Collapsible    │        │
│  Sidebar        │        │
└─────────────────┘        │
          │                │
          └────────────────┘
          │
          ▼
┌─────────────────┐
│  Mobile Layout  │
│  (Stacked)      │
└─────────────────┘
```

These flowcharts provide a comprehensive visual representation of the Englishtopia application's functionality, data flow, and system architecture.
