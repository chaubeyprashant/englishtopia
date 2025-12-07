# JETS Compliance Mapping

This document maps the project layout and practices to the JETS guidance.

## Structure
- HTML Templates: `index.html`, `homepage.html`, `login.html`, `signup.html`, `quizzes.html`, `level-test.html`, `quiz-taking.html`, `videos.html`, `books.html`, `profile.html`, `settings.html`, `level-result.html`, `sidebar.html`
- Styling: `style.css` (mobile-first, accessible styles)
- Scripts: `app.js` (modular functions, initialization)
- Documentation: `System_Flowcharts.md`, `Methods_Plan_and_Pseudocode.md`, `Development_Log.md`, `Test_Log.md`

## Coding Standards
- JSDoc annotations added to `app.js` for functions and typedefs
- Consistent naming; small, single-purpose functions
- Separation of concerns: navigation, auth, storage, settings, tests

## Testing & Documentation
- Testing Plan: Section 13 in `System_Flowcharts.md`
- Ongoing logs: `Test_Log.md` and `Development_Log.md`
- Diagrams: Flowcharts, ER/class diagrams to support design & testing

## Rationale
- The structure aligns with JETS recommendations: clear organization, documented methods, and ongoing verification.
