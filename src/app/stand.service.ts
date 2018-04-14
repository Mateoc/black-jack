import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { SessionService } from './core/services/uthorization/session.service';

@Injectable()
export class StandService {

  private eventSource = `${environment.api}/api/test/player/stand`;
  constructor(private http: HttpClient) {}

  saveStand(): Observable<any> {
    return this.http.post(this.eventSource, {})
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: any) {
    const body = res.json();
    console.log('cuerpo:', body);
    return body || { };
  }

  private handleError (error: HttpResponse<Response> | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof HttpResponse) {
      const body = error.body.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
