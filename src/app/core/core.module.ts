import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AuthenticationService} from './services/uthorization/authentication.service';
import {TokenInterceptor} from './interceptors/http/auth.interceptor';
import {SessionService} from './services/uthorization/session.service';
import {GameStateService} from './services/game-state.service';
import {PlayerService} from './services/player.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    AuthenticationService,
    SessionService,
    GameStateService,
    PlayerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
