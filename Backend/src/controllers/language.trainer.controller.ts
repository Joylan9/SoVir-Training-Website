import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
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
        const { batchId, title, subtitle, description } = req.body;
        const trainerId = req.user?._id;
        let fileUrl = '';

        if (req.file) {
            // Store relative path so frontend can prepend API URL
            fileUrl = `/uploads/materials/${req.file.filename}`;
        }

        // Verify trainer owns the batch
        const batch = await LanguageBatch.findOne({ _id: batchId, trainerId });
        if (!batch) {
            return res.status(403).json({ message: 'Not authorized to add material to this batch' });
        }

        const material = new LanguageMaterial({
            batchId,
            title,
            subtitle,
            description,
            fileUrl, // Can be empty string if optional
            uploadedBy: trainerId
        });

        await material.save();
        res.status(201).json(material);
    } catch (error) {
        console.error("Error adding material:", error);
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

// Delete Material
export const deleteMaterial = async (req: AuthRequest, res: Response) => {
    try {
        const { materialId } = req.params;
        const trainerId = req.user?._id;

        const material = await LanguageMaterial.findById(materialId);
        if (!material) {
            return res.status(404).json({ message: 'Material not found' });
        }

        // Verify trainer owns the batch
        const batch = await LanguageBatch.findOne({ _id: material.batchId, trainerId });
        if (!batch) {
            return res.status(403).json({ message: 'Not authorized to delete this material' });
        }

        // Delete file from filesystem
        if (material.fileUrl) {
            try {
                // material.fileUrl is like "/uploads/materials/filename.ext"
                // Resolve path relative to process.cwd() (typically project root where package.json is)
                const relativePath = material.fileUrl.startsWith('/') ? material.fileUrl.slice(1) : material.fileUrl;
                const filePath = path.join(process.cwd(), relativePath);

                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    console.log(`Deleted file: ${filePath}`);
                } else {
                    console.warn(`File not found for deletion: ${filePath}`);
                }
            } catch (err) {
                console.error("Error deleting physical file:", err);
                // Continue to delete record
            }
        }

        await LanguageMaterial.findByIdAndDelete(materialId);
        res.json({ message: 'Material deleted successfully' });
    } catch (error) {
        console.error("Error deleting material:", error);
        res.status(500).json({ message: 'Error deleting material', error });
    }
};

// Delete Announcement
export const deleteAnnouncement = async (req: AuthRequest, res: Response) => {
    try {
        const { announcementId } = req.params;
        const trainerId = req.user?._id;

        const announcement = await LanguageAnnouncement.findById(announcementId);
        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }

        // Verify trainer owns the batch
        const batch = await LanguageBatch.findOne({ _id: announcement.batchId, trainerId });
        if (!batch) {
            return res.status(403).json({ message: 'Not authorized to delete this announcement' });
        }

        await LanguageAnnouncement.findByIdAndDelete(announcementId);
        res.json({ message: 'Announcement deleted successfully' });
    } catch (error) {
        console.error("Error deleting announcement:", error);
        res.status(500).json({ message: 'Error deleting announcement', error });
    }
};
