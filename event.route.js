import express from 'express';
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  completeEvent
} from '../controllers/event.controller.js'; // Adjust the import based on your project structure


const router = express.Router();

// Route to create a new event
router.post('/event', createEvent);

// Route to get all events
router.get('/event', getAllEvents);

// Route to get a specific event by ID
router.get('/event/:id', getEventById);

// Route to update an event by ID
router.put('/event/:id', updateEvent);

// Route to delete an event by ID
router.delete('/event/:id', deleteEvent);

router.patch('/event/:id/complete', completeEvent);



export default router;
