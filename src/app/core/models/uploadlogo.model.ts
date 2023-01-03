  export interface UploadlogoListing {
    data: Uploadlogo[];
  }

  export interface UploadcollegelogoListing {
    data: Uploadcollegelogo[];
  }
  
  export interface UploadUniversityLogoListing {
    data: Uploaduniversitylogo[];
  }

  export interface AssignBadgeListing {
    data: AssignBadge[];
  }

  export interface AssignBadge{    
    data: AssignBadge[];
    totalDocs: number;
    active: boolean;
    badgeId: string;
    userType: string;
    _id: string;
    assignUserId: string; 
  }
        
  export interface Uploadlogo {
    redirect_link: any;
    data: Uploadlogo[];
    totalDocs: number;
    active: boolean;
    type: string;
    location: string;
    _id: string;
    title: string;
    status: string;
    imageName: string;
  };

  export interface Uploadcollegelogo {
    redirect_link: any;
    data: Uploadcollegelogo[];
    totalDocs: number;
    active: boolean;
    type: string;
    location: string;
    _id: string;
    title: string;
    status: string;
    imageName: string;
  };
  
  export interface Uploaduniversitylogo {
    redirect_link: any;
    data: Uploaduniversitylogo[];
    totalDocs: number;
    active: boolean;
    type: string;
    location: string;
    _id: string;
    title: string;
    status: string;
    imageName: string;
  };