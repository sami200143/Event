import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,  // Add category field
    required: true, // Optional: You can make this required or not
  },
  addedDate: {
    type: Date,
    default: Date.now,
  },
  expireDate: {
    type: Date,
  },
}, { timestamps: true });

const Package = mongoose.model('Package', packageSchema);
export default Package;
