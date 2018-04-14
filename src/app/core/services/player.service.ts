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

  sendBet(bet){
    return this.http.post(`${environment.api}/api/test/player/bet`,{bet:bet});
  }

  getHit(){
    return this.http.post(`${environment.api}/api/test/player/hit`,{});
  }

  setStand(){
    return this.http.post(`${environment.api}/api/test/player/stand`,{});
  }

  setCards(){
    return this.http.get(`${environment.api}/api/test/player/cards`);
  }

}
