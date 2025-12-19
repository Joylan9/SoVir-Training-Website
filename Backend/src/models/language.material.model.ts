import mongoose, { Schema, Document } from 'mongoose';

export interface ILanguageMaterial extends Document {
    batchId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    fileUrl: string;
    uploadedBy: mongoose.Types.ObjectId;
    createdAt: Date;
}

const LanguageMaterialSchema: Schema = new Schema(
    {
        batchId: { type: Schema.Types.ObjectId, ref: 'LanguageBatch', required: true },
        title: { type: String, required: true },
        description: { type: String },
        fileUrl: { type: String, required: true }, // URL or path to file
        uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true }
);

export default mongoose.model<ILanguageMaterial>('LanguageMaterial', LanguageMaterialSchema);
