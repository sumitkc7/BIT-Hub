import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  branch: String,
  batch: String,
  hostel: String,
  mobile:Number,
});

export default mongoose.model('User', userSchema);
