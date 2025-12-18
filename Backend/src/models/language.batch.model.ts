import mongoose, { Schema, Document } from "mongoose";

export interface IBatch extends Document {
  courseTitle: string;   // English
  name: string;          // e.g. A1, N5 (was levelName)
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

export default mongoose.model<IBatch>("LanguageBatch", BatchSchema);
