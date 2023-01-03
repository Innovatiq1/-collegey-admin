import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule,NzBreadCrumbModule, NzPageHeaderModule, NzBadgeModule, NzButtonModule, NzPopoverModule, NzInputModule, NzIconModule, NzListModule, NzCollapseModule, NzGridModule, NzFormModule, NzSelectModule, NzPopconfirmModule, NzTagModule, NzModalModule, NzSpinModule, NzMessageModule, NzCardModule, NzInputNumberModule, NzDatePickerModule, NzDropDownModule, NzUploadModule, NzCheckboxModule, NzAutocompleteModule, NzRadioModule, NzSwitchModule } from 'ng-zorro-antd';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

const antdModules = [
  NzTableModule,
  NzBreadCrumbModule,
  NzPageHeaderModule,
  NzBadgeModule,
  NzButtonModule,
  NzPopoverModule,
  NzInputModule,
  NzIconModule,
  NzListModule,
  NzCollapseModule,
  NzGridModule,
  NzFormModule,
  NzSelectModule,
  NzPopconfirmModule,
  NzTagModule,
  NzModalModule,
  NzSpinModule,
  NzMessageModule,
  NzCardModule,
  NzIconModule,
  NzInputNumberModule,
  NzDatePickerModule,
  NzDropDownModule,
  NzUploadModule,
  NzCheckboxModule,
  NzAutocompleteModule ,
  NzRadioModule,
  NzSwitchModule
]

@NgModule({
  declarations: [],
  imports: [
    ...antdModules
  ],
  exports : [
    ...antdModules
  ],
  providers   : [
    { provide: NZ_I18N, useValue: en_US }
  ]
})
export class NgantdModule { 
  
}
