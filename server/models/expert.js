import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const expertSchema = new Schema({
  name: { type: 'String', required: true, max: 20 },
  description: { type: 'String', required: true, max: 1000 },
  projects: [{ 
    _id: 'String',
    status: 'String' 
  }],
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Expert', expertSchema);
