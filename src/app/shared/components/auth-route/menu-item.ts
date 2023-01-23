import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/',
    // pathMatch:'full'
    // children: [],
  },
  {
    title: 'Home Content',
    icon: 'home-outline',
    children: [
      {
        title: 'Home First Section',
        icon: 'file-text-outline',
        link: '/page-content/home-first-section',
      },
      {
        title: 'Home Second Section',
        icon: 'file-text-outline',
        link: '/page-content/home-intro-sec-01',
      },
      {
        title: 'Home Third Section',
        icon: 'file-text-outline',
        link: '/page-content/home-third-section',
      },
      {
        title: 'Home Fourth Section',
        icon: 'file-text-outline',
        link: '/page-content/home-fourth-section',
      },
      {
        title: 'Home Fifth Section',
        icon: 'file-text-outline',
        link: '/page-content/home-fifth-section',
      },
      {
        title: 'Home Sixth Section',
        icon: 'file-text-outline',
        link: '/page-content/home-sec-06',
      },
      // {
      //   title: 'Home Sec 02',
      //   icon: 'file-text-outline',
      //   link: '/page-content/home-sec-02',
      // },
      // {
      //   title: 'Home Sec 03',
      //   icon: 'file-text-outline',
      //   link: '/page-content/home-sec-03',
      // },
      // {
      //   title: 'Home Sec 04',
      //   icon: 'file-text-outline',
      //   link: '/page-content/home-sec-04',
      // },
      {
        title: 'Collegey Partners Logo',
        icon: 'file-text-outline',
        link: '/page-content/home-bottom-slide-01',
      },
      {
        title: 'University Partners Logo',
        icon: 'file-text-outline',
        link: '/page-content/home-bottom-slide-02',
      },
      {
        title: 'Home Footer Content',
        icon: 'file-text-outline',
        link: '/page-content/home-footer-content',
      },
      {
        title: 'Program Below Content',
        icon: 'file-text-outline',
        link: '/page-content/collegy-program-content',
      },
    ]
  },
  {
    title: 'Users',
    icon: 'people',
    // link: 'users',
    children: [
      {
        title: 'Students',
        icon: 'person-outline',
        link: '/users/student',
        // pathMatch:'full'
        // children: [],
      },
      // {
      //   title: 'Impact Partner',
      //   icon: 'person-outline',
      //   link: '/users/impact-partners',
      //   // pathMatch:'full'
      //   // children: [],
      // },
      // {
      //   title: 'University Partner',
      //   icon: 'person-outline',
      //   link: '/users/university',
      //   // pathMatch:'full'
      //   // children: [],
      // },
      // {
      //   title: 'School Partner',
      //   icon: 'person-outline',
      //   link: '/users/school',
      //   // pathMatch:'full'
      //   // children: [],
      // },
      {
        title: 'Mentor',
        icon: 'person-outline',
        link: '/users/mentor',
        // pathMatch:'full'
        // children: [],
      },
      {
        title: 'Admin',
        icon: 'person-outline',
        link: '/users/admin',
        // pathMatch:'full'
        // children: [],
      },
      // {
      //   title: 'Counsellor',
      //   icon: 'person-outline',
      //   link: '/users/counsellor',
      //   // pathMatch:'full'
      //   // children: [],
      // },
      // {
      //   title: 'Parent',
      //   icon: 'person-outline',
      //   link: '/users/parent',
      //   // pathMatch:'full'
      //   // children: [],
      // },
      // {
      //   title: 'Alumni',
      //   icon: 'person-outline',
      //   link: '/users/alumni',
      //   // pathMatch:'full'
      //   // children: [],
      // },
      {
        title: 'All User',
        icon: 'person-outline',
        link: '/users/allusers',
        // pathMatch:'full'
        // children: [],
      },
      {
        title: 'Student Reward Redemption',
        icon: 'person-outline',
        link: '/users/redeemed-setting',
      },
    ],
  },
  {
    title: 'Email Configuration',
    icon: 'email-outline',
    children: [
      {
        title: 'Forget Password Template',
        icon: 'person-outline',
        link: '/email-configuration/forget-password-tempt',
      },
      {
        title: 'Welcome Mail Template',
        icon: 'person-outline',
        link: '/email-configuration/welcome-mail-tempt',
      },
      {
        title: 'Mentor Request Template',
        icon: 'person-outline',
        link: '/email-configuration/mentor-request-tempt',
      },
      {
        title: 'Student Project Approval',
        icon: 'person-outline',
        link: '/email-configuration/student-project-approval',
      },
      {
        title: 'Student Project Reject',
        icon: 'person-outline',
        link: '/email-configuration/student-project-reject',
      },
      {
        title: 'New Project Template',
        icon: 'person-outline',
        link: '/email-configuration/new-project-tempt',
      },
      {
        title: 'Invite User Reject',
        icon: 'person-outline',
        link: '/email-configuration/Invite-usr-reject-tempt',
      },
      {
        title: 'New Member Referred',
        icon: 'person-outline',
        link: '/email-configuration/new-member-referred-tempt',
      },
      {
        title: 'New Mentor Contact Collegey',
        icon: 'person-outline',
        link: '/email-configuration/new-mentor-contact-collegey',
      },
      // {
      //   title: 'Student Project Approval Invite',
      //   icon: 'person-outline',
      //   link: '/email-configuration/student-project-approval-invite',
      // },
      {
        title: 'Project Referral Invite',
        icon: 'person-outline',
        link: '/email-configuration/project-referral-invite',
      },
      {
        title: 'Free Project Joining',
        icon: 'person-outline',
        link: '/email-configuration/free-project-joining',
      },
      {
        title: 'Completed project',
        icon: 'person-outline',
        link: '/email-configuration/completed-project-template',
      },
      /* {
        title: 'Invite Project Member',
        icon: 'person-outline',
        link: '/email-configuration/invite-project-member',
      },
      {
        title: 'Invite Project New Member',
        icon: 'person-outline',
        link: '/email-configuration/invite-project-new-member',
      }, */
      {
        title: 'New Invitation Friend',  
        icon: 'person-outline',
        link: '/email-configuration/new-invitation-friend',
      },
      {
        title: 'Mentor Project Invite',  
        icon: 'person-outline',
        link: '/email-configuration/mentor-project-invite',
      },
      {
        title: 'Mentor Accept Project Invite',  
        icon: 'person-outline',
        link: '/email-configuration/mentor-accept-project-invite-status',
      },
      {
        title: 'New Waitlist',  
        icon: 'person-outline',
        link: '/email-configuration/new-waitlist',
      },
      {
        title: 'Send project Invoice',  
        icon: 'person-outline',
        link: '/email-configuration/send-project-invoice',
      },
      /*{
        title: 'Invite User Register',  
        icon: 'person-outline',
        link: '/email-configuration/invite_user_register',
      },*/
      {
        title: 'Admin email',  
        icon: 'person-outline',
        link: '/email-configuration/admin_email_template',
      },
      {
        title: 'Admin new email',  
        icon: 'person-outline',
        link: '/email-configuration/admin_email',
      },

          ],
  },
  {

    title: 'Banners',
    icon: 'file-text-outline',
    link: '/users/add-banner',
    // pathMatch:'full'
    children: [
      // {
      //   title: 'Add Banner',
      //   icon: 'file-text-outline',
      //   link: '/users/add-banner',
      // },
      {
        title: 'Profile Banners',
        icon: 'file-text-outline',
        link: '/users/profile-banner',
        // pathMatch:'full'
        // children: [],
      },
      {
        title: 'Mentor Banners',
        icon: 'file-text-outline',
        link: '/users/mentor-banner',
        // pathMatch:'full'
        // children: [],
      },
      {
        title: 'Student Banners',
        icon: 'file-text-outline',
        link: '/users/student-banner',
        // pathMatch:'full'
        // children: [],
      },
    ],

  },
  {
    title: 'Mentor',
    icon: 'people',
    // link: 'users',
    children: [
      {
        title: 'Mentor Perks',
        icon: 'person-outline',
        link: '/mentor/mentor-perks',
        // pathMatch:'full'
        // children: [],
      },
      {
        title: 'Collegey Opportunity',
        icon: 'person-outline',
        link: '/mentor/collegey-opportunities',
        // pathMatch:'full'
        // children: [],
      },
      {
        title: 'Mentor Video Resource',
        icon: 'person-outline',
        link: '/mentor/mentor-resources',
      },
      {
        title: 'Mentor Article',
        icon: 'person-outline',
        link: '/mentor/mentor-article',
      },
      {
        title: 'Curated Resources',
        icon: 'person-outline',
        link: '/mentor/curated-resources',
      },
      {
        title: 'Mentor File',
        icon: 'person-outline',
        link: '/mentor/mentor-file',
      },
      // {
      //   title: 'Mentor Testimonial',
      //   icon: 'person-outline',
      //   link: '/mentor/mentor-testimonial',
      // },
      {
        title: 'Agreement Terms & Condition',
        icon: 'person-outline',
        link: '/mentor/agreement-condition',
      },
    ],
  },
  {
    title: 'Resources',
    icon: 'book-outline',
    // link: 'resources',
    children: [
      {
        title: 'Blogs',
        icon: 'file-text-outline',
        link: '/resources/blogs',
        // pathMatch:'full'
        // children: [],
      },
      {
        title: 'Vlogs',
        icon: 'file-text-outline',
        link: '/resources/webinars',
        // pathMatch:'full'
        // children: [],
      },
      {
        title: 'Programmes',
        icon: 'file-text-outline',
        link: '/resources/programmes',
        // pathMatch:'full'
        // children: [],
      },
      {
        title: ' News & Resources ',
        icon: 'file-text-outline',
        link: '/resources/student -resources',
        // pathMatch:'full'
        children: [
          {
            title: 'Resources Title',
            icon: 'person-outline',
            link: '/mentor/resources-title',
          },
          {
            title: 'Student Video',
            icon: 'file-text-outline',
            link: '/resources/student-resources',
            // pathMatch:'full'
          },
          {
            title: 'Student Article',
            icon: 'file-text-outline',
            link: '/resources/student-article',
          },
          {
            title: 'Curated Resource',
            icon: 'file-text-outline',
            link: '/resources/curated-resources',
          },
          {
            title: 'Student File',
            icon: 'file-text-outline',
            link: '/resources/student-file',
          },
        ],
      },

      {
        title: 'Courses',
        icon: 'file-text-outline',
        link: '/resources/courses',
        // pathMatch:'full'
        // children: [],
      },
      {
        title: 'Conferences',
        icon: 'file-text-outline',
        link: '/resources/conferences',
        // pathMatch:'full'
        // children: [],
      },
      {
        title: 'FAQ',
        icon: 'file-text-outline',
        // link: '/resources/faq',
        // pathMatch:'full'
        children: [
          {
            title: 'FAQs list',
            icon: 'file-text-outline',
            link: '/resources/faq',
          },
          {
            title: 'FAQ categories',
            icon: 'file-text-outline',
            link: '/resources/faq/list-category',
          },
          // {
          //   title: 'Add category',
          //   icon: 'file-text-outline',
          //   link: '/resources/faq/addCategory',
          // },
        ],
      },
      // {
      //   title: 'Testimonials',
      //   icon: 'file-text-outline',
      //   link: '/resources/review',
      //   // pathMatch:'full'
      //   children: [
      //     {
      //       title: 'Collage',
      //       icon: 'file-text-outline',
      //       link: '/resources/review/college',
      //       // pathMatch:'full'
      //     },
      //     {
      //       title: 'User',
      //       icon: 'file-text-outline',
      //       link: '/resources/review/user',
      //       // pathMatch:'full'
      //     },
      //   ], 
      // },
      {
        title: 'Meet The Teams',
        icon: 'file-text-outline',
        link: '/resources/team',
        // pathMatch:'full'
        children: [
          {
            title: 'Team Members',
            icon: 'file-text-outline',
            link: '/resources/team',
            // pathMatch:'full'
          },
          {
            title: 'Board of Directors',
            icon: 'file-text-outline',
            link: '/resources/board-directors',
            // pathMatch:'full'
          },
          {
            title: 'Board of Advisors',
            icon: 'file-text-outline',
            link: '/resources/board-advisors',
            // pathMatch:'full'
          }
        ],
      },
      /* {
        title: 'Logo Upload',
        icon: 'file-text-outline',
        link: '/resources/logos',
        // pathMatch:'full'
        children: [
          {
            title: 'Upload Logo',
            icon: 'file-text-outline',
            link: '/resources/logos',
            // pathMatch:'full'
          },
        ]
      },*/
      {
        title: 'Badge',
        icon: 'file-text-outline',
        link: '/resources/badge',
        // pathMatch:'full'
        children: [
          {
            title: 'Upload Badge',
            icon: 'file-text-outline',
            link: '/resources/badge',
            // pathMatch:'full'
          },
          {
            title: 'Assigned Badge',
            icon: 'file-text-outline',
            link: '/resources/assignbadge',
            // pathMatch:'full'
          },
        ]
      },
      // {
      //   title: 'SDG',
      //   icon: 'file-text-outline',
      //   link: '/resources/sdg',

      // },
    ]
  },
  {
        title: 'NewsLetter',
        icon: 'file-text-outline',
        link: '/resources/newsletter-list',
        // pathMatch:'full'
        // children: [],
  },
  {
    title: 'Announcement',
    icon: 'email-outline',
    //  link: '/announcement',
    // pathMatch:'full'
    children: [

      {
        title: 'Announcements',
        icon: 'email-outline',
        link: '/announcement/list-announcement',
        // pathMatch:'full'
      },
      // {
      //   title: 'Program',
      //   icon: 'browser-outline',
      //   link: '/project',
      //   // pathMatch:'full'
      // },
    ],
  },
  // {
  //   title: 'Report',
  //   icon: 'browser-outline',
  //   // link: '/project',
  //   // pathMatch:'full'
  //   children: [
  //     {
  //       title: 'User Report',
  //       icon: 'browser-outline',
  //       // link: '/project',
  //       // pathMatch:'full'
  //     },
  //     {
  //       title: 'Program',
  //       icon: 'browser-outline',
  //       // link: '/project',
  //       // pathMatch:'full'
  //     },
  //   ],
  // },
  {
    title: 'Testimonials',
    icon: 'browser-outline',
    // pathMatch:'full'
    children: [
      {
        title: 'Student',
        icon: 'browser-outline',
        link: '/resources/review/college',
        // pathMatch:'full'
      },
      {
        title: 'Mentor',
        icon: 'browser-outline',
        link: '/mentor/mentor-testimonial',
        // pathMatch:'full'
      },
    ]
  },
  {
    title: 'Collegey Feeds',
    icon: 'file-text-outline',
    //link: '/feeds/collegey-feeds',
    //pathMatch:'full'
    children: [
      {
        title: 'Feeds',
        icon: 'browser-outline',
        link: '/feeds/collegey-feeds',
      },
      {
        title: 'Collegey Academy',
        icon: 'browser-outline',
        link: '/feeds/collegey-academy-list',
      },
      {
        title: 'Collegey Question',
        icon: 'browser-outline',
        link: '/feeds/collegey-question-list',
      },
      {
        title: 'Collegey Group',
        icon: 'browser-outline',
        link: '/feeds/collegey-group-list',
      },
    ], 
  },
  {
    title: 'Meet Our Team',
    icon: 'file-text-outline',
    //link: '/feeds/collegey-feeds',
    //pathMatch:'full'
    children: [
      {
        title: 'Title',
        icon: 'browser-outline',
        link: '/meet-our-team/team-title-list',
      },
      {
        title: 'Team',
        icon: 'browser-outline',
        link: '/meet-our-team/team-member-list',
      },
    ], 
  },
  {
    title: 'Collegey Invest',
    icon: 'file-text-outline',
    //link: '/feeds/collegey-feeds',
    //pathMatch:'full'
    children: [
      {
        title: 'Invest In Collegey',
        icon: 'browser-outline',
        link: '/invest-in-collegey/invest-in-collegey-list',
      },
      {
        title: 'List Collegey Invest',
        icon: 'browser-outline',
        link: '/invest',
        // pathMatch:'full'
        // children: [],
      },
    ], 
  },

  {
    title: 'Collegey Fund',
    icon: 'file-text-outline',
    //link: '/feeds/collegey-feeds',
    //pathMatch:'full'
    children: [
      {
        title: 'Fund In Collegey',
        icon: 'browser-outline',
        link: '/fund-in-collegey/fund-in-list',
      },
      {
        title: 'List Collegey Fund',
        icon: 'browser-outline',
        link: '/resources/collegey-fund',
        // pathMatch:'full'
      },
    ], 
  },

  {
    title: 'Collegey Partner',
    icon: 'file-text-outline',
    //link: '/feeds/collegey-feeds',
    //pathMatch:'full'
    children: [
      {
        title: 'Partner With Collegey',
        icon: 'browser-outline',
        link: '/partner-with-collegey/partner-with-list',
      },
      {
        title: 'List Collegey Partner',
        icon: 'browser-outline',
        link: '/resources/collegey-partner',
        // pathMatch:'full'
      },
    ], 
  },

  
  {
    title: 'Collegey Careers',
    icon: 'file-text-outline',
    //link: '/feeds/collegey-feeds',
    //pathMatch:'full'
    children: [
      {
        title: 'Career At Collegey',
        icon: 'browser-outline',
        link: '/career-at-collegey/career-at-list',
      },
      {
        title: 'Collegey Careers',
        icon: 'browser-outline',
        link: '/resources/collegey-careers',
        // pathMatch:'full'
      },
    ], 
  },

  {
    title: 'Q&A',
    icon: 'file-text-outline',
    link: '/qna/qna-list',
    // pathMatch:'full'
    // children: [
    //   {
    //     title: 'Col',
    //     icon: 'file-text-outline',
    //     link: '/resources/review/college',
    //     // pathMatch:'full'
    //   },
    //   {
    //     title: 'User',
    //     icon: 'file-text-outline',
    //     link: '/resources/review/user',
    //     // pathMatch:'full'
    //   },
    // ], 
  },
  {
    title: 'Projects',
    icon: 'browser-outline',
    // link: '/project',
    children: [
      {
        title: 'Project List',
        icon: 'browser-outline',
        link: '/project',
        // pathMatch:'full'
      },
      // {
      //   title: 'Order List',
      //   icon: 'browser-outline',
      //   link: '/project/ordered-project',
      //   // pathMatch:'full'
      // },
      {
        title: 'Student Project',
        icon: 'browser-outline',
        link: '/project/student-project',
        // pathMatch:'full'
      },
      {
        title: 'Mentor Project',
        icon: 'browser-outline',
        link: '/project/mentor-project',
        // pathMatch:'full'
      },
      {
        title: 'Project Fees',
        icon: 'browser-outline',
        link: '/project/fees',
      },
      // {
      //   title: 'OnGoing Project List',
      //   icon: 'browser-outline',
      //   link: '/project/ongoing-project',
      //   // pathMatch:'full'
      // },
      // {
      //   title: 'Review and Rating',
      //   icon: 'browser-outline',
      //   // link: '/project',
      //   // pathMatch:'full'
      // },
      // {
      //   title: 'Program',
      //   icon: 'browser-outline',
      //   link: '/project',
      //   // pathMatch:'full'
      // },
    ],
  },
  // {
  //   title: 'Mentor Review and Rating',
  //   icon: 'email-outline',
  //   children: [

  //   ]
  // },
  // {
  //   title: 'Student Rating and Feedback',
  //   icon: 'email-outline',
  //   children: [

  //   ]
  // },
  {
    title: 'Email Invite',
    icon: 'email-outline',
    link: '/invite',
    // pathMatch:'full'
    // children: [],
  },
  {
    title: 'Invite Join',
    icon: 'email-outline',
    link: '/invite-join',
    // pathMatch:'full'
    // children: [],
  },
  // {
  //   title: 'Subscriptions',
  //   icon: 'email-outline',
  //   link: '/subscription',
  //   // pathMatch:'full'
  //   // children: [],
  // },
  // {
  //   title: 'Career Profiles',
  //   icon: 'email-outline',
  //   link: '/career',
  //   // pathMatch:'full'
  //   // children: [],
  // },
  // {
  //   title: 'Collegey Invest',
  //   icon: 'book-outline',
  //   link: '/invest',
  //   // pathMatch:'full'
  //   // children: [],
  // },
  // {
  //   title: 'Collegey Fund',
  //   icon: 'book-outline',
  //   link: '/resources/collegey-fund',
  //   // pathMatch:'full'
  // },
  // {
  //   title: 'Collegey Partner',
  //   icon: 'book-outline',
  //   link: '/resources/collegey-partner',
  //   // pathMatch:'full'
  // },
  // {
  //   title: 'Collegey Careers',
  //   icon: 'book-outline',
  //   link: '/resources/collegey-careers',
  //   // pathMatch:'full'
  // },
  {
    title: 'Terms & Services',
    icon: 'email-outline',
    link: '/agreement/agreement-condition',
    // pathMatch:'full'
    // children: [],
  },
  {
    title: 'Privacy Policy',
    icon: 'email-outline',
    link: '/mentor/privacy-policy',
    // pathMatch:'full'
    // children: [],
  },
  // {
  //   title: 'Enrollments',
  //   icon: 'email-outline',
  //   children: [
  //     {
  //       title: 'Programs',
  //       icon: 'file-text-outline',
  //       link: '/enrollment/programs'
  //     },
  //   ]
  // }

];