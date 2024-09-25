import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
  },
  status: {
    type: String,
    enum: ['Completed', 'Not Completed'],
    default: 'Not Completed', // Default value if not specified
  },
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
