import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import ImageUpload from '../../components/admin/ImageUpload';
import Button from '../../components/ui/Button';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { skillAPI } from '../../lib/api';
import type { SkillCourse } from '../../types/skill';

const SkillDashboard: React.FC = () => {
    const [courses, setCourses] = useState<SkillCourse[]>([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        level: 'Beginner',
        description: '',
        price: '',
        originalPrice: '',
        rating: '4.5',
        students: '0',
        duration: '',
        startDate: '',
        mode: 'Live',
        popular: false,
        features: [''],
        category: 'General',
        image: null as File | null,
    });

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const data = await skillAPI.getAll();
            setCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('subtitle', formData.subtitle);
            formDataToSend.append('level', formData.level);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('originalPrice', formData.originalPrice);
            formDataToSend.append('rating', formData.rating);
            formDataToSend.append('students', formData.students);
            formDataToSend.append('duration', formData.duration);
            formDataToSend.append('startDate', formData.startDate);
            formDataToSend.append('mode', formData.mode);
            formDataToSend.append('popular', String(formData.popular));
            formDataToSend.append('features', JSON.stringify(formData.features.filter(f => f.trim())));
            formDataToSend.append('category', formData.category);

            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }

            if (editingId) {
                await skillAPI.update(editingId, formDataToSend);
            } else {
                await skillAPI.create(formDataToSend);
            }

            await fetchCourses();
            resetForm();
            setShowForm(false);
        } catch (error) {
            console.error('Error saving course:', error);
            alert('Failed to save course');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (course: SkillCourse) => {
        setFormData({
            title: course.title,
            subtitle: course.subtitle || '',
            level: course.level || 'Beginner',
            description: course.description,
            price: course.price || '',
            originalPrice: course.originalPrice || '',
            rating: course.rating || '4.5',
            students: course.students || '0',
            duration: course.duration || '',
            startDate: course.startDate || '',
            mode: course.mode || 'Live',
            popular: course.popular || false,
            features: course.features?.length > 0 ? course.features : [''],
            category: course.category,
            image: null,
        });
        setEditingId(course._id || null);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this course?')) return;

        try {
            setLoading(true);
            await skillAPI.delete(id);
            await fetchCourses();
        } catch (error) {
            console.error('Error deleting course:', error);
            alert('Failed to delete course');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            subtitle: '',
            level: 'Beginner',
            description: '',
            price: '',
            originalPrice: '',
            rating: '4.5',
            students: '0',
            duration: '',
            startDate: '',
            mode: 'Live',
            popular: false,
            features: [''],
            category: 'General',
            image: null,
        });
        setEditingId(null);
    };

    const addFeature = () => {
        setFormData(prev => ({
            ...prev,
            features: [...prev.features, '']
        }));
    };

    const removeFeature = (index: number) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    const updateFeature = (index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.map((f, i) => i === index ? value : f)
        }));
    };

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">
                            Skill Courses
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Manage your skill training courses
                        </p>
                    </div>
                    <Button
                        onClick={() => {
                            resetForm();
                            setShowForm(true);
                        }}
                        className="bg-[#d6b161] hover:bg-[#c4a055] text-[#0a192f] flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Course
                    </Button>
                </div>

                {/* Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-[#112240] rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center sticky top-0 bg-white dark:bg-[#112240] z-10">
                                <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">
                                    {editingId ? 'Edit Course' : 'Add New Course'}
                                </h2>
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-[#0a192f] rounded-lg"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Left Column */}
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Course Title *</label>
                                            <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a192f] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#d6b161] focus:border-transparent" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subtitle</label>
                                            <input type="text" value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a192f] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#d6b161] focus:border-transparent" placeholder="e.g. Beginner's Journey" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Level</label>
                                            <select value={formData.level} onChange={(e) => setFormData({ ...formData, level: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a192f] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#d6b161] focus:border-transparent">
                                                <option value="Beginner">Beginner</option>
                                                <option value="Intermediate">Intermediate</option>
                                                <option value="Advanced">Advanced</option>
                                                <option value="All Levels">All Levels</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category *</label>
                                            <input type="text" required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a192f] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#d6b161] focus:border-transparent" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description *</label>
                                            <textarea required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a192f] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#d6b161] focus:border-transparent" />
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price (€)</label>
                                                <input type="text" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a192f] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#d6b161] focus:border-transparent" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Original Price (€)</label>
                                                <input type="text" value={formData.originalPrice} onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a192f] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#d6b161] focus:border-transparent" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Duration</label>
                                                <input type="text" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a192f] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#d6b161] focus:border-transparent" placeholder="e.g. 8 weeks" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
                                                <input type="text" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a192f] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#d6b161] focus:border-transparent" placeholder="e.g. Jan 15, 2024" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
                                                <input type="text" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a192f] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#d6b161] focus:border-transparent" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Enrolled Students</label>
                                                <input type="text" value={formData.students} onChange={(e) => setFormData({ ...formData, students: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a192f] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#d6b161] focus:border-transparent" />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 py-2">
                                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                <input type="checkbox" checked={formData.popular} onChange={(e) => setFormData({ ...formData, popular: e.target.checked })} className="rounded border-gray-300 text-[#d6b161] focus:ring-[#d6b161]" />
                                                Mark as Popular
                                            </label>
                                            <div className="flex-1">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mode</label>
                                                <select value={formData.mode} onChange={(e) => setFormData({ ...formData, mode: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a192f] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#d6b161] focus:border-transparent">
                                                    <option value="Live">Live</option>
                                                    <option value="Hybrid">Hybrid</option>
                                                    <option value="Self-Paced">Self-Paced</option>
                                                </select>
                                            </div>
                                        </div>
                                        <ImageUpload value={formData.image || undefined} onChange={(file) => setFormData({ ...formData, image: file })} />
                                    </div>
                                </div>

                                {/* Features Full Width */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Features/Topics</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {formData.features.map((feature, index) => (
                                            <div key={index} className="flex gap-2">
                                                <input type="text" value={feature} onChange={(e) => updateFeature(index, e.target.value)} className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a192f] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#d6b161] focus:border-transparent" placeholder=" Feature" />
                                                <button type="button" onClick={() => removeFeature(index)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg"><Trash2 className="w-5 h-5" /></button>
                                            </div>
                                        ))}
                                    </div>
                                    <button type="button" onClick={addFeature} className="mt-2 text-[#d6b161] hover:text-[#c4a055] text-sm font-medium">+ Add Feature</button>
                                </div>

                                <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                                    <Button type="submit" disabled={loading} className="flex-1 bg-[#d6b161] hover:bg-[#c4a055] text-[#0a192f] flex items-center justify-center gap-2"><Save className="w-5 h-5" />{loading ? 'Saving...' : editingId ? 'Update Course' : 'Create Course'}</Button>
                                    <Button type="button" onClick={() => setShowForm(false)} variant="outline" className="flex-1">Cancel</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Courses Grid */}
                {loading && !showForm ? (
                    <div className="text-center py-12">
                        <div className="inline-block w-8 h-8 border-4 border-[#d6b161] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <div key={course._id} className="bg-white dark:bg-[#112240] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden group hover:shadow-lg transition-shadow">
                                {course.image && (
                                    <div className="relative h-48">
                                        <img src={`http://localhost:5000/${course.image}`} alt={course.title} className="w-full h-full object-cover" />
                                        {course.popular && <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Popular</div>}
                                        {course.level && <div className="absolute top-4 right-4 bg-[#d6b161] text-[#0a192f] text-xs font-bold px-3 py-1 rounded-full">{course.level}</div>}
                                    </div>
                                )}
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="text-[#d6b161] text-sm font-semibold">{course.category}</div>
                                        {course.rating && <div className="flex items-center gap-1 text-sm text-yellow-500">★ {course.rating}</div>}
                                    </div>
                                    <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-1">{course.title}</h3>
                                    {course.subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{course.subtitle}</p>}

                                    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                                        {course.duration && <span>{course.duration}</span>}
                                        {course.mode && <span>{course.mode}</span>}
                                    </div>

                                    <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
                                        <div className="flex flex-col">
                                            {course.originalPrice && <span className="text-xs text-gray-400 line-through">{course.originalPrice}</span>}
                                            <span className="text-xl font-bold text-[#0a192f] dark:text-white">{course.price || 'Free'}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEdit(course)} className="p-2 bg-[#d6b161]/10 text-[#d6b161] rounded-lg hover:bg-[#d6b161]/20"><Edit className="w-4 h-4" /></button>
                                            <button onClick={() => handleDelete(course._id!)} className="p-2 bg-red-50 dark:bg-red-900/10 text-red-600 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && courses.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600 dark:text-gray-400">
                            No courses yet. Click "Add Course" to create your first skill training course.
                        </p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};
export default SkillDashboard;
