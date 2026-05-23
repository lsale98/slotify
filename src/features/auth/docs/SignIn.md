# SignIn

## Description

A login form that allows users to authenticate using their email address and password.

---

## Fields

| Field    | Type   | Required | Description          |
| -------- | ------ | -------- | -------------------- |
| email    | string | ✅       | User's email address |
| password | string | ✅       | User's password      |

---

## Validation & Errors

### Email

- Must be a valid format (e.g. `user@domain.com`)

### Password

- Minimum 8 characters
- **Error:** `"Password must be at least 8 characters."`
- If the password is incorrect:
- **Error:** `"Incorrect email or password"`

---

## Flow

1. User enters email and password
2. Clicks the **Sign In** button
3. Frontend validation runs (email format, password length)
4. Request is sent to the API
5. If credentials are valid → redirect to dashboard
6. If credentials are invalid → display the appropriate error message

---

## Notes

- Password is never sent in plain text (HTTPS + backend hashing)
- "Forgot password" link leads to the password reset flow
