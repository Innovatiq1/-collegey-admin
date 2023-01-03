export interface ConferenceListing {
  docs: Conference[];
}
export interface Conference {
  redirect_link: any;
  description: any;
  short_description: any;
  docs: Conference[];
  totalDocs: number;
  slug: string;
  status: any;
  type: string;
  _id: string;
  title: string;
  tags: string[];
  is_paid: boolean;
  cost: number;
  image: string;
  limit: number;
};