import React from 'react';
import CourseDetailTemplate from '../components/course/CourseDetailTemplate';
import { englishCourseData } from '../lib/courseData';

const CourseEnglishPage: React.FC = () => {
  return <CourseDetailTemplate course={englishCourseData} />;
};

export default CourseEnglishPage;


