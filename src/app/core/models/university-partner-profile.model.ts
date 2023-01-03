export interface UniversityPartnerProfile {
    university_partner_profile: UniversityPartnerProfileObj;
}

export interface UniversityPartnerProfileObj {
    offer_courses: OfferCourses;
    scholarships_details: string;
    test_required: [];
}

export interface OfferCourses {
    grade: string;
    subjects: string;
    majors: string;
}
