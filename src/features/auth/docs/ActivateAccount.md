# ActivateAccount

## Description

Activates a newly registered user account by validating a one-time OTP code along with the activation token received after sign-up. On success, a session cookie is set and the user is redirected to the dashboard.

---

## Fields

| Field | Type   | Required | Description                                                     |
| ----- | ------ | -------- | --------------------------------------------------------------- |
| token | string | ✅       | Activation token received from the sign-up flow (via URL param) |
| otp   | string | ✅       | One-time code sent to the user (e.g. via email)                 |

---

## Validation & Errors

### Token

- Passed automatically from the URL (`/activate?token={activationToken}`)
- If invalid or missing → treated as `InputParseError`

### OTP

- Must be a valid activation code
- **Error:** `"Activation code not valid"`

### Authentication Errors

- If the token is expired or already used:
- **Error:** _(message from `AuthenticationError`)_

### General / Server Errors

- **Error:** `"An error happened. The developers have been notified. Please try again later."`

---

## Flow

1. User is redirected to `/activate?token={activationToken}` after sign-up
2. User enters the OTP code received via email
3. `ActivateAccountController` validates the token and OTP
4. If valid → session cookie is set and user is redirected to `/dashboard`
5. If invalid → appropriate error message is displayed

---

## Notes

- Token is read from the URL, not entered manually by the user
- Successful activation immediately creates a session (user is logged in)
- Unexpected errors are reported to the crash reporter service
