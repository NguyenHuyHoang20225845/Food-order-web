import express from 'express';
import multer from 'multer';
import { createItem, getItems, deleteItem } from '../controllers/itemController.js';
import authMiddleware from '../middleware/auth.js';
import adminMiddleware from '../middleware/admin.js';

const itemRouter = express.Router();

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, 'uploads/'),
    filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

itemRouter.post('/', authMiddleware, adminMiddleware, upload.single('image'), createItem);
itemRouter.get('/', getItems);
itemRouter.delete('/:id', authMiddleware, adminMiddleware, deleteItem);

export default itemRouter;