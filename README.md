## API Documentation

This project uses [Swagger/OpenAPI](https://swagger.io/) for interactive API documentation.

### Accessing Swagger UI

1. Start the server:
```bash
   npm install
   node server.js
```
2. Open your browser to:
```
   http://localhost:3000/api-docs
```
   (or whatever `PORT` is set to in your `.env`)

### Authentication

Most endpoints require a JWT Bearer token. To test protected endpoints in Swagger UI:

1. Expand **POST /auth/register** and create an account (or **POST /auth/login** if you already have one), then execute.
2. Copy the `token` value from the response.
3. Click the green **Authorize** button at the top of the page.
4. Paste the token (no `Bearer ` prefix needed — Swagger UI adds that automatically), then click **Authorize** and **Close**.
5. All subsequent "Try it out" requests will include the token automatically.

### Endpoints

| Method | Endpoint | Auth required | Description |
|--------|----------|----------------|-------------|
| POST | `/auth/register` | No | Register a new user |
| POST | `/auth/login` | No | Log in, receive a JWT |
| POST | `/auth/logout` | No | Client-side token removal |
| GET | `/auth/me` | Yes | Get the current authenticated user |
| GET | `/student` | Yes | List all students |
| GET | `/student/:id` | Yes | Get a single student |
| POST | `/student` | Yes | Create a student |
| PATCH | `/student/:id` | Yes | Update a student |
| DELETE | `/student/:id` | Yes | Delete a student |

### Error responses

Errors return a consistent JSON shape:
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password",
    "details": null,
    "timestamp": "2026-09-25T08:41:47.903Z",
    "path": "/auth/login"
  }
}
```
`code` is a stable identifier safe to branch on in client code; `details` is populated (as an array of `{ field, message }`) for validation errors.