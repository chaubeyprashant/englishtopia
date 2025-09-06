# Criteria B: Design and Solution Overview

## Design Document

### 1. System Architecture Overview
The Englishtopia application follows a client-side architecture with the following components:
- **Presentation Layer:** HTML5 with semantic markup
- **Styling Layer:** CSS3 with responsive design principles
- **Logic Layer:** JavaScript for interactivity and data management
- **Data Layer:** Browser Local Storage for persistence

### 2. User Navigation Flowchart
```
Start → Homepage → [Login/Signup] → Main Dashboard
                    ↓
            [Level Test] → [Quiz Selection] → [Quiz Taking] → [Results]
                    ↓
            [Videos/Books] → [Resource Viewing]
                    ↓
            [Profile] → [Settings] → [Data Management]
```

### 3. Module Diagram
```
Englishtopia Application
├── Authentication Module
│   ├── User Registration
│   ├── User Login
│   └── Session Management
├── Assessment Module
│   ├── Level Test Engine
│   ├── Quiz System
│   └── Results Processing
├── Content Module
│   ├── Video Library
│   ├── Book Resources
│   └── Content Display
├── User Management Module
│   ├── Profile Management
│   ├── Settings Configuration
│   └── Data Persistence
└── Navigation Module
    ├── Sidebar Navigation
    ├── Page Routing
    └── UI State Management
```

### 4. Screen Layout Designs

#### Homepage Layout
- **Header:** Logo (left) + Navigation Links (right)
- **Main Content:** Two-column layout
  - Left: Hero text + CTA button
  - Right: Visual elements (arrows animation)

#### Sidebar Layout (All Other Pages)
- **Sidebar:** Fixed navigation with logo and menu items
- **Main Content:** Flexible container with page-specific content
- **Responsive:** Collapsible sidebar on mobile devices

### 5. Data Structures Design

#### User Data Structure
```javascript
{
  username: string,
  email: string,
  password: string (hashed),
  level: string,
  quizResults: array,
  preferences: object
}
```

#### Quiz Data Structure
```javascript
{
  id: string,
  title: string,
  questions: array,
  timeLimit: number,
  difficulty: string
}
```

#### Question Data Structure
```javascript
{
  id: string,
  question: string,
  options: array,
  correctAnswer: number,
  explanation: string
}
```

### 6. Data Structure Justification

**Local Storage vs. Database:**
- **Strengths:** No server required, fast access, simple implementation
- **Weaknesses:** Limited storage, client-side only, no data sharing
- **Choice:** Local Storage - Appropriate for single-user educational tool

**Array-based Question Storage:**
- **Strengths:** Simple iteration, easy to add/remove questions
- **Weaknesses:** Linear search time, no complex relationships
- **Choice:** Arrays - Sufficient for current quiz requirements

### 7. Class Diagram
```
Englishtopia Classes:
├── User
│   ├── + username: string
│   ├── + email: string
│   ├── + level: string
│   ├── + login(): boolean
│   └── + updateProfile(): void
├── Quiz
│   ├── + questions: array
│   ├── + currentQuestion: number
│   ├── + score: number
│   ├── + startQuiz(): void
│   ├── + nextQuestion(): void
│   └── + calculateScore(): number
├── Question
│   ├── + questionText: string
│   ├── + options: array
│   ├── + correctAnswer: number
│   └── + checkAnswer(selected: number): boolean
└── StorageManager
    ├── + saveUser(user: User): void
    ├── + loadUser(): User
    ├── + saveResults(results: object): void
    └── + clearData(): void
```

### 8. Testing Plan

#### Unit Testing
- User authentication functions
- Quiz scoring algorithms
- Data validation methods
- Local storage operations

#### Integration Testing
- Page navigation flow
- Data persistence across sessions
- Form submission and validation
- Cross-browser compatibility

#### User Acceptance Testing
- Complete user journey from registration to quiz completion
- Accessibility testing with screen readers
- Mobile device testing
- Performance testing with large datasets

#### Test Cases
1. **User Registration:** Valid/invalid email formats, password requirements
2. **Login Process:** Correct/incorrect credentials, session persistence
3. **Quiz Functionality:** Answer selection, scoring, navigation
4. **Data Persistence:** Save/load user data, settings retention
5. **Responsive Design:** Various screen sizes and orientations

### 9. System Specification Updates
- Added accessibility requirements (dyslexia-friendly fonts)
- Enhanced mobile responsiveness specifications
- Included performance benchmarks (page load times)
- Added cross-browser compatibility requirements

### 10. Design Rationale
- **Single Page Application Approach:** Simplified navigation and state management
- **Progressive Enhancement:** Core functionality works without JavaScript
- **Mobile-First Design:** Ensures accessibility across all devices
- **Modular Architecture:** Easy to maintain and extend functionality
