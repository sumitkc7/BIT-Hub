import express from 'express';
import multer from 'multer';
import { storage } from '../cloudinary.js'; // Cloudinary storage config
import { HMgetMessages, HMaddMessage } from '../controllers/HMchatController.js';

const router = express.Router();

const upload = multer({ storage });

router.get('/', HMgetMessages);


router.post('/', upload.single('image'), HMaddMessage);

export default router;
