export interface ProgrammeListing {
    docs: Programme[];
  }
export interface Programme {
    title: string;
    required: true;
    redirect_link: string;
    short_description: any;
    description:any;
    including_tax:any;
    program_hour_text:any;
    deliverable:any;
    category:any;
    mentor: MentorData; 
    docs: Programme[];
    totalDocs: number;
    is_paid: boolean;
    tags: string[];
    cost: number;
    status: number;
    image: string;
    id: string;
    slug: string;
    updatedAt: string;
    createdAt: string;
    limit: number;
}

export interface MentorData {
  id: string;
}