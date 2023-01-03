import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Injector } from '@angular/core';

@Component({
  selector: 'app-impact-partner',
  templateUrl: './impact-partner.component.html',
  styleUrls: ['./impact-partner.component.css']
})
export class ImpactPartnerComponent implements OnInit {
  @ViewChild('impactPartnerListingContainer', {read: ViewContainerRef}) impactPartnerListingContainer: ViewContainerRef;

  constructor(private cfr: ComponentFactoryResolver, private injector: Injector) { }

  async loadImpactPartnerListingComponent(): Promise<void> {
    // load student listing component on demand
    const { ImpactPartnerListingComponent } = await import('./impact-partner-listing/impact-partner-listing.component');
    const factory = this.cfr.resolveComponentFactory(ImpactPartnerListingComponent);
    const { instance } = this.impactPartnerListingContainer.createComponent(factory, null, this.injector);
}

 ngOnInit() {
  this.loadImpactPartnerListingComponent();
}

}
