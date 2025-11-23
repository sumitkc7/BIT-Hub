import express from 'express';
import multer from 'multer';
import { storage } from '../cloudinary.js'; // Cloudinary storage config
import { getMessages, addMessage } from '../controllers/chatController.js';

const router = express.Router();

// Multer middleware using Cloudinary storage
const upload = multer({ storage });

// Route to get all messages
router.get('/', getMessages);

// Route to add a new message with optional image
// Expects: username (text), content (text), image (file)
router.post('/', upload.single('image'), addMessage);

export default router;
