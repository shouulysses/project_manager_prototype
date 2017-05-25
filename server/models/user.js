import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, default: '', required: true, index: { unique: true } },
  password: { type: String, default: '', required: true },
  create_at: { type: 'Date', default: Date.now }
});

userSchema.methods.generateHash = password => 
  bcrypt.hashSync(password, null, null);

userSchema.methods.validatePassword = function(password, validate){
  return bcrypt.compareSync(password, validate);
};

export default mongoose.model('User', userSchema);

