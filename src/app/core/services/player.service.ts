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




  getCards(){
    return this.http.get(`${environment.api}/api/player/cards`);
  }

  bet(data){
    return this.http.post(`${environment.api}/api/player/bet`, data);
  }


  hit(data){
    return this.http.post(`${environment.api}/api/player/hit`, data);
  }


  stand(data){
    return this.http.post(`${environment.api}/api/player/stand`, data);
  }

}
