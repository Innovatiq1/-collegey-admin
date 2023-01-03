export interface InviteeListing {
    docs: Invitee[];
    totalDocs:number;
    limit:number;
  }
  export interface Invitee {
    _id : String,
    firstName : String,
    lastName : String,
    email : String,
    status : number,
    activation_code : String,
    isActive : Boolean
  };