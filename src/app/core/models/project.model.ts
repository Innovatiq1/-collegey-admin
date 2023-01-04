export interface ProjectListing {
  docs: Project[];
}
export interface Project {
  description: any;
  docs: Project[];
  totalDocs: number;
  limit: number;
  slug: string;
  _id: string;
  title: string;
  keyword: string;
  image : string;
  impact: string;
  location: string;
  studentOutcome: string;
  Milestones: string;
  partner: PartnerId;
  sdg: string[];
  skills: string[];
  documents: string[];
  min_students_count:number;
  students_count: number;
  start_date: string;
  end_date: string;
  ask_questions: boolean;
  projectfees: string;
  questions: string[];
  can_be_done: CanBeDone;
  contact_person: contactPerson;
  willing_to_consider: willingToConsider;
  projectPlan: projectPlan;
  projectPrice: projectPrice;
  mentor: MentorData;
  // projectOwner: string;
};

export interface MentorData {
  id: string;
}

export interface CanBeDone {
  onsite: string;
  othersite: string;
  remotely: string;
}

export interface contactPerson {
  name: string;
  email: string;
  linkedin_url: string;
  phone_number: PhoneNumber; 
}

export interface projectPlan {
  projectDuration: Number;
  week1Duration: string;
  week2Duration: string;
  week3Duration: string;
  week4Duration: string;
  week5Duration: string;
  week6Duration: string;
}

export interface projectPrice { 
  amount: Number;
  currency: string;
  currencySymbol: string;
}

export interface willingToConsider {
  answer: string;
  comments: string;
}

interface PhoneNumber {
  extension: string;
  number: string;
  tag: string;
}

export interface PartnerId {
  _id: string;
  name: string;
}
