import mongoose from 'mongoose';
import moment from 'moment';

const Schema = mongoose.Schema;

const historySchema = new Schema({
  projectId: { type: 'String', required: true },
  expertId: { type: 'String', required: true },
  userId: { type: 'String', required: true },
  result: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: moment(), required: true },
});

export default mongoose.model('History', historySchema);
