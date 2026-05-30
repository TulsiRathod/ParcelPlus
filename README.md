# ParcelPlus

A full-stack parcel/logistics delivery platform.

- **BackEnd/** — Spring Boot 3 (Java 17) REST API with PostgreSQL, JPA/Hibernate, and a WebSocket endpoint for live vehicle tracking.
- **FrontEnd/** — React (Create React App) single-page app for users, delivery partners (drivers), and admins.

## Architecture

| Layer    | Tech                                                        |
|----------|-------------------------------------------------------------|
| Frontend | React 18, React Router, axios, Google Maps, react-toastify  |
| Backend  | Spring Boot, Spring Data JPA, Spring Web, WebSocket          |
| Database | PostgreSQL                                                  |

The frontend talks to the backend over REST (`/api/...`) and a WebSocket (`/ws/track`)
for real-time driver location updates.

## Prerequisites

- Java 17+ and Maven (the backend ships a Maven wrapper, `./mvnw`)
- Node.js 18+ and npm
- A PostgreSQL database

## Configuration

Both modules read configuration from environment variables. **No secrets are committed** —
copy the example files and fill in your own values.

### Backend
Copy `BackEnd/.env.example` and export the variables (or set them in your run environment):

```
DB_URL=jdbc:postgresql://<host>:5432/parcelplus?sslmode=require
DB_USERNAME=...
DB_PASSWORD=...
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend
Copy `FrontEnd/.env.example` to `FrontEnd/.env` and fill in:

```
REACT_APP_GOOGLE_MAPS_API_KEY=...
REACT_APP_API_BASE_URL=http://localhost:8080/api
REACT_APP_WS_BASE_URL=ws://localhost:8080
```

## Running locally

### Backend
```bash
cd BackEnd
./mvnw spring-boot:run
```
Starts on http://localhost:8080.

### Frontend
```bash
cd FrontEnd
npm install
npm start
```
Starts on http://localhost:3000.

## Deployment

A [Render](https://render.com) blueprint ([render.yaml](render.yaml)) provisions the
managed PostgreSQL, the backend (Docker), and the static frontend. See
[DEPLOY.md](DEPLOY.md) for the full step-by-step.

## Authentication & authorization

The API uses **stateless JWT auth** (Spring Security):

- `POST /api/users/login` and `POST /api/drivers/login` take `{ "email", "password" }`
  and return `{ token, role, userId|driverId, name, email, vehicleType }`.
- The frontend stores the token in `localStorage` and the shared axios instance
  ([src/api.js](FrontEnd/src/api.js)) sends it as `Authorization: Bearer <token>` on
  every request. A `401/403` clears the session and redirects to login.
- Roles: `USER`, `DRIVER`, `ADMIN`. Admin-only endpoints (dashboard counts, vehicle
  and driver management CRUD) require the `ADMIN` role; most other endpoints require
  any authenticated caller. Registration, login, the public vehicle list, and the
  tracking WebSocket are open.
- Frontend routes are guarded by [ProtectedRoute](FrontEnd/src/components/ProtectedRoute.js)
  (admin pages require the `ADMIN` role).

### Creating an admin

There is no self-service admin signup (clients cannot set their own role). Register a
normal user, then promote it directly in the database:

```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'you@example.com';
```

That user can then log in via the normal client login and will be routed to `/admin`.

## Security notes

- Passwords are hashed with BCrypt; password hashes are never returned by the API.
- Secrets (DB, JWT, Maps key) come from environment variables and are not committed.
  **Rotate any previously committed credentials** — they remain in git history.
- Set a strong, random `JWT_SECRET` (≥ 32 chars) in every non-local environment.
- Token storage in `localStorage` is readable by JavaScript; keep the frontend free of
  XSS. Consider moving to httpOnly cookies if that threat model matters to you.
