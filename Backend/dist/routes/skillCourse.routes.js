"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const skillCourse_controller_1 = require("../controllers/skillCourse.controller");
const multer_1 = require("../config/multer");
// Import auth middleware if you have one, e.g. verifyToken
// import { verifyToken, isAdmin } from '../middlewares/auth.middleware';
const router = (0, express_1.Router)();
// Public routes
router.get('/', skillCourse_controller_1.getAllCourses);
// Protected routes (Add middleware when available)
// For now, assuming anyone can add for development or if auth middleware is ready use it
// router.post('/', verifyToken, isAdmin, upload.single('image'), createCourse);
router.post('/', multer_1.upload.single('image'), skillCourse_controller_1.createCourse);
router.put('/:id', multer_1.upload.single('image'), skillCourse_controller_1.updateCourse);
router.delete('/:id', skillCourse_controller_1.deleteCourse);
exports.default = router;
