import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    GraduationCap,
    Users,
    Award,
    BookOpen,
    Video,
    MessageCircle,
    TrendingUp,
    CheckCircle,
    ArrowRight,
    Star,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const LandingPage: React.FC = () => {
    const stats = [
        { value: '150+', label: 'Active Students' },
        { value: '8', label: 'Expert Trainers' },
        { value: '6', label: 'Level Programs' },
        { value: '95%', label: 'Success Rate' },
    ];

    const features = [
        {
            icon: <Video className="w-6 h-6" />,
            title: 'Live Classes',
            description: 'Interactive sessions with native German speakers',
        },
        {
            icon: <BookOpen className="w-6 h-6" />,
            title: 'Structured Curriculum',
            description: 'A1 to C2 levels with clear progression paths',
        },
        {
            icon: <Award className="w-6 h-6" />,
            title: 'Certificates',
            description: 'Recognized certifications upon completion',
        },
        {
            icon: <MessageCircle className="w-6 h-6" />,
            title: 'Placement Support',
            description: 'Career guidance for German-speaking markets',
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: 'Community',
            description: 'Connect with fellow learners worldwide',
        },
        {
            icon: <TrendingUp className="w-6 h-6" />,
            title: 'AI Practice',
            description: 'Smart exercises tailored to your level',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800"
            >
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                                <span className="text-white font-black text-lg">SW</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">SprachWeg</span>
                        </div>

                        <div className="hidden md:flex items-center gap-8">
                            <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors">
                                Features
                            </a>
                            <a href="#levels" className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors">
                                Levels
                            </a>
                            <a href="#testimonials" className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors">
                                Testimonials
                            </a>
                            <a href="#pricing" className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors">
                                Pricing
                            </a>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link to="/login">
                                <Button variant="ghost">Log In</Button>
                            </Link>
                            <Link to="/register">
                                <Button>Start Free</Button>
                            </Link>
                        </div>
                    </div>
                </nav>
            </motion.header>

            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 lg:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                                <Star className="w-4 h-4 fill-current" />
                                <span>150+ Students Learning German</span>
                            </div>

                            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
                                Master German with{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                                    SprachWeg
                                </span>
                            </h1>

                            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                Your comprehensive path to German fluency. Live classes, expert trainers, and a proven curriculum from A1 to C2.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <Link to="/register">
                                    <Button size="lg" className="w-full sm:w-auto">
                                        Start Learning Free
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </Link>
                                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                    <Video className="w-5 h-5 mr-2" />
                                    Watch Demo
                                </Button>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 border-2 border-white dark:border-gray-900 flex items-center justify-center text-white font-semibold"
                                        >
                                            {String.fromCharCode(64 + i)}
                                        </div>
                                    ))}
                                </div>
                                <div className="text-sm">
                                    <div className="flex items-center gap-1 text-orange-500">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Trusted by <strong>150+ students</strong>
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src="/api/placeholder/600/700"
                                    alt="Student learning German"
                                    className="w-full h-auto"
                                />

                                {/* Floating Cards */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8, duration: 0.5 }}
                                    className="absolute top-8 left-8 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-gray-900 dark:text-white">Live Class</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">Starting in 30 min</div>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1, duration: 0.5 }}
                                    className="absolute bottom-8 right-8 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                                            <GraduationCap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-gray-900 dark:text-white">B1 Certified</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">Achievement Unlocked!</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-gradient-to-r from-orange-500 via-pink-500 to-orange-500 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="text-4xl lg:text-5xl font-black text-white dark:text-orange-400 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-white/90 dark:text-gray-400 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 lg:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
                            Everything You Need to{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                                Master German
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Our comprehensive platform provides all the tools for your German learning journey
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card hover className="h-full">
                                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center text-orange-600 dark:text-orange-400 mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-3xl bg-gradient-to-r from-orange-500 via-pink-500 to-orange-500 p-12 lg:p-16 text-center overflow-hidden"
                    >
                        <div className="relative z-10">
                            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
                                Start Your German Journey Today
                            </h2>
                            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                                Join 150+ students already learning with SprachWeg. First week free, no credit card required.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/register">
                                    <Button size="lg" variant="secondary" className="!bg-white !text-orange-600 hover:!bg-gray-100">
                                        Get Started Free
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </Link>
                                <Button size="lg" variant="outline" className="!border-white !text-white hover:!bg-white/10">
                                    Learn More
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 dark:bg-black text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                                    <span className="text-white font-black">SW</span>
                                </div>
                                <span className="text-xl font-bold">SprachWeg</span>
                            </div>
                            <p className="text-gray-400 text-sm">
                                Your comprehensive path to German fluency with expert-led courses and live classes.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-bold mb-4">Platform</h3>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Courses</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Certificates</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold mb-4">Company</h3>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold mb-4">Legal</h3>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
                        <p>&copy; 2025 SprachWeg. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
