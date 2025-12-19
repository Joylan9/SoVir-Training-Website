import mongoose, { Schema, Document } from "mongoose";

export interface IBatch extends Document {
  courseTitle: string;   // English
  name: string;          // e.g. A1, N5 (was levelName)
  trainerId: mongoose.Types.ObjectId;
  students: mongoose.Types.ObjectId[];
}

const BatchSchema = new Schema(
  {
    courseTitle: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    trainerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

BatchSchema.index(
  { courseTitle: 1, name: 1 },
  { unique: true }
);

// Virtual for announcements
BatchSchema.virtual('announcements', {
  ref: 'LanguageAnnouncement',
  localField: '_id',
  foreignField: 'batchId'
});

// Virtual for materials
BatchSchema.virtual('materials', {
  ref: 'LanguageMaterial',
  localField: '_id',
  foreignField: 'batchId'
});

export default mongoose.model<IBatch>("LanguageBatch", BatchSchema);
