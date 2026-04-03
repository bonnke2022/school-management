const express = require("express");
const router = express.Router();

const {
  createAttendant,
  getAllAttendants,
} = require("../controllers/attendantController");

/**
 * @swagger
 * /attendants:
 *   post:
 *     summary: Create a new attendant
 *     tags: [Attendants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Attendant created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendant'
 *       400:
 *         description: Bad request - name is required
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

router.route("/").post(createAttendant).get(getAllAttendants);

module.exports = router;
