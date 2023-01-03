import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionComponent } from './subscription.component';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { NgantdModule } from 'src/app/ngantd/ngantd.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubscriptionRoutingModule } from './subscription-routing.module';



@NgModule({
  declarations: [SubscriptionRoutingModule.components],
  imports: [
    CommonModule,
    ThemeModule,
    NgantdModule,
    FormsModule,
    SharedModule,
    SubscriptionRoutingModule
  ]
})
export class SubscriptionModule { }
