import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { MenuItem } from '../../../core/models/menu.model';
import { MENU_ITEMS } from './menu-item';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isMobile = false;

  menuitems: MenuItem[] = [
    {
      id: 1,
      title: 'Dashboard',
      icon: 'dashboard',
      action: '',
      open: true,
      children: [],
    },
    {
      id: 2,
      title: 'Users',
      icon: 'people',
      action: 'users',
      open: false,
      children: [
        {
          id: 1,
          title: 'Students',
          icon: 'wc',
          action: 'users/students',
          open: true,
          children: [],
        },
        {
          id: 2,
          title: 'Impact Partner',
          icon: 'wc',
          action: 'users/impact-partner',
          open: true,
          children: [],
        },
        {
          id: 3,
          title: 'University Partner',
          icon: 'wc',
          action: 'users/university-partner',
          open: true,
          children: [],
        },
        {
          id: 3,
          title: 'School Partner',
          icon: 'wc',
          action: 'users/school-partner',
          open: true,
          children: [],
        },
      ],
    },
    {
      id: 3,
      title: 'Resources',
      icon: 'people',
      action: 'resources',
      open: false,
      children: [
        {
          id: 3,
          title: 'Blogs',
          icon: 'article',
          action: 'resources/blogs',
          open: true,
          children: [],
        },
        {
          id: 3,
          title: 'Webinars',
          icon: 'article',
          action: 'resources/webinars',
          open: true,
          children: [],
        },
        {
          id: 4,
          title: 'Programmes',
          icon: 'article',
          action: 'resources/programmes',
          open: true,
          children: [],
        },
        {
          id: 5,
          title: 'Conferences',
          icon: 'article',
          action: 'resources/conferences',
          open: true,
          children: [],
        },
      ]
    },
    {
      id: 4,
      title: 'Projects',
      icon: 'article',
      action: 'project',
      open: true,
      children: [],
    },
    {
      id: 5,
      title: 'Mentor',
      icon: 'people',
      action: 'mentor',
      open: false,
      children: [
        {
          id: 1,
          title: 'Mentor Perks',
          icon: 'wc',
          action: 'mentor/mentor-perks',
          open: true,
          children: [],
        },
      ],
    },

  ];
  menu = MENU_ITEMS;
  constructor() {}

  ngOnInit() {
    if (window.screen.width <= 768) {
      this.isMobile = true;
    }
    window.onresize = () => (this.isMobile = window.innerWidth <= 768);
  }
}
