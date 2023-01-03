export interface AlumniList {
    data: ALUMNI[];
  }
  export interface ALUMNI {
    name: string;
    email: string;
    password: string;
    data: ALUMNI[];
    results: number;
    qualification: string;
    gender: string;
    position: string;
    active: boolean;
    slug: string;
    phone_number:string;
    status: any;
    _id: string;
  };