import mongoose from 'mongoose';
import moment from 'moment';

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: 'String', required: true, max: 50 },
  startDate: { type: 'Date', required: true },
  status: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: moment(), required: true },
  experts: {type: ['String']}
});

export default mongoose.model('Project', projectSchema);
