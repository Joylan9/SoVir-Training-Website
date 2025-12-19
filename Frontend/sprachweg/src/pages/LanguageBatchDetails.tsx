import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
import { FileText, Bell, Download, Plus, ArrowLeft, Users } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import api from '../lib/api';

interface Annotation {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
}

interface Material {
    _id: string;
    title: string;
    description: string;
    fileUrl: string;
    createdAt: string;
}

interface Student {
    _id: string;
    name: string;
    email: string;
}

interface BatchDetails {
    _id: string;
    name: string;
    courseTitle: string;
    announcements: Annotation[];
    materials: Material[];
    students: Student[];
    trainerId: string;
}

const LanguageBatchDetails: React.FC = () => {
    const { batchId } = useParams<{ batchId: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [batch, setBatch] = useState<BatchDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'announcements' | 'materials' | 'students'>('announcements');

    // Forms State
    const [showAddModal, setShowAddModal] = useState(false);
    const [newItemTitle, setNewItemTitle] = useState('');
    const [newItemContent, setNewItemContent] = useState(''); // description for material
    const [newItemFile, setNewItemFile] = useState(''); // url for material

    const isTrainer = user?.role === 'trainer' || user?.id === batch?.trainerId;

    useEffect(() => {
        fetchBatchDetails();
    }, [batchId]);

    const fetchBatchDetails = async () => {
        try {
            // Using the shared route
            const response = await api.get(`/language-trainer/batch/${batchId}`);
            setBatch(response.data);
        } catch (error) {
            console.error("Failed to fetch batch details", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddItem = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (activeTab === 'announcements') {
                await api.post('/language-trainer/announcements', {
                    batchId,
                    title: newItemTitle,
                    content: newItemContent
                });
            } else {
                await api.post('/language-trainer/materials', {
                    batchId,
                    title: newItemTitle,
                    description: newItemContent,
                    fileUrl: newItemFile // In real app, handle file upload
                });
            }
            setShowAddModal(false);
            setNewItemTitle('');
            setNewItemContent('');
            setNewItemFile('');
            fetchBatchDetails(); // Refresh
        } catch (error) {
            console.error("Failed to add item", error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!batch) return <div>Batch not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <Button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <ArrowLeft className="h-4 w-4" /> Back
                </Button>

                <div className="mb-8 rounded-2xl bg-[#0a192f] p-8 text-white">
                    <h1 className="text-3xl font-bold">{batch.courseTitle} - {batch.name}</h1>
                    <p className="text-gray-300">Classroom Space</p>
                </div>

                <div className="mb-6 flex space-x-4 border-b border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => setActiveTab('announcements')}
                        className={`pb-4 text-sm font-medium transition-colors ${activeTab === 'announcements'
                            ? 'border-b-2 border-[#d6b161] text-[#d6b161]'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                            }`}
                    >
                        Announcements
                    </button>
                    <button
                        onClick={() => setActiveTab('materials')}
                        className={`pb-4 text-sm font-medium transition-colors ${activeTab === 'materials'
                            ? 'border-b-2 border-[#d6b161] text-[#d6b161]'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                            }`}
                    >
                        Learning Materials
                    </button>
                    <button
                        onClick={() => setActiveTab('students')}
                        className={`pb-4 text-sm font-medium transition-colors ${activeTab === 'students'
                            ? 'border-b-2 border-[#d6b161] text-[#d6b161]'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                            }`}
                    >
                        Students
                    </button>
                </div>

                {/* Content Area */}
                <div className="space-y-4">
                    {/* Add Button for Trainers */}
                    {isTrainer && activeTab !== 'students' && (
                        <Button onClick={() => setShowAddModal(true)} className="mb-4 flex items-center gap-2 bg-[#d6b161] text-[#0a192f]">
                            <Plus className="h-4 w-4" /> Add {activeTab === 'announcements' ? 'Announcement' : 'Material'}
                        </Button>
                    )}

                    {activeTab === 'announcements' ? (
                        <div className="space-y-4">
                            {batch.announcements.length === 0 && <p className="text-gray-500">No announcements yet.</p>}
                            {batch.announcements.map((item) => (
                                <div key={item._id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                    <div className="flex items-start gap-4">
                                        <div className="rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                            <Bell className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
                                            <p className="mt-1 text-gray-600 dark:text-gray-300">{item.content}</p>
                                            <p className="mt-2 text-xs text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : activeTab === 'materials' ? (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {batch.materials.length === 0 && <p className="text-gray-500">No materials yet.</p>}
                            {batch.materials.map((item) => (
                                <div key={item._id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                        <FileText className="h-6 w-6" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
                                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                                    <a
                                        href={item.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm font-medium text-[#d6b161] hover:underline"
                                    >
                                        <Download className="h-4 w-4" /> Download Resource
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {batch.students?.length === 0 && <p className="text-gray-500">No students enrolled yet.</p>}
                            {batch.students?.map((student) => (
                                <div key={student._id} className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                            <Users className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">{student.name}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{student.email}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Simple Modal for Adding Items */}
                {showAddModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <div className="w-full max-w-md rounded-2xl bg-white p-6 dark:bg-gray-800">
                            <h2 className="mb-4 text-xl font-bold dark:text-white">Add {activeTab === 'announcements' ? 'Announcement' : 'Material'}</h2>
                            <form onSubmit={handleAddItem} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={newItemTitle}
                                    onChange={e => setNewItemTitle(e.target.value)}
                                    className="w-full rounded-lg border p-2 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                                <textarea
                                    placeholder={activeTab === 'announcements' ? 'Content' : 'Description'}
                                    value={newItemContent}
                                    onChange={e => setNewItemContent(e.target.value)}
                                    className="w-full rounded-lg border p-2 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                                {activeTab === 'materials' && (
                                    <input
                                        type="text"
                                        placeholder="File URL (e.g. Google Drive link)"
                                        value={newItemFile}
                                        onChange={e => setNewItemFile(e.target.value)}
                                        className="w-full rounded-lg border p-2 dark:bg-gray-700 dark:text-white"
                                        required
                                    />
                                )}
                                <div className="flex gap-2">
                                    <Button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200">Cancel</Button>
                                    <Button type="submit" className="flex-1 bg-[#d6b161] text-[#0a192f]">Add</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default LanguageBatchDetails;
