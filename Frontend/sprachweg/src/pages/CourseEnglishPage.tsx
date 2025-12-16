import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Check, ChevronRight, BookOpen, Clock, Target, Award, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { languageAPI } from '../lib/api';
import type { SkillCourse } from '../types/skill';

// Animated Hero Background
const HeroBackground: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, shouldReduceMotion ? 0 : -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, shouldReduceMotion ? 0 : -30]);

  return (
    <>
      <motion.div
        style={{ y: y1 }}
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#d6b161]/20 blur-3xl"
        aria-hidden="true"
      />
      <motion.div
        style={{ y: y2 }}
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"
        aria-hidden="true"
      />
    </>
  );
};

// Course Level Card Component
interface CourseLevelCardProps {
  level: NonNullable<SkillCourse['levels']>[number];
  index: number;
}

const CourseLevelCard: React.FC<CourseLevelCardProps> = ({ level, index }) => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const handleEnroll = () => {
    navigate('/register');
  };



  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : index * 0.1 }}
      whileHover={shouldReduceMotion ? {} : { y: -6 }}
      className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 sm:p-8"
    >
      {/* Level Badge */}
      <div className="mb-4 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#0a192f] px-4 py-2 text-sm font-bold text-white dark:bg-gray-700">
          <BookOpen className="h-4 w-4 text-[#d6b161]" />
          {level.name}
        </span>
        <div className="text-right">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Duration</p>
          <p className="flex items-center gap-1 text-sm font-bold text-[#0a192f] dark:text-gray-100">
            <Clock className="h-4 w-4 text-[#d6b161]" />
            {level.duration}
          </p>
        </div>
      </div>

      {/* Price */}
      <div className="mb-6">
        <p className="text-4xl font-bold text-[#0a192f] dark:text-gray-100">{level.price}</p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Complete course package</p>
      </div>

      {/* Curriculum */}
      <div className="mb-6 flex-1">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300">
          <Target className="h-4 w-4 text-[#d6b161]" />
          What You'll Learn
        </h3>
        <ul className="space-y-2">
          {level.features.slice(0, 8).map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Outcome Badge */}
      <div className="mb-6 rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Outcome</p>
        <p className="mt-1 text-sm font-medium text-gray-900 dark:text-gray-100">{level.outcome}</p>
      </div>

      {/* Exam Special Pill (Optional) */}
      {level.examPrep && level.examPrep.title && (
        <div className="mb-6">
          <div className="rounded-xl border-2 border-dashed border-[#d6b161] bg-[#d6b161]/5 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Award className="h-5 w-5 text-[#d6b161]" />
              <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{level.examPrep.title}</span>
            </div>
            <p className="mb-1 text-xs font-semibold text-gray-900 dark:text-gray-100">{level.examPrep.title}</p>
            <p className="mb-2 text-xs text-gray-600 dark:text-gray-400">{level.examPrep.details}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {level.examPrep.price}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <motion.button
          onClick={handleEnroll}
          whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#0a192f] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#112240] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#d6b161] focus:ring-offset-2 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Enroll Now
          <ChevronRight className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

// FAQ Accordion Item
const faqs = [
  {
    id: '1',
    question: 'Do I need prior English knowledge?',
    answer: 'Our Beginner level welcomes complete beginners. We assess your level and place you in the right program.'
  },
  {
    id: '2',
    question: 'Are classes live or recorded?',
    answer: 'We offer both options. Live classes provide real-time interaction, while recorded sessions offer flexibility.'
  },
  {
    id: '3',
    question: 'Will I get a certificate?',
    answer: 'Yes! Upon completion, you receive a verified certificate recognized by employers and universities.'
  }
];

const FAQItem: React.FC<{ faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }> = ({ faq, isOpen, onToggle }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d6b161]"
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold text-gray-900 dark:text-gray-100 pr-4">{faq.question}</span>
        <span className={`flex-shrink-0 text-[#d6b161] transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronRight className="h-5 w-5 rotate-90" />
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {faq.answer}
        </p>
      </motion.div>
    </div>
  );
};

// Main Component
const CourseEnglishPage: React.FC = () => {
  const [course, setCourse] = useState<SkillCourse | null>(null);
  const [loading, setLoading] = useState(true);
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courses = await languageAPI.getAll();
        const englishCourse = courses.find((c: any) => c.title.includes('English'));
        if (englishCourse) {
          setCourse(englishCourse);
        }
      } catch (error) {
        console.error('Failed to fetch course data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-12 h-12 border-4 border-[#d6b161] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-xl text-gray-600 dark:text-gray-400">Course not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      {/* Skip to Content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-[#0a192f] focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-[#d6b161]"
      >
        Skip to content
      </a>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#1a365d]">
        <HeroBackground />

        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-[#d6b161] backdrop-blur-sm"
          >
            <Award className="h-4 w-4" />
            {course.subtitle || 'Learn English'}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mx-auto mb-6 max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            {course.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-12 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg"
          >
            {course.description}
          </motion.p>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300"
          >
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400" />
              <span>Certified Curriculum</span>
            </div>
            <span className="hidden text-gray-500 sm:block">•</span>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-400" />
              <span>Native Instructors</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main id="main-content" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Course Levels Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
              Packages & Levels
            </h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600 dark:text-gray-400">
              Choose the level that fits your goals.
            </p>
          </motion.div>

          {course.levels && course.levels.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {course.levels.map((level, index) => (
                <CourseLevelCard
                  key={index}
                  level={level}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">No levels defined for this course yet.</div>
          )}
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openFAQ === faq.id}
                onToggle={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
              />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-gradient-to-br from-[#0a192f] to-[#112240] p-8 text-center text-white sm:p-12"
        >
          <Zap className="mx-auto mb-4 h-12 w-12 text-[#d6b161]" />
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Start Learning Today</h2>
          <p className="mx-auto mb-8 max-w-2xl text-base text-gray-300">
            Join thousands of students achieving their language goals.
          </p>
          <motion.button
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 rounded-lg bg-[#d6b161] px-8 py-4 text-base font-semibold text-[#0a192f] shadow-lg transition-all hover:bg-[#c4a055] focus:outline-none focus:ring-2 focus:ring-[#d6b161] focus:ring-offset-2 focus:ring-offset-[#0a192f]"
          >
            View Levels
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default CourseEnglishPage;
