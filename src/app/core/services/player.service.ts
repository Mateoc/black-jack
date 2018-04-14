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

  bet(): Observable<any> {
    return this.http.post(`${environment.api}/api/player/bet`, {bet: {}});
  }

  hit(): Observable<any> {
    return this.http.post(`${environment.api}/api/player/hit`, {});
  }

  stand(): Observable<any> {
    return this.http.post(`${environment.api}/api/player/bet`, {})
  }
}
