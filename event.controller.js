import Event from '../models/event.model.js'; // Adjust the import based on your project structure
import Package from '../models/package.model.js'; // Import Package model to use in the controller

// Create a new event
export const createEvent = async (req, res) => {
  try {
    const { title, date, time, location, description, category, packageId, status } = req.body;

    // Check if the packageId exists
    const pkg = await Package.findById(packageId);
    if (!pkg) {
      return res.status(400).json({ message: 'Invalid package ID' });
    }

    // Create event with default status if not provided
    const event = new Event({
      title,
      date,
      time,
      location,
      description,
      category,
      packageId,
      status: status || 'Not Completed', // Set status to 'Not Completed' if not provided
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('packageId', 'name'); // Populate package name
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('packageId', 'name');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an event
export const updateEvent = async (req, res) => {
  try {
    const { title, date, time, location, description, category, packageId } = req.body;

    // Check if the packageId exists
    const pkg = await Package.findById(packageId);
    if (!pkg) {
      return res.status(400).json({ message: 'Invalid package ID' });
    }

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { title, date, time, location, description, category, packageId },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const completeEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    event.status = 'Completed';
    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
