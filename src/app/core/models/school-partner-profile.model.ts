export interface SchoolPartnerProfile {
  school_partner_profile: SchoolPartnerProfileObj;
}

export interface SchoolPartnerProfileObj {
  is_interested_in_dev_program: boolean;
  is_enrichment_center: boolean;
  student_with_impact_projects: number;
  countries_for_furthur_studies: [];
}
