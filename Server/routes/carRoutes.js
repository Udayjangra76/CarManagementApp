import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { createCar, deleteCar, getCar, listCars, updateCar, searchCars, listAllCars } from '../controllers/carController.js';


const router = express.Router();
/**
 * @swagger
 * /api/cars/search:
 *   get:
 *     summary: "Search cars by title, description, or tags"
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         required: true
 *         description: "Keyword to search in title, description, or tags"
 *     responses:
 *       '200':
 *         description: "List of matching cars"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       '401':
 *         description: "Unauthorized"
 *       '500':
 *         description: "Server error"
 */

router.get('/search', searchCars);
/**
 * @swagger
 * /api/cars:
 *   post:
 *     summary: Create a new car
 *     description: Create a new car with title, description, tags, etc.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "2021 Toyota Prius"
 *               description:
 *                 type: string
 *                 example: "A reliable and fuel-efficient hybrid car"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["electric", "hybrid"]
 *               carType:
 *                 type: string
 *                 example: "Sedan"
 *               company:
 *                 type: string
 *                 example: "Toyota"
 *               dealer:
 *                 type: string
 *                 example: "AutoNation"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["image1.jpg", "image2.jpg"]
 *     responses:
 *       201:
 *         description: Car created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 car:
 *                   $ref: '#/components/schemas/Car'
 *       500:
 *         description: Server error
 */
router.post('/', authMiddleware, createCar);

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Get all cars for the logged-in user
 *     description: Retrieve a list of cars created by the logged-in user.
 *     responses:
 *       200:
 *         description: List of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       500:
 *         description: Server error
 */
router.get('/', authMiddleware, listCars);

/**
 * @swagger
 * /api/cars/all:
 *   get:
 *     summary: Get all cars 
 *     description: Retrieve a list of cars.
 *     responses:
 *       200:
 *         description: List of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       500:
 *         description: Server error
 */
router.get('/all', listAllCars);

/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     summary: Get details of a specific car
 *     description: Retrieve details of a particular car by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the car to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found
 *       500:
 *         description: Server error
 */


router.get('/:id', getCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   put:
 *     summary: Update a specific car
 *     description: Update the title, description, tags, etc. of a particular car.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the car to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               carType:
 *                 type: string
 *               company:
 *                 type: string
 *               dealer:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Car updated successfully
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Car not found
 *       500:
 *         description: Server error
 */
router.put('/:id', authMiddleware, updateCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   delete:
 *     summary: Delete a specific car
 *     description: Delete a particular car by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the car to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Car not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authMiddleware, deleteCar);
router.get('/all', authMiddleware, listAllCars);


export default router;