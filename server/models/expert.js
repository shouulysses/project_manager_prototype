import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const expertSchema = new Schema({
  cuid: { type: 'String', required: true },
  name: { type: 'String', required: true, max: 20 },
  description: { type: 'String', required: true, max: 1000 },
  status: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Expert', expertSchema);
