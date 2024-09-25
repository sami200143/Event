import Package from '../models/package.model.js';

// Add a package
export const addPackage = async (req, res, next) => {
  const { name, price, description, category, expireDate } = req.body;

  try {
    // Validate the required fields
    if (!name || !price || !description || !category || !expireDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new package with an addedDate and expireDate
    const newPackage = new Package({
      name,
      price,
      description,
      category, // Add category to new package
      expireDate,
    });

    // Save the package to the database
    await newPackage.save();
    
    // Return the newly added package
    res.status(201).json(newPackage);
  } catch (error) {
    next(error); // Pass any errors to the error-handling middleware
  }
};

// Get all packages
export const getAllPackages = async (req, res, next) => {
    try {
      const packages = await Package.find(); // Retrieve all packages from the database
      res.status(200).json(packages); // Send the list of packages as the response
    } catch (error) {
      next(error); // Pass any errors to the error-handling middleware
    }
  };
  
  // Get a single package by ID
  export const getPackageById = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const packages = await Package.findById(id); // Find the package by its ID
      if (!packages) {
        return res.status(404).json({ message: 'Package not found' });
      }
      res.status(200).json(packages); // Send the package details as the response
    } catch (error) {
      next(error); // Pass any errors to the error-handling middleware
    }
  };

// Update a package by ID
export const updatePackageById = async (req, res, next) => {
    const { id } = req.params;
    const { name, price, description, category, expireDate } = req.body;
  
    try {
      // Find the package by ID and update it with the provided data
      const updatedPackage = await Package.findByIdAndUpdate(
        id,
        { name, price, description, expireDate, category },
        { new: true, runValidators: true } // Return the updated document and validate fields
      );
  
      if (!updatedPackage) {
        return res.status(404).json({ message: 'Package not found' });
      }
  
      res.status(200).json(updatedPackage); // Send the updated package as the response
    } catch (error) {
      next(error); // Pass any errors to the error-handling middleware
    }
  };

  // Delete a package by ID
export const deletePackageById = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      // Find the package by ID and delete it
      const deletedPackage = await Package.findByIdAndDelete(id);
  
      if (!deletedPackage) {
        return res.status(404).json({ message: 'Package not found' });
      }
  
      res.status(200).json({ message: 'Package deleted successfully' }); // Send a success message
    } catch (error) {
      next(error); // Pass any errors to the error-handling middleware
    }
  };

  export const getPackagesByCategory = async (req, res) => {
    const { category } = req.query; // Use req.query instead of req.params

    try {
        const packages = await Package.find({ category }); // Fetch packages by category
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching packages' });
    }
};
