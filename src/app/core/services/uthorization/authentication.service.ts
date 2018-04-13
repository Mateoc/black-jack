import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';

import {environment} from '../../../../environments/environment';
import {Credentials} from '../../model/credentials';
import {SessionService} from './session.service';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient, private sessionService: SessionService) { }


  login (credentials: Credentials) {
    return this.http.post(`${environment.api}/api/player/register`, credentials).map((result: any) => {
      this.sessionService.setSession(result.token, credentials);
    });
  }

}
