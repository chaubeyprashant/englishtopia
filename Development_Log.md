# Development Log

This log records notable changes, rationale, and dates during development.

| Date | Change | Files | Rationale |
|------|--------|-------|-----------|
| 2025-09-07 | Added user navigation flowchart (Mermaid) | System_Flowcharts.md | Clarify end-to-end user flow |
| 2025-09-07 | Added module diagram and data structures section | System_Flowcharts.md | Document architecture and storage |
| 2025-09-07 | Added processing flowcharts and sequences | System_Flowcharts.md | Explain complex behaviors |
| 2025-09-07 | Added testing plan and system specification | System_Flowcharts.md | Define test scope and requirements |
| 2025-09-07 | Created methods plan and pseudocode doc | Methods_Plan_and_Pseudocode.md | Plan class methods and logic |
| 2025-09-07 | Annotated app.js with JSDoc typedefs and docs | app.js | Improve readability and maintainability |
| 2025-09-07 | Created JETS compliance mapping | JETS_Compliance.md | Align structure with JETS guidance |

---

## Consolidated Test Log

This section captures manual and integration testing during development.

### Environment
- Chrome/Safari (latest), macOS
- Viewports: 1440x900 (desktop), 820x1180 (tablet), 390x844 (mobile)

### Logs

#### 2025-09-07
- AUTH-01 Signup valid: PASS (redirect to login, users updated)
- AUTH-03 Login success: PASS (session keys set, profile redirect)
- NAV-01 Landing CTA: PASS (index → homepage)
- SET-01 Change font: PASS (applied, preferredFont stored)
- LVL-01 Complete level test: PASS (results stored, result page)
- QUIZ-01 Start and finish quiz: PASS (results stored)
- ERR-03 Corrupted `users` JSON: PASS (fallback to [])

Notes: No UI regressions observed; session persists across pages.

---

## JETS Compliance Mapping (Consolidated)

This section maps the project layout and practices to the JETS guidance.

### Structure
- HTML Templates: `index.html`, `homepage.html`, `login.html`, `signup.html`, `quizzes.html`, `level-test.html`, `quiz-taking.html`, `videos.html`, `books.html`, `profile.html`, `settings.html`, `level-result.html`, `sidebar.html`
- Styling: `style.css` (mobile-first, accessible styles)
- Scripts: `app.js` (modular functions, initialization)
- Documentation: `System_Flowcharts.md`, `Methods_Plan_and_Pseudocode.md`, `Development_Log.md`

### Coding Standards
- JSDoc annotations added to `app.js` for functions and typedefs
- Consistent naming; small, single-purpose functions
- Separation of concerns: navigation, auth, storage, settings, tests

### Testing & Documentation
- Testing Plan: Section 13 in `System_Flowcharts.md`
- Ongoing logs: Consolidated in this file
- Diagrams: Flowcharts, ER/class diagrams to support design & testing

### Rationale
- The structure aligns with JETS recommendations: clear organization, documented methods, and ongoing verification.
