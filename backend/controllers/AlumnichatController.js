import Message from '../models/Alumni.js';

// Get all messages
export const AlumnigetMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a message with optional image
export const AlumniaddMessage = async (req, res) => {
  try {
    const { username, content } = req.body;

    const newMessage = new Message({
      username,
      content,
      image: req.file ? req.file.path : "", // Save Cloudinary URL
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
