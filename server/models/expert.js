import mongoose from 'mongoose';
import moment from 'moment';

const Schema = mongoose.Schema;

const expertSchema = new Schema({
  name: { type: 'String', required: true, max: 20 },
  description: { type: 'String', required: true, max: 1000 },
  projects: [{ 
    _id: 'String',
    status: 'String' 
  }],
  dateAdded: { type: 'Date', default: moment(), required: true },
});

export default mongoose.model('Expert', expertSchema);
