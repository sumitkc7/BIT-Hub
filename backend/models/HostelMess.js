import mongoose from 'mongoose';

const HMmessageSchema = new mongoose.Schema({
  username: String,
  content: String,
  image: { type: String, default: "" }, 
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Message || mongoose.model("Message", messageSchema);

