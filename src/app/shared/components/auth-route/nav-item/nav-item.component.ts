import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MenuItem } from 'src/app/core/models/menu.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css']
})
export class NavItemComponent implements OnInit {

  @Input() menuitem: MenuItem;
    @Output() menuItemClick = new EventEmitter();

    constructor(
        private router: Router
    ) { }

    ngOnInit() {

    }

    navigateTo(url) {
        this.menuItemClick.emit();
        this.router.navigateByUrl(url);
    }

}
