import express from "express";
import { register, login, logout, me } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Matches the existing flat routing style (/student, not /api/student),
// so these are /auth/... rather than /api/auth/... for consistency.

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rio Pana
 *               email:
 *                 type: string
 *                 format: email
 *                 example: rio@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 example: secret123
 *     responses:
 *       201:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Registration successful }
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Missing or invalid fields (name/email/password)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error:
 *                 code: VALIDATION_ERROR
 *                 message: Registration input is invalid
 *                 details:
 *                   - field: name
 *                     message: Name is required
 *                   - field: email
 *                     message: Email is invalid
 *                 timestamp: '2026-09-25T08:35:47.247Z'
 *                 path: /auth/register
 *       409:
 *         description: An account with this email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error:
 *                 code: EMAIL_ALREADY_EXISTS
 *                 message: An account with this email already exists
 *                 details: null
 *                 timestamp: '2026-09-25T08:36:10.512Z'
 *                 path: /auth/register
 */
router.post("/auth/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in and receive a JWT
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: rio@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Login successful — returns a Bearer token to use in the Authorize button
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Login successful }
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Missing email or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error:
 *                 code: VALIDATION_ERROR
 *                 message: Login input is invalid
 *                 details:
 *                   - field: password
 *                     message: Password is required
 *                 timestamp: '2026-09-25T08:40:02.118Z'
 *                 path: /auth/login
 *       401:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error:
 *                 code: INVALID_CREDENTIALS
 *                 message: Invalid email or password
 *                 details: null
 *                 timestamp: '2026-09-25T08:41:47.903Z'
 *                 path: /auth/login
 */
router.post("/auth/login", login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out
 *     description: >
 *       Stateless JWTs can't be revoked server-side without a blacklist,
 *       so this endpoint just returns a confirmation — the actual logout
 *       is the client discarding its stored token.
 *     tags: [Auth]
 *     security: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Logged out successfully }
 */
router.post("/auth/logout", logout);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get the currently authenticated user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: The authenticated user's profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: No token was provided, the token has expired, or the user behind it no longer exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               noToken:
 *                 summary: No token provided
 *                 value:
 *                   success: false
 *                   error:
 *                     code: NO_TOKEN
 *                     message: Not authorized, no token provided
 *                     details: null
 *                     timestamp: '2026-09-25T08:45:00.000Z'
 *                     path: /auth/me
 *               tokenExpired:
 *                 summary: Token expired
 *                 value:
 *                   success: false
 *                   error:
 *                     code: TOKEN_EXPIRED
 *                     message: Token has expired, please log in again
 *                     details: null
 *                     timestamp: '2026-09-25T08:46:00.000Z'
 *                     path: /auth/me
 *               userNoLongerExists:
 *                 summary: User no longer exists
 *                 value:
 *                   success: false
 *                   error:
 *                     code: USER_NOT_FOUND
 *                     message: User no longer exists
 *                     details: null
 *                     timestamp: '2026-09-25T08:47:00.000Z'
 *                     path: /auth/me
 *       403:
 *         description: Token is invalid (malformed or bad signature)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error:
 *                 code: INVALID_TOKEN
 *                 message: Invalid token
 *                 details: null
 *                 timestamp: '2026-09-25T08:48:00.000Z'
 *                 path: /auth/me
 *       404:
 *         description: Authenticated but the user record could not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error:
 *                 code: USER_NOT_FOUND
 *                 message: User not found
 *                 details: null
 *                 timestamp: '2026-09-25T08:49:00.000Z'
 *                 path: /auth/me
 */
router.get("/auth/me", authMiddleware, me);

export default router;