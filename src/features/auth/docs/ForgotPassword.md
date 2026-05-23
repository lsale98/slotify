# ForgotPassword

## Description

Allows users to request a password reset by entering their registered email address. If the email is valid and the account is active, a reset link is sent to the user.

---

## Fields

| Field | Type   | Required | Description                          |
| ----- | ------ | -------- | ------------------------------------ |
| email | string | ✅       | Email address of the registered user |

---

## Validation & Errors

### Email

- Must be a valid registered email address
- **Error:** `"Incorrect email"`

### Account Not Active

- If the account exists but has not been activated:
- **Error:** `"Account is not active. Please use link that you get in email after registration"`

### General / Server Errors

- **Error:** `"An error happened. The developers have been notified. Please try again later."`

---

## Flow

1. User enters their email address
2. Clicks the **Submit** button
3. `ForgotPasswordController` validates the email
4. If valid and account is active → password reset email is sent → success state is shown
5. If invalid or account not active → appropriate error message is displayed

---

## Notes

- No redirect on success — a success message is shown in place of the form
- Inactive accounts must first be activated via the registration email before requesting a password reset
- Unexpected errors are reported to the crash reporter service
