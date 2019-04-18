/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NbAuthJWTInterceptor, NB_AUTH_TOKEN_INTERCEPTOR_FILTER } from '@nebular/auth';
import { AuthGuard } from './@auth/auth-guard.service';

import { NbPasswordAuthStrategy, NbAuthModule } from './auth';
import { environment } from '../environments/environment';
import { authEnvironment } from '../environments/auth-environment';
import { ApiProvider } from '../providers/api-service/api';
import { UserServiceProvider } from '../providers/user-service/user-service';

const formSetting: any = {
  redirectDelay: 0,
  showMessages: {
    success: true,
  },
  rememberMe: true,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    HttpModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),

    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: environment.url,
              login: {
                // ...
                endpoint: authEnvironment.login,
              },
              register: {
                // ...
                endpoint: authEnvironment.register,
              },
              logout: {
                endpoint: authEnvironment.logout,
              },
              requestPass: {
                endpoint: authEnvironment.requestPass,
              },
              resetPass: {
                endpoint: authEnvironment.resetPass,
              },
        }),
      ],
      forms: {
        login: formSetting,
        register: formSetting,
        requestPassword: formSetting,
        resetPassword: formSetting,
        logout: {
          redirectDelay: 0,
        },
      },
    }), 
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true},
    { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: function () { return false; } },
    AuthGuard,
    ApiProvider,
    UserServiceProvider
  ],
})
export class AppModule {
}
