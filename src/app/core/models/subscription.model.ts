export interface SubscriptionListing {
    docs: Subscription[];
    totalDocs:number;
  }
  export interface Subscription {
    _id : String,
    emailId : String,
    status : number,
  };