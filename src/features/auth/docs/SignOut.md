# SignOut

## Description

Logs the user out by invalidating the current session and clearing the session cookie. The user is then redirected to the sign-in page.

---

## Fields

| Field     | Type   | Required | Description                                |
| --------- | ------ | -------- | ------------------------------------------ |
| sessionId | string | ✅       | Read from the session cookie automatically |

> No user input required — triggered by a button/action.

---

## Validation & Errors

### Session Cookie

- Read automatically from cookies (`SESSION_COOKIE`)
- If the session is missing or invalid (`UnauthenticatedError` / `InputParseError`):
  - **Behavior:** Redirect to `/sign-in`

### General / Server Errors

- Unexpected errors are reported to the crash reporter service and re-thrown

---

## Flow

1. User triggers the **Sign out** action
2. Session ID is read from the session cookie
3. `SignOutController` invalidates the session on the backend
4. A blank cookie is set to clear the session on the client
5. User is redirected to `/sign-in`

---

## Notes

- If the user is already unauthenticated, they are silently redirected to `/sign-in`
- No confirmation dialog — sign out is immediate
