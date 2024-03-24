import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
  Title: String,
  Description: String,
  Input: String,
  Note: String,

  // Add more fields as needed
});

export default mongoose.model('prompts', DataSchema);