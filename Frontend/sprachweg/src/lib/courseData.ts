import { Batch } from '../components/course/BatchCard';
import { CurriculumModule } from '../components/course/CurriculumAccordion';
import { FAQItem } from '../components/course/FAQAccordion';
import { PricingPlan } from '../components/course/PricingCard';
import { Review } from '../components/course/ReviewsList';
import { Trainer } from '../components/course/TrainerCard';
import { useEffect, useState } from 'react';

export interface CourseData {
  slug: 'english' | 'german' | 'japanese';
  metaTitle: string;
  metaDescription: string;
  hero: {
    title: string;
    subtitle: string;
    levelBadge?: string;
    hasLiveSession?: boolean;
  };
  overview: {
    summary: string;
    outcomes: string[];
    whoIsFor: string[];
  };
  curriculum: CurriculumModule[];
  batches: Batch[];
  trainers: Trainer[];
  pricing: PricingPlan[];
  reviewsSummary: {
    rating: number;
    totalReviews: number;
    students: number;
  };
  reviews: Review[];
  faq: FAQItem[];
}

export const englishCourseData: CourseData = {
  slug: 'english',
  metaTitle: 'Business & Academic English Course | SoVir Akademie',
  metaDescription:
    'Master Business and Academic English with live classes, personalized feedback, and globally recognized certification.',
  hero: {
    title: 'Business & Academic English Mastery',
    subtitle:
      'Develop fluent, confident English for global workplaces, universities, and international opportunities.',
    levelBadge: 'Beginner to Advanced',
    hasLiveSession: true,
  },
  overview: {
    summary:
      'A structured English program focused on speaking, writing, and comprehension for professional and academic success.',
    outcomes: [
      'Confidently communicate in professional and academic settings',
      'Write clear, concise emails, reports, and essays',
      'Improve listening and speaking through live interactions',
      'Prepare for IELTS, TOEFL, and corporate interviews',
    ],
    whoIsFor: [
      'Students preparing for study abroad or exams',
      'Working professionals in global or client-facing roles',
      'Learners aiming to improve overall English fluency',
    ],
  },
  curriculum: [
    {
      id: 'eng-week-1',
      weekLabel: 'Week 1',
      title: 'Foundations & Fluency',
      summary: 'Diagnostic assessment and core communication routines.',
      items: [
        { title: 'Diagnostic Assessment & Goal Setting', duration: '60 min LIVE', type: 'LIVE' },
        { title: 'Everyday Speaking Drills', duration: '3 × 20 min', type: 'RECORDED' },
        { title: 'Pronunciation Lab I', duration: '40 min', type: 'NEW' },
      ],
    },
    {
      id: 'eng-week-2',
      weekLabel: 'Week 2',
      title: 'Business Communication Essentials',
      summary: 'Emails, meetings, and presentation language.',
      items: [
        { title: 'Email Writing for Work', duration: '45 min LIVE', type: 'LIVE' },
        { title: 'Effective Meetings & Small Talk', duration: '30 min', type: 'RECORDED' },
        { title: 'Presentation Phrases Toolkit', duration: '30 min', type: 'RECORDED' },
      ],
    },
  ],
  batches: [
    {
      id: 'eng-batch-1',
      startDate: '15 Jan 2026',
      time: '7:00 PM – 8:30 PM',
      timezone: 'IST',
      seatsLeft: 4,
    },
    {
      id: 'eng-batch-2',
      startDate: '02 Feb 2026',
      time: '7:00 PM – 8:30 PM',
      timezone: 'IST',
      seatsLeft: 0,
      isWaitlist: true,
    },
  ],
  trainers: [
    {
      id: 'eng-tr-1',
      name: 'Anita Sharma',
      role: 'Lead English Trainer',
      bio: 'CELTA-certified trainer with 10+ years of experience coaching working professionals and university students.',
      avatarUrl: 'https://via.placeholder.com/96x96.png?text=AS',
      linkedinUrl: 'https://www.linkedin.com',
    },
    {
      id: 'eng-tr-2',
      name: 'Michael Lee',
      role: 'Exam Prep Specialist',
      bio: 'Specializes in IELTS and TOEFL prep with a strong focus on speaking and writing bands.',
      avatarUrl: 'https://via.placeholder.com/96x96.png?text=ML',
      linkedinUrl: 'https://www.linkedin.com',
    },
  ],
  pricing: [
    {
      id: 'eng-standard',
      name: 'Standard Track',
      price: '₹12,999',
      description: 'Ideal for learners balancing work and study.',
      features: ['24 live sessions', 'All recorded lessons', 'Email support'],
      discountLabel: 'Limited-time 10% off',
    },
    {
      id: 'eng-pro',
      name: 'Pro Track',
      price: '₹18,999',
      description: 'For learners who want extra feedback and mentoring.',
      features: ['Everything in Standard', '1:1 feedback sessions', 'Interview preparation'],
      isBestValue: true,
    },
  ],
  reviewsSummary: {
    rating: 4.9,
    totalReviews: 248,
    students: 8500,
  },
  reviews: [
    {
      id: 'eng-rev-1',
      name: 'Priya N.',
      role: 'Software Engineer, Berlin',
      rating: 5,
      quote: 'The live speaking practice and feedback transformed my confidence in global meetings.',
    },
    {
      id: 'eng-rev-2',
      name: 'Rahul S.',
      role: 'MBA Applicant',
      rating: 5,
      quote: 'My IELTS band improved from 6.0 to 7.5 after this course. Highly recommended.',
    },
  ],
  faq: [
    {
      id: 'eng-faq-1',
      question: 'Do I need a specific English level to join?',
      answer:
        'We welcome learners from upper beginner (A2) to advanced (C1). A short placement quiz will match you to the right batch.',
    },
    {
      id: 'eng-faq-2',
      question: 'Are classes recorded?',
      answer:
        'Yes. All live sessions are recorded and available in your dashboard within 24 hours.',
    },
  ],
};

