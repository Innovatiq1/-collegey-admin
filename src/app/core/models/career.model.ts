export interface CareerListing {
    docs: Career[];
    totalDocs:number;
    limit:number;
  }
  export interface Career {
    _id : String,
    name: String,
    emailId: String,
    city: String,
    country: String,
    cellNumber: String,
    linkedinId: String,
    expertise : String,
    workTitle: String,
    outcome: String,
    resume : String
  };