export interface InvestListing {
    docs: Invest[];
    totalDocs:number;
    limit:number;
  }
  export interface Invest {
    _id : String,
    name: String,
    emailId: String,
    city: String,
    country: String,
    organisation : String
  };

  export interface CollegeyfundListing {
    docs: Collegeyfund[];
    totalDocs:number;
    limit:number;
  }

  export interface Collegeyfund {
    totalDocs: number;
    _id : String,
    name: String,
    email: String,
    mobile: String,
    countryCode: String,
    city: String,
    country: String,
    fundAmount : String
  };