import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Injector } from '@angular/core';

@Component({
  selector: 'app-school-partner',
  templateUrl: './school-partner.component.html',
  styleUrls: ['./school-partner.component.css']
})
export class SchoolPartnerComponent implements OnInit {
  @ViewChild('listingContainer', {read: ViewContainerRef}) listingContainer: ViewContainerRef;
  constructor(private cfr: ComponentFactoryResolver, private injector: Injector) { }

  async loadListingComponent(): Promise<void> {
    // load student listing component on demand
    const { SchoolPartnerListingComponent } = await import('./school-partner-listing/school-partner-listing.component');
    const factory = this.cfr.resolveComponentFactory(SchoolPartnerListingComponent);
    const { instance } = this.listingContainer.createComponent(factory, null, this.injector);
}

 ngOnInit() {
  this.loadListingComponent();
}

}
