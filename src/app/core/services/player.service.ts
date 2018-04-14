import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {SessionService} from './uthorization/session.service';
import {Credentials} from '../model/credentials';
import {Observable} from "rxjs/Observable";


@Injectable()
export class PlayerService {

  credentials: Credentials;
  token: any;

  constructor(private http: HttpClient, private sessionService: SessionService) {
    this.credentials = sessionService.getCredentials();
    this.token       = sessionService.getSessionToken();
  }

  getPlayerState(): Observable<any>{
    return this.http.get(`${environment.api}/api/player/state`);
  }

  getPlayer(){
    return this.http.get(`${environment.api}/api/player/`);
  }

  doBet(): Observable<any>{
    let params = {token: this.token, bet: { value: 0 }};
    return this.http.post(`${environment.api}/api/test/player/bet`, params)
  }

  doHit(): Observable<any>{
    return this.http.post(`${environment.api}/api/test/player/hit`, { token: this.token })
  }

  doStand(): Observable<any>{
    return this.http.post(`${environment.api}/api/test/player/stand`, { token: this.token })
  }

}
