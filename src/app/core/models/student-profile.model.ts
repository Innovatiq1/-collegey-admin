export interface Profile {
  geography: Geography;
  history: History;
  ways_to_be_in_touch: WaysToBeInTouch;
  headed: Headed;
  interest: Interest;
  know_you_better: KnowYouBetter;
  prefrences: Preferences;
}

export interface Geography {
  school_clg_name: string;
  school_clg_city: string;
  citizenship: string;
  country: string;
  city: string;
  state: string;
  is_completed: false;
}

export interface History {
    education: Education[];
    current_class: string;
    is_completed: false;
}

export interface Education {
  type: string;
  name: string;
  location: string;
  board: string;
  field_of_study: [];
  degree: string;
  start_year: string;
  end_year: string;
  score: StudentSchoolScore[];
}

export interface StudentSchoolScore {
  class_name: string;
  class_score: number;
}

export interface WaysToBeInTouch {
  phone_number: PhoneNumber;
  parents_details: ParentDetails[];
  school_counselor: SchoolCounselor[];
  social_media: [];
  dob: string;
  is_completed: boolean;
}

interface PhoneNumber {
  extension: string;
  number: string;
  tag: string;
}

interface ParentDetails {
  name: string;
  email: string;
  relation: string;
}

interface SchoolCounselor {
  name: string;
  email: string;
}

export interface Headed {
  expected_year_to_start: ExpectedYearToStart;
  preferred_countries: [];
  test_info: TestInfo[];
  wish_to_study: WishToStudy;
  is_completed: false;
}

interface ExpectedYearToStart {
  grade: string;
  year: string;
}

interface TestInfo {
  test_name: string;
  test_status: string;
  current_score: string;
  test_date: string;
}

interface WishToStudy {
  grade: string;
  subjects: string;
  majors: string;
  other_text: string;
}

export interface Interest {
  interest_area: string[];
  fav_subjects: string[];
  is_completed: false;
}

export interface KnowYouBetter {
  people_who_inspire_you: string[];
  fav_books: string[];
  fav_movies: string[];
  fav_websites: [];
  fav_activity_on_internet: string;
  fav_message_service: string[];
  // awards: string[];
  is_completed: false;
}

export interface Projects {
  any_bpp: BigPictureProject;
  describe_any_project: DescribeProject[];
  writing_sample: WritingSample[];
  someone_said_something_or_recommendation: Recommendation[];
  award: Award[];
  is_completed: false;
}

export interface Award {
  title:	string;
  issuing_organisation:	string;
  role:	string;
  duration:	string;
  description:	string;
  file:	string;
}
export interface Recommendation {
  title:	string;
  description:	string;
  file:	string;

}
export interface WritingSample {
  answer: string;
  title: string;
  description: string;
  file: string;
}

export interface DescribeProject {
  title: string;
  description: string;
}

export interface BigPictureProject {
  title: string;
  description: string;
  answer: boolean;
}

export interface Preferences {
  interested_in_gap: false;
  how_would_like_to_pay: string[];
  wish_to_apply_for_scholarships: {
    answer: false;
    imoprtance: string;
  };
  family_income: string;
  is_completed: false;
}
