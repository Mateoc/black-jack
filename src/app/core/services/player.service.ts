import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SessionService } from './uthorization/session.service';
import { Credentials } from '../model/credentials';
import { Observable } from "rxjs/Observable";

@Injectable()
export class PlayerService {

  credentials: Credentials;
  environmentUrl: string;
  headers: HttpHeaders;
  private token: string;

  constructor(private http: HttpClient, private sessionService: SessionService) {
    this.credentials = sessionService.getCredentials();
    this.environmentUrl = environment.apiRoot + '/api' + environment.api;
    this.token = sessionService.getSessionToken();
    console.log(this.token);
    this.initializeRequestHeaders();
  }

  private initializeRequestHeaders() {
    this.headers = new HttpHeaders();
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Authorization", "Basic dXNlcjpwYXNzd29yZA==");
  }

  getPlayerState(): Observable<any> {
    return this.http.get(`${environment.apiRoot}/api/player/state`);
  }

  getPlayer() {
    return this.http.get(`${environment.apiRoot}/api/player/`);
  }

  bet(betValue?: number) {
    return this.http.post(
      `${this.environmentUrl}/player/bet`,
      { token: this.token, value: 100 },
      { headers: this.headers });
  }

  hit() {
    return this.http.post(
      `${this.environmentUrl}/player/hit`,
      { token: this.token },
      { headers: this.headers });
  }

  stand() {
    return this.http.post(
      `${this.environmentUrl}/player/stand`,
      { token: this.token },
      { headers: this.headers });
  }

}
