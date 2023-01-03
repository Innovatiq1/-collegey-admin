import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './shared/components/auth-route/auth.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiIntereptor } from './core/interceptors/api.interceptor';
import { ErrorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';
import { LoginComponent } from './modules/auth/login/login.component';
import { MaterialModule } from './material/material.module';
import { PipeModule } from './shared/pipe.module';
import { ThemeModule } from './@theme/theme.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { EmailinviteComponent } from './modules/emailinvite/emailinvite.component';
import { NgantdModule } from './ngantd/ngantd.module';
import { NzDropDownModule, NzFormModule, NzIconModule } from 'ng-zorro-antd';
import { PlusOutline,MinusOutline,MinusCircleOutline,MinusCircleFill } from '@ant-design/icons-angular/icons';
import { ReviewModule } from './modules/resources/review/review.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ListProjectPaymentComponent } from './shared/dialog/list-project-payment/list-project-payment.component';
import { AgreementTermsComponent } from './modules/agreement-terms/agreement-terms/agreement-terms.component';

const icons = [
  PlusOutline,
  MinusCircleFill,
  MinusCircleOutline,
  MinusOutline
]
registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, AuthComponent, LoginComponent, ListProjectPaymentComponent, AgreementTermsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    MaterialModule,
    NgantdModule,
    PipeModule,
    NgMultiSelectDropDownModule ,
    ThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    FormsModule,
    NzIconModule.forRoot(icons)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiIntereptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    // { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA
  ]
})
export class AppModule {}
