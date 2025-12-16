import mongoose from 'mongoose';
import dotenv from 'dotenv';
import SkillCourse from './models/skillCourse.model';

dotenv.config();

const courses = [
    {
        title: 'German Language Training',
        subtitle: 'Master practical German for relocation, university study, and workplace integration in Germany.',
        category: 'Language',
        description: 'A complete German program focusing on real-life communication, visa interviews, and integration scenarios.',
        image: 'german-course.jpg', // Placeholder, admin can update
        popular: true,
        levels: [
            {
                name: 'A1',
                duration: '45 Hours',
                price: '₹15,999',
                features: [
                    'Alphabet & pronunciation',
                    'Greetings & daily expressions',
                    'Numbers, dates, time',
                    'Articles & plurals',
                    'Present tense verbs & sentence structure',
                    'Questions & negation',
                    'Daily life conversations',
                    'Reading simple texts',
                    'Writing short sentences'
                ],
                outcome: 'Basic spoken German; can introduce self; ready for Goethe A1'
            },
            {
                name: 'A2',
                duration: '60 Hours',
                price: '₹18,999',
                features: [
                    'Past tense (Perfekt)',
                    'Modal verbs',
                    'Prepositions & connectors',
                    'Describing experiences/opinions',
                    'Telephone & email communication',
                    'Reading short articles',
                    'Writing structured paragraphs',
                    'Listening practice'
                ],
                outcome: 'Improved fluency; ready for Goethe A2'
            },
            {
                name: 'B1',
                duration: '90 Hours',
                price: '₹20,999',
                features: [
                    'Advanced grammar (Nebensätze)',
                    'Formal/informal communication',
                    'Opinion & arguments',
                    'Professional vocabulary',
                    'Essay & email writing',
                    'Newspapers & longer texts',
                    'Real-life audio comprehension',
                    'Presentations'
                ],
                outcome: 'Work/Ausbildung preparation; ready for Goethe B1',
                examPrep: {
                    title: 'Goethe / TELC B2',
                    details: 'Advanced exam preparation for university and professional certification',
                    price: '₹43,499'
                }
            }
        ]
    },
    {
        title: 'Japanese Language Training',
        subtitle: 'Learn Japanese from N5 to N2 with structured grammar, kanji, and speaking practice tailored to JLPT.',
        category: 'Language',
        description: 'A JLPT-focused track that balances exam preparation with real-life conversational Japanese.',
        image: 'japanese-course.jpg',
        popular: true,
        levels: [
            {
                name: 'N5',
                duration: '50 Hours',
                price: '₹17,999',
                features: [
                    'Hiragana & Katakana mastery',
                    'Basic Kanji (50+ characters)',
                    'Pronunciation fundamentals',
                    'Simple grammar & particles',
                    'Daily conversation practice',
                    'Numbers, dates, time',
                    'Reading basic sentences',
                    'Writing short texts'
                ],
                outcome: 'Ready for JLPT N5 certification'
            },
            {
                name: 'N4',
                duration: '80 Hours',
                price: '₹21,999',
                features: [
                    'Intermediate grammar patterns',
                    'Kanji mastery (300+ characters)',
                    'Past & polite forms',
                    'Daily life & travel vocabulary',
                    'Listening comprehension',
                    'Reading paragraphs',
                    'Writing structured answers',
                    'Conversation practice'
                ],
                outcome: 'Ready for JLPT N4 certification'
            },
            {
                name: 'N3',
                duration: '150 Hours',
                price: '₹32,999',
                features: [
                    'Advanced grammar patterns',
                    'Kanji mastery (650+ characters)',
                    'Formal/informal speech distinction',
                    'Workplace Japanese',
                    'News & article reading',
                    'Essay writing skills',
                    'Speaking drills',
                    'Cultural communication'
                ],
                outcome: 'Ready for JLPT N3 certification'
            }
        ]
    },
    {
        title: 'English Language Training',
        subtitle: 'Develop fluent, confident English for global workplaces, universities, and international opportunities.',
        category: 'Language',
        description: 'A structured English program focused on speaking, writing, and comprehension for professional and academic success.',
        image: 'english-course.jpg',
        popular: true,
        levels: [
            {
                name: 'Beginner',
                duration: '40 Hours',
                price: '₹9,999',
                features: [
                    'Basic grammar',
                    'Vocabulary building',
                    'Pronunciation practice',
                    'Daily conversation skills',
                    'Reading simple texts',
                    'Writing basic sentences'
                ],
                outcome: 'Build foundation in English communication'
            },
            {
                name: 'Intermediate',
                duration: '60 Hours',
                price: '₹13,999',
                features: [
                    'Advanced grammar structures',
                    'Speaking fluency practice',
                    'Listening comprehension',
                    'Writing emails & paragraphs',
                    'Group discussions',
                    'Business vocabulary'
                ],
                outcome: 'Communicate confidently in professional settings'
            },
            {
                name: 'Advanced',
                duration: '90 Hours',
                price: '₹18,999',
                features: [
                    'Professional communication',
                    'Public speaking skills',
                    'Business English mastery',
                    'Interview preparation',
                    'Advanced writing techniques',
                    'Leadership communication'
                ],
                outcome: 'Master professional English for global careers',
                examPrep: {
                    title: 'Exam Preparation',
                    details: 'IELTS / Business English',
                    price: '₹19,999'
                }
            }
        ]
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sprachweg');
        console.log('Connected to MongoDB');

        // Clear existing courses with these titles to avoid duplicates (optional, strictly for development seeding)
        await SkillCourse.deleteMany({ title: { $in: courses.map(c => c.title) } });
        console.log('Cleared existing courses');

        await SkillCourse.insertMany(courses);
        console.log('Database seeded with courses!');

        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
