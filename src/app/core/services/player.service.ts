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

  constructor(private http: HttpClient, private sessionService: SessionService) {
    this.credentials = sessionService.getCredentials();
  }

  getPlayerState(): Observable<any>{
    return this.http.get(`${environment.api}/api/player/state`);
  }

  getPlayer(){
    return this.http.get(`${environment.api}/api/player/`);
  }

  setBet(): Observable<any>{
    return this.http.post(`${environment.api}/api/test/player/bet`, 
      {
        token: this.sessionService.getSessionToken(),
        bet:{
          "value": 100
        }
      }
    );
  }

  setHit(): Observable<any>{
    return this.http.post(`${environment.api}/api/test/player/hit`, 
      {
        token: this.sessionService.getSessionToken()
      }
    );
  }

  setStand(): Observable<any>{
    return this.http.post(`${environment.api}/api/test/player/stand`, 
      {
        token: this.sessionService.getSessionToken()
      }
    );
  }
}
