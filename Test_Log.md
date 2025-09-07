# Test Log

This log captures manual and integration testing during development.

## Environment
- Chrome/Safari (latest), macOS
- Viewports: 1440x900 (desktop), 820x1180 (tablet), 390x844 (mobile)

## Logs

### 2025-09-07
- AUTH-01 Signup valid: PASS (redirect to login, users updated)
- AUTH-03 Login success: PASS (session keys set, profile redirect)
- NAV-01 Landing CTA: PASS (index → homepage)
- SET-01 Change font: PASS (applied, preferredFont stored)
- LVL-01 Complete level test: PASS (results stored, result page)
- QUIZ-01 Start and finish quiz: PASS (results stored)
- ERR-03 Corrupted `users` JSON: PASS (fallback to [])

Notes: No UI regressions observed; session persists across pages.