export const germanCourseData: CourseData = {
  slug: 'german',
  metaTitle: 'German for Study & Work in Germany | SoVir Akademie',
  metaDescription:
    'Prepare for life, study, and work in Germany with structured A1–B2 German courses and TestDaF support.',
  hero: {
    title: 'German for Study & Work in Germany',
    subtitle:
      'Master practical German for relocation, university study, and workplace integration in Germany.',
    levelBadge: 'A1 to B2',
    hasLiveSession: true,
  },
  overview: {
    summary:
      'A complete German program focusing on real-life communication, visa interviews, and integration scenarios.',
    outcomes: [
      'Build strong foundations in grammar and everyday vocabulary',
      'Confidently handle relocation and visa-related conversations',
      'Prepare for TestDaF and university admission requirements',
    ],
    whoIsFor: [
      'Students planning to study in Germany',
      'Professionals relocating for work',
      'Learners interested in German for long-term migration',
    ],
  },
  curriculum: [
    {
      id: 'de-week-1',
      weekLabel: 'Week 1',
      title: 'A1 Survival German',
      summary: 'Introduce yourself, ask for directions, and manage basics.',
      items: [
        { title: 'Alphabet & Pronunciation', duration: '45 min LIVE', type: 'LIVE' },
        { title: 'Introducing Yourself', duration: '30 min', type: 'RECORDED' },
        { title: 'Numbers & Time', duration: '30 min', type: 'RECORDED' },
      ],
    },
  ],
  batches: [
    {
      id: 'de-batch-1',
      startDate: '20 Jan 2026',
      time: '6:30 PM – 8:00 PM',
      timezone: 'IST',
      seatsLeft: 3,
    },
  ],
  trainers: [
    {
      id: 'de-tr-1',
      name: 'Lena Müller',
      role: 'Native German Instructor',
      bio: 'Native speaker with 8+ years teaching experience and focus on migration pathways.',
      avatarUrl: 'https://via.placeholder.com/96x96.png?text=LM',
      linkedinUrl: 'https://www.linkedin.com',
    },
  ],
  pricing: [
    {
      id: 'de-standard',
      name: 'Standard Track',
      price: '₹15,999',
      description: 'Structured A1–A2 learning path.',
      features: ['Live classes', 'Grammar clinics', 'Community support'],
    },
  ],
  reviewsSummary: {
    rating: 4.8,
    totalReviews: 190,
    students: 6200,
  },
  reviews: [
    {
      id: 'de-rev-1',
      name: 'Sanjana P.',
      role: 'Master’s Student, Munich',
      rating: 5,
      quote:
        'The role-play sessions for visa interviews were extremely realistic and helpful.',
    },
  ],
  faq: [
    {
      id: 'de-faq-1',
      question: 'Is this course aligned with CEFR levels?',
      answer:
        'Yes. Our curriculum is aligned with CEFR from A1 to B2 and prepares you for TestDaF.',
    },
  ],
};

