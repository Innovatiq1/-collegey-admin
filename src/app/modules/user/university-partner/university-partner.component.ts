import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Injector } from '@angular/core';

@Component({
  selector: 'app-university-partner',
  templateUrl: './university-partner.component.html',
  styleUrls: ['./university-partner.component.css']
})
export class UniversityPartnerComponent implements OnInit {
  @ViewChild('listingContainer', {read: ViewContainerRef}) listingContainer: ViewContainerRef;
  constructor(private cfr: ComponentFactoryResolver, private injector: Injector) { }

  async loadListingComponent(): Promise<void> {
    // load student listing component on demand
    const { UniversityPartnerListingComponent } = await import('./university-partner-listing/university-partner-listing.component');
    const factory = this.cfr.resolveComponentFactory(UniversityPartnerListingComponent);
    const { instance } = this.listingContainer.createComponent(factory, null, this.injector);
}

 ngOnInit() {
  this.loadListingComponent();
}

}
