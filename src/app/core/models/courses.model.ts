import { Url } from "url";

export interface CourseListing {
    docs: Course[];
  }
export interface Course {
    title: string;
    required: true;
    redirect_link: string;
    short_description: any;
    description:any;
    docs: Course[];
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
    externalLink:Url;
}