export const japaneseCourseData: CourseData = {
  slug: 'japanese',
  metaTitle: 'JLPT-focused Japanese Course | SoVir Akademie',
  metaDescription:
    'Pass JLPT N5–N2 with a structured curriculum, kanji practice, and live conversation labs.',
  hero: {
    title: 'JLPT-focused Japanese Program',
    subtitle:
      'Learn Japanese from N5 to N2 with structured grammar, kanji, and speaking practice tailored to JLPT.',
    levelBadge: 'N5 to N2',
    hasLiveSession: false,
  },
  overview: {
    summary:
      'A JLPT-focused track that balances exam preparation with real-life conversational Japanese.',
    outcomes: [
      'Master JLPT vocabulary, grammar, and reading patterns',
      'Develop everyday conversation skills with native trainers',
      'Build a consistent kanji practice routine',
    ],
    whoIsFor: [
      'Learners targeting JLPT N5–N2',
      'Anime, manga, and culture enthusiasts',
      'Professionals working with Japanese clients',
    ],
  },
  curriculum: [
    {
      id: 'jp-week-1',
      weekLabel: 'Week 1',
      title: 'Hiragana, Katakana & Basics',
      summary: 'Learn core scripts and everyday phrases.',
      items: [
        { title: 'Hiragana Bootcamp', duration: '60 min LIVE', type: 'LIVE' },
        { title: 'Katakana Drills', duration: '40 min', type: 'RECORDED' },
        { title: 'Greetings & Self-introduction', duration: '30 min', type: 'NEW' },
      ],
    },
  ],
  batches: [
    {
      id: 'jp-batch-1',
      startDate: '10 Feb 2026',
      time: '6:00 PM – 7:30 PM',
      timezone: 'IST',
      seatsLeft: 10,
    },
  ],
  trainers: [
    {
      id: 'jp-tr-1',
      name: 'Satoshi Tanaka',
      role: 'Native Japanese Trainer',
      bio: 'JLPT N1 expert with corporate training experience for global teams.',
      avatarUrl: 'https://via.placeholder.com/96x96.png?text=ST',
      linkedinUrl: 'https://www.linkedin.com',
    },
  ],
  pricing: [
    {
      id: 'jp-standard',
      name: 'Standard Track',
      price: '₹16,999',
      description: 'Perfect for JLPT-focused learners.',
      features: ['Live JLPT prep', 'Kanji practice sets', 'Mock tests'],
    },
  ],
  reviewsSummary: {
    rating: 4.9,
    totalReviews: 160,
    students: 4800,
  },
  reviews: [
    {
      id: 'jp-rev-1',
      name: 'Karthik R.',
      role: 'JLPT N3 Certified',
      rating: 5,
      quote:
        'Clear explanations and regular kanji practice helped me pass JLPT on my first attempt.',
    },
  ],
  faq: [
    {
      id: 'jp-faq-1',
      question: 'Do I need prior Japanese knowledge?',
      answer:
        'No. We start from N5 and guide you all the way to N2 with clear milestones.',
    },
  ],
};

export const courseDataBySlug: Record<CourseData['slug'], CourseData> = {
  english: englishCourseData,
  german: germanCourseData,
  japanese: japaneseCourseData,
};

export const useCourseData = (slug: CourseData['slug']) => {
  const [course, setCourse] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    // Example loader – in production this would call your backend:
    // fetch(`/api/courses/${slug}`).then(res => res.json())...
    // For now we simulate a resolved response using the local map.
    setLoading(true);
    const timer = setTimeout(() => {
      if (!isMounted) return;
      setCourse(courseDataBySlug[slug]);
      setLoading(false);
    }, 200);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [slug]);

  return { course, loading };
};


