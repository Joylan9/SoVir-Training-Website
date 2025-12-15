export interface SkillCourse {
    _id?: string;
    title: string;
    subtitle?: string;
    level?: string;
    description: string;
    features: string[];
    image: string;
    category: string;
    price?: string;
    originalPrice?: string;
    rating?: string;
    students?: string;
    duration?: string;
    startDate?: string;
    mode?: string;
    popular?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateSkillCourseInput {
    title: string;
    subtitle?: string;
    level?: string;
    description: string;
    features: string[];
    category: string;
    price?: string;
    originalPrice?: string;
    rating?: string;
    students?: string;
    duration?: string;
    startDate?: string;
    mode?: string;
    popular?: boolean;
    image?: File;
}
