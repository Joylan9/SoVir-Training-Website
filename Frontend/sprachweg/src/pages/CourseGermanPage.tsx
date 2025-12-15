import React from 'react';
import CourseDetailTemplate from '../components/course/CourseDetailTemplate';
import { germanCourseData } from '../lib/courseData';

const CourseGermanPage: React.FC = () => {
  return <CourseDetailTemplate course={germanCourseData} />;
};

export default CourseGermanPage;


