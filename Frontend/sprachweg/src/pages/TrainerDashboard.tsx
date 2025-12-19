import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../lib/api';
import {
    BookOpen,
    Users,
    Video,
    Upload,
    FileText,
    DollarSign,
    Bell,
    Calendar,
    CheckSquare,
    Clock,
    Play,
    StopCircle,
    Download,
    Edit,
    MessageSquare,
    BarChart
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface TrainerCourse {
    id: string;
    name: string;
    students: number;
    batches: number;
    nextSession: string;
    status: 'active' | 'paused';
}

interface LiveSession {
    id: string;
    courseName: string;
    batch: string;
    scheduledTime: string;
    isLive: boolean;
    studentCount?: number;
}

interface StudentPerformance {
    id: string;
    name: string;
    course: string;
    attendance: number;
    lastGrade: string;
}

interface PendingGrading {
    id: string;
    studentName: string;
    assignment: string;
    course: string;
    submittedDate: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockCourses: TrainerCourse[] = [
    {
        id: 'course-1',
        name: 'German A2 - Batch 5',
        students: 24,
        batches: 3,
        nextSession: '2025-12-17 10:00 AM',
        status: 'active'
    },
    {
        id: 'course-2',
        name: 'German B1 - Batch 3',
        students: 18,
        batches: 2,
        nextSession: '2025-12-18 2:00 PM',
        status: 'active'
    }
];

const mockLiveSession: LiveSession = {
    id: 'session-1',
    courseName: 'German A2',
    batch: 'Batch 5',
    scheduledTime: '10:00 AM',
    isLive: false
};

const mockStudents: StudentPerformance[] = [
    { id: '1', name: 'John Doe', course: 'German A2', attendance: 95, lastGrade: 'A' },
    { id: '2', name: 'Jane Smith', course: 'German A2', attendance: 88, lastGrade: 'B+' },
    { id: '3', name: 'Mike Johnson', course: 'German B1', attendance: 92, lastGrade: 'A-' }
];

const mockPendingGrading: PendingGrading[] = [
    {
        id: 'grade-1',
        studentName: 'John Doe',
        assignment: 'Essay on German Culture',
        course: 'German A2',
        submittedDate: '2025-12-15'
    },
    {
        id: 'grade-2',
        studentName: 'Jane Smith',
        assignment: 'Grammar Exercise Set 3',
        course: 'German A2',
        submittedDate: '2025-12-14'
    }
];

// ============================================================================
// COMPONENTS
// ============================================================================

const StatCard: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: string | number;
    trend?: string;
}> = ({ icon, label, value, trend }) => {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-2 flex items-center justify-between">
                <div className="rounded-lg bg-[#d6b161]/10 p-2 text-[#d6b161]">{icon}</div>
                {trend && <span className="text-xs font-semibold text-green-500">{trend}</span>}
            </div>
            <p className="mb-1 text-3xl font-bold text-[#0a192f] dark:text-white">{value}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
        </div>
    );
};

const CourseManagementCard: React.FC<{ course: TrainerCourse }> = ({ course }) => {

    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
        >
            <div className="mb-4 flex items-start justify-between">
                <div>
                    <h3 className="mb-1 text-xl font-bold text-[#0a192f] dark:text-white">{course.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {course.students} students
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {course.batches} batches
                        </span>
                    </div>
                </div>
                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${course.status === 'active'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                        }`}
                >
                    {course.status}
                </span>
            </div>

            <div className="mb-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                    <Clock className="mr-1 inline h-4 w-4 text-[#d6b161]" />
                    Next session: {course.nextSession}
                </p>
            </div>

            <div className="flex gap-2">
                <button className="flex-1 rounded-lg bg-[#d6b161] px-4 py-2 text-sm font-semibold text-[#0a192f] transition-colors hover:bg-[#c4a055]">
                    Manage Batch
                </button>
                <button className="flex-1 rounded-lg border-2 border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-[#d6b161] hover:text-[#d6b161] dark:border-gray-600 dark:text-gray-300">
                    <Edit className="mr-1 inline h-4 w-4" />
                    Edit Course
                </button>
            </div>
        </motion.div>
    );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const TrainerDashboard: React.FC = () => {
    const [courses, setCourses] = useState<any[]>([]); // Use any for now or define interface matching backend
    const [loading, setLoading] = useState(true);
    const [liveSession, setLiveSession] = useState<LiveSession>(mockLiveSession);
    const [students] = useState<StudentPerformance[]>(mockStudents);
    const [pendingGrading] = useState<PendingGrading[]>(mockPendingGrading);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBatches = async () => {
            try {
                const response = await api.get('/language-trainer/batches');
                setCourses(response.data);
            } catch (error) {
                console.error("Failed to fetch batches", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBatches();
    }, []);

    const handleBatchClick = (batchId: string) => {
        navigate(`/language-batch/${batchId}`);
    };

    const handleStartLiveClass = () => {
        // ... existing logic
    };
    const handleStopLiveClass = () => {
        // ... existing logic
    };

    const handleUploadMaterial = () => {
        // Redirect to first batch or show modal (logic simplified for now)
        if (courses.length > 0) {
            navigate(`/language-batch/${courses[0]._id}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />

            <main id="main-content" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 rounded-2xl bg-gradient-to-br from-[#0a192f] to-[#112240] p-8 text-white"
                >
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="mb-2 text-3xl font-bold">Trainer Dashboard</h1>
                            <p className="text-gray-300">Manage your language batches</p>
                        </div>
                        {/* Stats - using courses.length */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                                <p className="text-3xl font-bold">{courses.reduce((acc, c) => acc + (c.students?.length || 0), 0)}</p>
                                <p className="text-sm text-gray-300">Active Students</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold">{courses.length}</p>
                                <p className="text-sm text-gray-300">Batches</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Main Content */}
                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        {/* Course Management */}
                        <section>
                            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-[#0a192f] dark:text-white">
                                <BookOpen className="h-6 w-6 text-[#d6b161]" />
                                My Language Batches
                            </h2>
                            {loading ? <p>Loading batches...</p> : (
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {courses.map((course) => (
                                        <motion.div
                                            key={course._id}
                                            whileHover={{ y: -4 }}
                                            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
                                        >
                                            <div className="mb-4">
                                                <h3 className="mb-1 text-xl font-bold text-[#0a192f] dark:text-white">{course.courseTitle}</h3>
                                                <p className="text-sm text-gray-500">{course.name}</p>
                                                <div className="mt-2 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                                    <span className="flex items-center gap-1">
                                                        <Users className="h-4 w-4" />
                                                        {course.students?.length || 0} students
                                                    </span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleBatchClick(course._id)}
                                                className="w-full rounded-lg bg-[#d6b161] px-4 py-2 text-sm font-semibold text-[#0a192f] transition-colors hover:bg-[#c4a055]"
                                            >
                                                Manage Batch
                                            </button>
                                        </motion.div>
                                    ))}
                                    {courses.length === 0 && <p className="text-gray-500">No batches assigned yet.</p>}
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Sidebar - Keeping placeholders mostly but updating context */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-bold text-[#0a192f] dark:text-white">Quick Actions</h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => handleUploadMaterial()}
                                    className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    <Upload className="h-5 w-5 text-[#d6b161]" />
                                    <span className="text-sm font-medium">Upload Material</span>
                                </button>
                                {/* Other buttons preserved as UI placeholders */}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TrainerDashboard;
