import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import api from '../lib/api';
import {
    BookOpen,
    Users,
    Calendar,
    Upload
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

// ============================================================================
// HERO COMPONENT
// ============================================================================

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: custom * 0.1, ease: [0.22, 1, 0.36, 1] as const }
    })
};

const HeroBackground: React.FC = () => {
    const shouldReduceMotion = useReducedMotion();
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, shouldReduceMotion ? 0 : 150]);
    const y2 = useTransform(scrollY, [0, 500], [0, shouldReduceMotion ? 0 : -150]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);

    return (
        <motion.div
            style={{ opacity }}
            className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
            aria-hidden="true"
        >
            <motion.div
                style={{ y: y1 }}
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-[10%] -right-[10%] h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[#d6b161]/20 to-red-500/10 blur-[120px]"
            />
            <motion.div
                style={{ y: y2 }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-yellow-500/10 blur-[100px]"
            />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        </motion.div>
    );
};

interface Batch {
    _id: string;
    courseTitle: string;
    name: string;
    students: any[];
    // Add other fields from backend if needed
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const TrainerDashboard: React.FC = () => {
    const [batches, setBatches] = useState<Batch[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        const fetchBatches = async () => {
            try {
                const response = await api.get('/language-trainer/batches');
                setBatches(response.data);
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

    // Calculate simple stats
    const totalStudents = batches.reduce((acc, batch) => acc + (batch.students?.length || 0), 0);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            <Header />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#1a365d] overflow-hidden py-28 sm:py-36 text-center">
                <HeroBackground />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <h1 className="mb-4 text-4xl font-bold font-sans md:text-5xl text-white">Trainer Dashboard</h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">Manage your ongoing language classes and materials.</p>

                        <div className="mt-8 flex justify-center gap-12">
                            <div className="text-center">
                                <p className="text-4xl font-bold text-[#d6b161]">{loading ? "..." : batches.length}</p>
                                <p className="text-sm text-gray-400 mt-1">Active Batches</p>
                            </div>
                            <div className="text-center">
                                <p className="text-4xl font-bold text-[#d6b161]">{loading ? "..." : totalStudents}</p>
                                <p className="text-sm text-gray-400 mt-1">Total Students</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Batches Grid */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="flex items-center gap-2 text-2xl font-bold text-[#0a192f] dark:text-white">
                            <BookOpen className="h-6 w-6 text-[#d6b161]" />
                            My Batches
                        </h2>
                        <button
                            onClick={() => {
                                logout();
                                navigate('/login');
                            }}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg dark:text-red-400 dark:bg-red-900/20 dark:hover:bg-red-900/30 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                            Logout
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="w-8 h-8 border-4 border-[#d6b161] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : batches.length === 0 ? (
                        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
                            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-lg font-medium text-gray-900 dark:text-white">No batches assigned yet.</p>
                            <p className="text-gray-500 dark:text-gray-400">Batches will appear here once an admin assigns them to you.</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {batches.map((batch) => (
                                <motion.div
                                    key={batch._id}
                                    whileHover={{ y: -4 }}
                                    className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <div className="mb-4">
                                        <h3 className="mb-1 text-xl font-bold text-[#0a192f] dark:text-white line-clamp-1" title={batch.courseTitle}>
                                            {batch.courseTitle}
                                        </h3>
                                        <div className="inline-block rounded-md bg-blue-50 dark:bg-blue-900/20 px-2 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300">
                                            {batch.name}
                                        </div>
                                    </div>

                                    <div className="mb-6 flex-1 space-y-3">
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <Users className="h-4 w-4" />
                                            <span>{batch.students?.length || 0} Students Enrolled</span>
                                        </div>
                                        {/* You could add schedule/time here if backend provides it */}
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <Calendar className="h-4 w-4" />
                                            <span>Manage Curriculum</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleBatchClick(batch._id)}
                                        className="w-full rounded-lg bg-[#d6b161] px-4 py-2.5 text-sm font-bold text-[#0a192f] transition-colors hover:bg-[#c4a055] flex items-center justify-center gap-2"
                                    >
                                        <Upload className="h-4 w-4" />
                                        Manage Batch
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TrainerDashboard;
