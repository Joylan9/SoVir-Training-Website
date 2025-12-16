import express from 'express';
import {
    getAllLanguages,
    getLanguageById,
    createLanguage,
    updateLanguage,
    deleteLanguage
} from '../controllers/languageCourse.controller';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Multer setup for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get('/', getAllLanguages);
router.get('/:id', getLanguageById);
router.post('/', upload.single('image'), createLanguage);
router.put('/:id', upload.single('image'), updateLanguage);
router.delete('/:id', deleteLanguage);

export default router;
