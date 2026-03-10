# Auth — Sign Up

## Overview

Handles new user registration. During sign up, the user selects a role (**Mentor** or **User**), which determines the onboarding flow that follows after successful registration.

---

## Roles

| Role     | Description                          |
| -------- | ------------------------------------ |
| `user`   | Standard user looking for a mentor   |
| `mentor` | Experienced user offering mentorship |

The role is selected on the sign up form and stored in the database when the account is created. Once set, the role can only be changed by an admin.

---

## Flow

```
User fills in the form (name, email, password, role)
        │
        ▼
Client-side validation (Zod)
        │
        ├── Invalid → show inline field errors
        │
        ▼
signUpAction(formData)
        │
        ▼
Server-side validation (Zod)
        │
        ▼
Check if email already exists
        │
        ├── Exists → return error "Email is already in use"
        │
        ▼
Create user in database (bcrypt hashed password)
        │
        ▼
Create session / JWT token
        │
        ▼
Redirect based on role:
  user   → /onboarding/user
  mentor → /onboarding/mentor
```

---

## Server Actions

### `signUpAction`

```ts
// src/features/auth/actions/sign-up.action.ts

'use server';

signUpAction(formData: SignUpFormValues): Promise<ActionResult>
```

| Parameter  | Type                 | Description                 |
| ---------- | -------------------- | --------------------------- |
| `name`     | `string`             | Full name of the user       |
| `email`    | `string`             | Email address               |
| `password` | `string`             | Password (min 8 characters) |
| `role`     | `"user" \| "mentor"` | Selected role               |

**Returns:**

```ts
type ActionResult =
  | { success: true; redirectTo: string }
  | { success: false; error: string };
```

---

## API Endpoints

> Used if calling the API directly instead of a server action.

| Method | Endpoint            | Description           |
| ------ | ------------------- | --------------------- |
| `POST` | `/api/auth/sign-up` | Creates a new account |

**Request body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123",
  "role": "mentor"
}
```

**Response `201`:**

```json
{
  "success": true,
  "redirectTo": "/onboarding/mentor"
}
```

---

## Validation — Zod Schema

```ts
// src/features/auth/schemas/sign-up.schema.ts

import { z } from 'zod';

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(64, 'Name is too long'),

  email: z.string().email('Enter a valid email address'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password is too long'),

  role: z.enum(['user', 'mentor'], {
    required_error: 'Please select a role',
  }),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;
```

---

## Error Handling

| Scenario              | Message                                   | Where                       |
| --------------------- | ----------------------------------------- | --------------------------- |
| Email already exists  | `Email is already in use`                 | Inline below email field    |
| Invalid data (server) | `Invalid form data`                       | Toast / form error          |
| Server error          | `Something went wrong. Please try again.` | Toast                       |
| Role not selected     | `Please select a role`                    | Inline below role field     |
| Password too short    | `Password must be at least 8 characters`  | Inline below password field |

All server errors are logged. Technical stack traces are never exposed to the user.
