import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map';
import {Credentials} from '../../model/credentials';


@Injectable()
export class SessionService {

  private token;
  private credentials;

  setSession(token: string, credentials: Credentials) {
    this.token = token;
    this.credentials = credentials;
  }

  getSessionToken(): string {
    return this.token;
  }

  getCredentials() {
    return this.credentials;
  }

  isLogged(): boolean {
    return !!this.token; // habia !! es un !
  }

}
