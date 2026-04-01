# Manual Test Plan: [Feature / View Name]

**Version:** 1.0
**Date:** YYYY-MM-DD
**Tester:** ********\_********
**Device / Browser:** ********\_********
**App Version / Build:** ********\_********

---

## Prerequisites

- [ ] App is deployed to test environment
- [ ] Test user account is available (credentials: ****\_****)
- [ ] Test data is seeded (e.g., sample orders, customers)
- [ ] Device is connected to required network

---

## TC-001: [Test Case Title]

**Priority:** High
**Preconditions:** User is logged in and on the home screen.

| Step | Action                             | Expected Result                     | Pass/Fail | Notes |
| ---- | ---------------------------------- | ----------------------------------- | --------- | ----- |
| 1    | Tap on "Orders" in the navigation  | Orders list screen is displayed     |           |       |
| 2    | Tap on the first order in the list | Order detail screen opens           |           |       |
| 3    | Verify order number is displayed   | Order number matches expected value |           |       |
| 4    | Tap "Back" button                  | Returns to orders list              |           |       |

---

## TC-002: [Test Case Title]

**Priority:** Medium
**Preconditions:** At least one item exists in the price list.

| Step | Action                       | Expected Result                    | Pass/Fail | Notes |
| ---- | ---------------------------- | ---------------------------------- | --------- | ----- |
| 1    | Navigate to "Price List"     | Price list screen is displayed     |           |       |
| 2    | Search for "Example Product" | Product appears in search results  |           |       |
| 3    | Tap "Add to Order"           | Product is added, quantity shows 1 |           |       |
| 4    | Increase quantity to 5       | Total updates correctly            |           |       |

---

## TC-003: [Test Case Title — Negative / Error Case]

**Priority:** High
**Preconditions:** Device is in airplane mode.

| Step | Action                 | Expected Result                        | Pass/Fail | Notes |
| ---- | ---------------------- | -------------------------------------- | --------- | ----- |
| 1    | Open the app           | App loads with cached data             |           |       |
| 2    | Try to submit an order | Error message: "No network connection" |           |       |
| 3    | Re-enable network      | Order syncs automatically              |           |       |

---

## Summary

| Test Case | Title   | Priority | Result       |
| --------- | ------- | -------- | ------------ |
| TC-001    | [Title] | High     | **\_\_\_\_** |
| TC-002    | [Title] | Medium   | **\_\_\_\_** |
| TC-003    | [Title] | High     | **\_\_\_\_** |

**Overall Result:** ☐ Pass ☐ Fail
**Tester Signature:** ********\_********
**Date:** ********\_********

---

## Issues Found

| Issue # | Test Case | Description | Severity | Screenshot |
| ------- | --------- | ----------- | -------- | ---------- |
|         |           |             |          |            |
