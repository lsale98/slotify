# SignUp

## Description

A registration form that allows new users to create an account by selecting a role, entering personal details, and agreeing to the terms & conditions. After successful registration, the user is redirected to an activation page.

---

## Fields

| Field            | Type    | Required | Description                         |
| ---------------- | ------- | -------- | ----------------------------------- |
| role             | enum    | ✅       | Selected role: `USER` or `MENTOR`   |
| name             | string  | ✅       | User's first name                   |
| lastname         | string  | ✅       | User's last name                    |
| email            | string  | ✅       | User's email address                |
| password         | string  | ✅       | User's password                     |
| confirm_password | string  | ✅       | Must match the password field       |
| agreed_terms     | boolean | ✅       | User must accept terms & conditions |

---

## Validation & Errors

### Role

- Must be one of: `USER`, `MENTOR`
- Selected via radio cards before submitting the form

### Name / Lastname

- Must not be empty

### Email

- Must be a valid format (e.g. `user@domain.com`)
- **Error:** `"An account with this email already exists."`

### Password & Confirm Password

- Must not be empty
- `password` and `confirm_password` must match
- **Error:** `"Invalid data. Make sure the Password and Confirm Password match."`

### Agreed to Terms

- Must be checked — the **Sign up** button is disabled until accepted

### General / Server Errors

- **Error:** `"An error happened. The developers have been notified. Please try again later."`

---

## Flow

1. User selects a role (`User` or `Mentor`)
2. User fills in name, lastname, email, password, and confirm password
3. User checks the "Agreed to terms & conditions" checkbox
4. Clicks the **Sign up** button (disabled until terms are accepted)
5. Password is sent as plain text over HTTPS — the backend hashes it before storing
6. Server validates the input via `SignUpController`
7. If validation fails → display the appropriate error message
8. If successful → user is redirected to `/activate?token={activationToken}`

---

## Notes

- Account status is set to `PENDING` until the email is activated
- After registration, user must activate their account via the activation flow
- Errors are reported to the crash reporter service for unexpected failures
