import express from 'express';
import { addPackage, getAllPackages, getPackageById, updatePackageById, deletePackageById, getPackagesByCategory } from '../controllers/package.controller.js';

const router = express.Router();

// Add a new package
router.post('/add', addPackage);

// Get all packages or filter by category
router.get('/', (req, res) => {
    const { category } = req.query;
    if (category) {
        getPackagesByCategory(req, res); // Call the function for filtering by category
    } else {
        getAllPackages(req, res); // Call the function for getting all packages
    }
});;

// Get a single package by ID
router.get('/:id', getPackageById);

// Update a package by ID
router.put('/:id', updatePackageById);

// Delete a package by ID
router.delete('/:id', deletePackageById);



export default router;