import express from 'express';
import { protect, authorize } from '../middlewares/auth.middleware';
import {
    getTrainerBatches,
    addMaterial,
    addAnnouncement,
    getBatchDetails,
    getStudentBatches
} from '../controllers/language.trainer.controller';

const router = express.Router();

router.use(protect); // All routes require login

// Trainer Routes
router.get('/batches', authorize('trainer'), getTrainerBatches);
router.post('/materials', authorize('trainer'), addMaterial);
router.post('/announcements', authorize('trainer'), addAnnouncement);

// Student Routes
router.get('/student/batches', getStudentBatches);

// Shared Routes (Student & Trainer)
router.get('/batch/:batchId', getBatchDetails);

export default router;
