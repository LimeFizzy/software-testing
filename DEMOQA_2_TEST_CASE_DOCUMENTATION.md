# Test Case Documentation: DEMOQA Widgets and Dynamic DOM

## Target Application

https://demoqa.com/

---

# Test Case 1: Progress Bar Synchronization

## Test Case Attributes

| #   | Attribute             | Value                                                                                 |
| --- | --------------------- | ------------------------------------------------------------------------------------- |
| 1   | **Test Case ID**      | DEMOQA_2.1                                                                            |
| 2   | **Test Case Name**    | Progress Bar Synchronization                                                          |
| 3   | **Priority**          | Medium                                                                                |
| 4   | **Test Type**         | Functional, Widget Testing                                                            |
| 5   | **Test Environment**  | Web                                                                                   |
| 6   | **Prerequisites**     | Browser configured, Internet connection stable                                        |
| 7   | **Test Data**         | None                                                                                  |
| 8   | **Expected Duration** | Less than 30 seconds                                                                  |
| 9   | **Automation Status** | Automated (Playwright)                                                                |
| 10  | **Author**            | QA Team                                                                               |
| 11  | **Created Date**      | 2026-02-20                                                                            |
| 12  | **Risk Level**        | Low (demo environment)                                                                |
| 13  | **Dependencies**      | None                                                                                  |
| 14  | **Objective**         | Verify Progress Bar widget completes to 100% and uses intelligent conditional waits via aria-valuenow attribute |

## Test Steps

| #   | Step                          | Action                                             | Expected Result                                          |
| --- | ----------------------------- | -------------------------------------------------- | -------------------------------------------------------- |
| 1   | **Navigate to Home**          | Open https://demoqa.com/                           | Home page loads with logo visible                        |
| 2   | **Remove Ad Section**         | Remove ad section from DOM                         | Ad section removed                                       |
| 3   | **Navigate to Widgets**       | Click "Widgets" in left panel                      | Widgets section expands                                  |
| 4   | **Open Progress Bar**         | Click "Progress Bar" link                          | Progress Bar page loads                                  |
| 5   | **Verify Initial State**      | Check progress bar is at 0%                        | Progress bar aria-valuenow="0"                           |
| 6   | **Start Progress**            | Click "Start" button                               | Progress bar begins incrementing                         |
| 7   | **Wait for Completion (Verification 1)** | Wait for progress bar to reach 100% using aria-valuenow | Progress bar aria-valuenow="100" (intelligent wait with timeout) |
| 8   | **Verify Reset Button (Verification 2)** | Check Reset button becomes visible                  | Reset button is visible after completion                 |

## Navigation Summary

Home → Widgets → Progress Bar → Start → Wait for 100% (aria-valuenow) → Verify Reset button

## Intelligent Conditional Waits

- **Wait Strategy:** Uses Playwright's `expect().toHaveAttribute('aria-valuenow', '100')` with 15-second timeout
- **No Thread Sleep:** All waits are conditional based on DOM state changes
- **HTML/ARIA Attributes:** Progress bar located by `[role="progressbar"]` and verified via `aria-valuenow`

## Pass Criteria

✓ Progress bar completes to 100%  
✓ Progress verified using `aria-valuenow="100"` attribute (not text)  
✓ Reset button becomes visible after completion  
✓ No fixed sleeps used - only intelligent conditional waits

---

# Test Case 2: Dynamic Properties

## Test Case Attributes

| #   | Attribute             | Value                                                                                 |
| --- | --------------------- | ------------------------------------------------------------------------------------- |
| 1   | **Test Case ID**      | DEMOQA_2.2                                                                            |
| 2   | **Test Case Name**    | Dynamic Properties - Element State Changes                                            |
| 3   | **Priority**          | Medium                                                                                |
| 4   | **Test Type**         | Functional, Dynamic DOM Testing                                                       |
| 5   | **Test Environment**  | Web                                                                                   |
| 6   | **Prerequisites**     | Browser configured, Internet connection stable                                        |
| 7   | **Test Data**         | None                                                                                  |
| 8   | **Expected Duration** | Less than 15 seconds                                                                  |
| 9   | **Automation Status** | Automated (Playwright)                                                                |
| 10  | **Author**            | QA Team                                                                               |
| 11  | **Created Date**      | 2026-02-20                                                                            |
| 12  | **Risk Level**        | Low (demo environment)                                                                |
| 13  | **Dependencies**      | None                                                                                  |
| 14  | **Objective**         | Verify dynamic property changes: button enabling after delay and element visibility after delay using HTML attributes |

## Test Steps

| #   | Step                          | Action                                             | Expected Result                                          |
| --- | ----------------------------- | -------------------------------------------------- | -------------------------------------------------------- |
| 1   | **Navigate to Home**          | Open https://demoqa.com/                           | Home page loads with logo visible                        |
| 2   | **Navigate to Elements**      | Click "Elements" in left panel                     | Elements section expands                                 |
| 3   | **Open Dynamic Properties**   | Click "Dynamic Properties" link                    | Dynamic Properties page loads                            |
| 4   | **Remove Ad Section**         | Remove ad section from DOM                         | Ad section removed                                       |
| 5   | **Verify Initial State**      | Check "Enable After 5s" button is disabled         | Button with id="enableAfter" is disabled                 |
| 6   | **Wait for Button Enable (Verification 1)** | Wait for button to become enabled using HTML enabled state | Button becomes enabled after 5 seconds (intelligent wait with 6s timeout) |
| 7   | **Verify Initial Visibility** | Check "Visible After 5s" element is hidden         | Element with id="visibleAfter" is not visible            |
| 8   | **Wait for Element Visible (Verification 2)** | Wait for element to become visible using HTML visibility | Element becomes visible after 5 seconds (intelligent wait with 6s timeout) |

## Navigation Summary

Home → Elements → Dynamic Properties → Wait for button enabled → Wait for element visible

## Intelligent Conditional Waits

- **Wait Strategy 1:** Uses Playwright's `expect(button).toBeEnabled({ timeout: 6000 })` for button state
- **Wait Strategy 2:** Uses Playwright's `expect(element).toBeVisible({ timeout: 6000 })` for visibility
- **No Thread Sleep:** All waits are conditional based on DOM attribute changes
- **HTML Attributes:** Elements located by ID (`#enableAfter`, `#visibleAfter`) and verified via HTML/ARIA states

## Pass Criteria

✓ Button with id="enableAfter" becomes enabled after 5 seconds  
✓ Element with id="visibleAfter" becomes visible after 5 seconds  
✓ Both verifications use HTML tags and attributes (id, enabled state, visibility)  
✓ No fixed sleeps used - only intelligent conditional waits with appropriate timeouts

---

## Summary of Both Test Cases

### Common Characteristics

- **No Fixed Delays:** Both tests use only Playwright's intelligent conditional waits
- **HTML/ARIA Attributes:** All verifications based on DOM attributes (aria-valuenow, enabled, visible)
- **Semantic Selectors:** Elements located by role, id, and HTML attributes (not text or position)
- **Timeout Handling:** Appropriate timeouts set for expected delays (15s for progress bar, 6s for 5-second delays)

### Wait Strategies Used

1. **Progress Bar:** `expect(element).toHaveAttribute('aria-valuenow', '100', { timeout: 15000 })`
2. **Dynamic Button:** `expect(button).toBeEnabled({ timeout: 6000 })`
3. **Dynamic Visibility:** `expect(element).toBeVisible({ timeout: 6000 })`

All strategies automatically retry until the condition is met or timeout expires, providing intelligent synchronization without fixed sleeps.
