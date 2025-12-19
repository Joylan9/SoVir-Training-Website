
import mongoose from 'mongoose';
import LanguageBatch from './src/models/language.batch.model';
import User from './src/models/user.model';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, 'Backend', '.env') });
// Or try default location
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sprachweg'; // Adjust if needed

const runDebug = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to DB');

        const batches = await LanguageBatch.find({});
        console.log('--- ALL BATCHES ---');
        console.log(JSON.stringify(batches, null, 2));

        const users = await User.find({ email: { $regex: 'test', $options: 'i' } }); // limit to test users if possible
        // console.log('--- USERS ---');
        // console.log(JSON.stringify(users, null, 2));

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

runDebug();
