import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

import itemRoutes from './routes/item.routes';
import authRoutes from './routes/auth.routes';
import skillRoutes from './routes/skillCourse.route';

// ... (middlewares)

// Routes
app.use('/uploads', express.static('uploads')); // Serve uploaded files
app.use('/api/items', itemRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

export default app;
