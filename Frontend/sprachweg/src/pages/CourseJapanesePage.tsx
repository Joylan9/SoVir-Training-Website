import React from 'react';
import CourseDetailTemplate from '../components/course/CourseDetailTemplate';
import { japaneseCourseData } from '../lib/courseData';

const CourseJapanesePage: React.FC = () => {
  return <CourseDetailTemplate course={japaneseCourseData} />;
};

export default CourseJapanesePage;


