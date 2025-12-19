import express from 'express';
import { protect, authorize } from '../middlewares/auth.middleware';
import {
    getTrainerBatches,
    addMaterial,
    addAnnouncement,
    getBatchDetails,
    getStudentBatches,
    deleteMaterial,
    deleteAnnouncement
} from '../controllers/language.trainer.controller';
import { upload } from '../middlewares/upload.middleware';

const router = express.Router();

router.use(protect); // All routes require login

// Trainer Routes
router.get('/batches', authorize('trainer'), getTrainerBatches);
router.post('/materials', authorize('trainer'), upload.single('file'), addMaterial);
router.delete('/materials/:materialId', authorize('trainer'), deleteMaterial);
router.post('/announcements', authorize('trainer'), addAnnouncement);
router.delete('/announcements/:announcementId', authorize('trainer'), deleteAnnouncement);

// Student Routes
router.get('/student/batches', getStudentBatches);

// Shared Routes (Student & Trainer)
router.get('/batch/:batchId', getBatchDetails);

export default router;
