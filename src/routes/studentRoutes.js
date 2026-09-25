import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

// Importing controller functions for handling student-related requests
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} from "../controllers/studentController.js";

const router = express.Router();

// All student routes now require a valid JWT. There's no indication this
// data needs to be publicly readable, so reads (GET) are protected too,
// not just writes. To make a route public again, just remove
// `authMiddleware` from that one line below.

/**
 * @swagger
 * /student:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of all students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       401:
 *         description: No token was provided, or the token has expired
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
 *                     timestamp: '2026-09-25T09:00:00.000Z'
 *                     path: /student
 *               tokenExpired:
 *                 summary: Token expired
 *                 value:
 *                   success: false
 *                   error:
 *                     code: TOKEN_EXPIRED
 *                     message: Token has expired, please log in again
 *                     details: null
 *                     timestamp: '2026-09-25T09:00:00.000Z'
 *                     path: /student
 *       403:
 *         description: Token is invalid
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
 *                 timestamp: '2026-09-25T09:00:00.000Z'
 *                 path: /student
 */
router.get('/student', authMiddleware, getAllStudents);

/**
 * @swagger
 * /student/{id}:
 *   get:
 *     summary: Get a single student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: The requested student
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       401:
 *         description: No token was provided, or the token has expired
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
 *                     timestamp: '2026-09-25T09:05:00.000Z'
 *                     path: /student/1
 *               tokenExpired:
 *                 summary: Token expired
 *                 value:
 *                   success: false
 *                   error:
 *                     code: TOKEN_EXPIRED
 *                     message: Token has expired, please log in again
 *                     details: null
 *                     timestamp: '2026-09-25T09:05:00.000Z'
 *                     path: /student/1
 *       403:
 *         description: Token is invalid
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
 *                 timestamp: '2026-09-25T09:05:00.000Z'
 *                 path: /student/1
 *       404:
 *         description: >
 *           Student not found. Note: this specific response is plain text
 *           ("Student not found"), not the standard JSON error shape —
 *           studentController.js predates the centralized error handler
 *           and hasn't been migrated to it.
 */
router.get('/student/:id', authMiddleware, getStudentById);

/**
 * @swagger
 * /student:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, age, course]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Karen Clair Probadora
 *               age:
 *                 type: integer
 *                 example: 22
 *               course:
 *                 type: string
 *                 example: Information Technology
 *     responses:
 *       200:
 *         description: The created student
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       401:
 *         description: No token was provided, or the token has expired
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
 *                     timestamp: '2026-09-25T09:10:00.000Z'
 *                     path: /student
 *               tokenExpired:
 *                 summary: Token expired
 *                 value:
 *                   success: false
 *                   error:
 *                     code: TOKEN_EXPIRED
 *                     message: Token has expired, please log in again
 *                     details: null
 *                     timestamp: '2026-09-25T09:10:00.000Z'
 *                     path: /student
 *       403:
 *         description: Token is invalid
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
 *                 timestamp: '2026-09-25T09:10:00.000Z'
 *                 path: /student
 */
router.post('/student', authMiddleware, createStudent);

/**
 * @swagger
 * /student/{id}:
 *   patch:
 *     summary: Update a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Any subset of the student's fields to update
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               course:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated student
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       401:
 *         description: No token was provided, or the token has expired
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
 *                     timestamp: '2026-09-25T09:15:00.000Z'
 *                     path: /student/1
 *               tokenExpired:
 *                 summary: Token expired
 *                 value:
 *                   success: false
 *                   error:
 *                     code: TOKEN_EXPIRED
 *                     message: Token has expired, please log in again
 *                     details: null
 *                     timestamp: '2026-09-25T09:15:00.000Z'
 *                     path: /student/1
 *       403:
 *         description: Token is invalid
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
 *                 timestamp: '2026-09-25T09:15:00.000Z'
 *                 path: /student/1
 *       404:
 *         description: >
 *           Student not found. Note: this response is a plain JSON object
 *           with just a `message` field (e.g. `{ "message": "Student not
 *           found" }`) — studentController.js predates the centralized
 *           error handler and hasn't been migrated to it, so it doesn't
 *           match the standard ErrorResponse shape.
 */
router.patch('/student/:id', authMiddleware, updateStudent);

/**
 * @swagger
 * /student/{id}:
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: The deleted student
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       401:
 *         description: No token was provided, or the token has expired
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
 *                     timestamp: '2026-09-25T09:20:00.000Z'
 *                     path: /student/1
 *               tokenExpired:
 *                 summary: Token expired
 *                 value:
 *                   success: false
 *                   error:
 *                     code: TOKEN_EXPIRED
 *                     message: Token has expired, please log in again
 *                     details: null
 *                     timestamp: '2026-09-25T09:20:00.000Z'
 *                     path: /student/1
 *       403:
 *         description: Token is invalid
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
 *                 timestamp: '2026-09-25T09:20:00.000Z'
 *                 path: /student/1
 *       404:
 *         description: >
 *           Student not found. Note: this response is a plain JSON object
 *           with just a `message` field (e.g. `{ "message": "Student not
 *           found" }`) — studentController.js predates the centralized
 *           error handler and hasn't been migrated to it, so it doesn't
 *           match the standard ErrorResponse shape.
 */
router.delete('/student/:id', authMiddleware, deleteStudent);

export default router;