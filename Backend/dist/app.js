"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
// Middlewares
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
// CORS Configuration
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'http://localhost:3000'], // Allow frontend origins
    credentials: true, // Allow cookies and credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));
app.use(express_1.default.json());
const item_routes_1 = __importDefault(require("./routes/item.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const skillCourse_routes_1 = __importDefault(require("./routes/skillCourse.routes"));
// ... (middlewares)
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const enrollment_routes_1 = __importDefault(require("./routes/enrollment.routes"));
// Routes
app.use('/uploads', express_1.default.static('uploads')); // Serve uploaded files
app.use('/api/items', item_routes_1.default);
app.use('/api/auth', auth_routes_1.default);
app.use('/api/skills', skillCourse_routes_1.default);
app.use('/api/dashboard', dashboard_routes_1.default);
app.use('/api/enrollment', enrollment_routes_1.default);
app.get('/', (req, res) => {
    res.send('API is running...');
});
exports.default = app;
