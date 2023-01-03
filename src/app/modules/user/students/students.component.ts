import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Injector } from '@angular/core';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  @ViewChild('studentListingContainer', {read: ViewContainerRef}) studentListingContainer: ViewContainerRef;
  
  constructor(private cfr: ComponentFactoryResolver, private injector: Injector) { }


  async loadStudentListingComponent(): Promise<void> {
      // load student listing component on demand
      const { StudentListingComponent } = await import('./student-listing/student-listing.component');
      const factory = this.cfr.resolveComponentFactory(StudentListingComponent);
      const { instance } = this.studentListingContainer.createComponent(factory, null, this.injector);
  }

   ngOnInit() {
    this.loadStudentListingComponent();
  }

}
