export interface TeamListing {
    data: Team[];
  }
  export interface Team {
    name: string;
    designation: string;
    description: string;
    lindkin: string;
    image: string;
    position: string;
    active: boolean
    data: Team[];
    results: number;
    user_id: string;
    _id: string;
  };