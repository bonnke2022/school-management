const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  getAllAttendants,
} = require("../controllers/authController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Attendant:
 *       type: object
 *       required:
 *         - name
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB id
 *         staffId:
 *           type: string
 *           description: Same as _id, auto-generated
 *         name:
 *           type: string
 *           description: Attendant's full name
 *         password:
 *           type: string
 *           description: Attendant's hashed password
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         name: John Smith
 *         password: secret123
 */

/**
 * @swagger
 * /auth/attendants:
 *   get:
 *     summary: Get all attendants
 *     tags: [Attendants]
 *     responses:
 *       200:
 *         description: A list of attendants
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 attendants:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Attendant'
 *                 count:
 *                   type: integer
 *       400:
 *         description: No attendants found
 */
router.route("/attendants").get(getAllAttendants);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new attendant
 *     tags: [Attendants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       201:
 *         description: Attendant registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 attendant:
 *                   $ref: '#/components/schemas/Attendant'
 *                 msg:
 *                   type: string
 *       400:
 *         description: Attendant already exists or missing fields
 */
router.route("/register").post(register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login an attendant
 *     tags: [Attendants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Attendant logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 attendant:
 *                   $ref: '#/components/schemas/Attendant'
 *       401:
 *         description: Invalid credentials
 */
router.route("/login").post(login);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout an attendant
 *     tags: [Attendants]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Attendant logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       401:
 *         description: Authentication invalid
 */
router.route("/logout").get(logout);

module.exports = router;
