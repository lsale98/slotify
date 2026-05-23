# ResetPassword

## Description

Allows users to set a new password using a reset token received via email after requesting a password reset. On success, a session cookie is set and the user is redirected to the dashboard.

---

## Fields

| Field            | Type   | Required | Description                                           |
| ---------------- | ------ | -------- | ----------------------------------------------------- |
| token            | string | ✅       | Reset token received via email (passed via URL param) |
| password         | string | ✅       | New password                                          |
| confirm_password | string | ✅       | Must match the password field                         |

---

## Validation & Errors

### Password & Confirm Password

- Must not be empty
- `password` and `confirm_password` must match
- **Error:** `"Invalid input. Please check your passwords and try again."`

### Token

- Passed automatically from the URL
- If the token is invalid or expired:
- **Error:** `"Invalid or expired reset token. Please request a new password reset."`

### General / Server Errors

- **Error:** `"An error happened. The developers have been notified. Please try again later."`

---

## Flow

1. User opens the reset link received via email (`/reset-password?token={resetToken}`)
2. User enters new password and confirms it
3. `ResetPasswordController` validates the token, password, and confirm password
4. If valid → session cookie is set and user is redirected to `/dashboard`
5. If invalid → appropriate error message is displayed

---

## Notes

- Token is read from the URL, not entered manually by the user
- Successful password reset immediately creates a session (user is logged in)
- Expired or already used tokens must trigger a new forgot password request
- Password is sent as plain text over HTTPS — the backend hashes it before storing
- Unexpected errors are reported to the crash reporter service
