import { Request, Response } from 'express';
import LanguageBatch from '../models/language.batch.model';
import LanguageMaterial from '../models/language.material.model';
import LanguageAnnouncement from '../models/language.announcement.model';
import { AuthRequest } from '../middlewares/auth.middleware';

// Get all batches assigned to the trainer
export const getTrainerBatches = async (req: AuthRequest, res: Response) => {
    try {
        const trainerId = req.user?._id;
        const batches = await LanguageBatch.find({ trainerId })
            .populate('students', 'name email')
            .populate({ path: 'materials' })
            .populate({ path: 'announcements' });

        res.json(batches);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching batches', error });
    }
};

// Get all batches where the student is enrolled
export const getStudentBatches = async (req: AuthRequest, res: Response) => {
    try {
        const studentId = req.user?._id;
        const batches = await LanguageBatch.find({ students: studentId })
            .populate('trainerId', 'name')
            .populate({ path: 'materials' })
            .populate({ path: 'announcements' });

        res.json(batches);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student batches', error });
    }
};

// Add Material to a Batch
export const addMaterial = async (req: AuthRequest, res: Response) => {
    try {
        const { batchId, title, description, fileUrl } = req.body;
        const trainerId = req.user?._id;

        // Verify trainer owns the batch
        const batch = await LanguageBatch.findOne({ _id: batchId, trainerId });
        if (!batch) {
            return res.status(403).json({ message: 'Not authorized to add material to this batch' });
        }

        const material = new LanguageMaterial({
            batchId,
            title,
            description,
            fileUrl,
            uploadedBy: trainerId
        });

        await material.save();
        res.status(201).json(material);
    } catch (error) {
        res.status(500).json({ message: 'Error adding material', error });
    }
};

// Add Announcement to a Batch
export const addAnnouncement = async (req: AuthRequest, res: Response) => {
    try {
        const { batchId, title, content } = req.body;
        const trainerId = req.user?._id;

        // Verify trainer owns the batch
        const batch = await LanguageBatch.findOne({ _id: batchId, trainerId });
        if (!batch) {
            return res.status(403).json({ message: 'Not authorized to add announcement to this batch' });
        }

        const announcement = new LanguageAnnouncement({
            batchId,
            title,
            content,
            senderId: trainerId
        });

        await announcement.save();
        res.status(201).json(announcement);
    } catch (error) {
        res.status(500).json({ message: 'Error adding announcement', error });
    }
};

// Get specific batch details (for both Student and Trainer)
export const getBatchDetails = async (req: AuthRequest, res: Response) => {
    try {
        const { batchId } = req.params;
        const userId = req.user?._id;

        const batch = await LanguageBatch.findById(batchId)
            .populate('students', 'name email')
            .populate('materials')
            .populate('announcements');

        if (!batch) {
            return res.status(404).json({ message: 'Batch not found' });
        }

        // Check access: Must be Trainer of the batch OR a Student in the batch
        const isTrainer = batch.trainerId?.toString() === userId?.toString();
        const isStudent = batch.students.some((s: any) => s._id.toString() === userId?.toString() || s.toString() === userId?.toString());

        if (!isTrainer && !isStudent) {
            return res.status(403).json({ message: 'Not authorized to view this batch' });
        }

        res.json(batch);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching batch details', error });
    }
};
