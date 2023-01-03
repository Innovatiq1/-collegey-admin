export interface BlogListing {
  docs: Blog[];
}
export interface Blog {
  redirect_link: any;
  description: any;
  short_description: any;
  docs: Blog[];
  totalDocs: number;
  slug: string;
  status: any;
  editorPick: any;
  type: string;
  _id: string;
  title: string;
  author: string;
  tags: string[];
  is_paid: boolean;
  cost: number;
  image: string;
  author_image: string;
  limit: number;
};