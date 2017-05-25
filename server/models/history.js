import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const historySchema = new Schema({
  cuid: { type: 'String', required: true },
  projectName: { type: 'String', required: true },
  expertName: { type: 'String', required: true },
  result: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('History', historySchema);
