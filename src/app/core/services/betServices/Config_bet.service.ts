import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {environment} from '../../../../environments/environment';
import {ValueBet} from '../../model/valueBet';
import {BetServices} from './bet.service';

@Injectable()
export class Config_bet {

  constructor(private http: HttpClient, private betServices: BetServices) { 

  }
  bet (Value_Bet: ValueBet) {
    return this.http.post(`${environment.api}/api/test/player/bet`, Value_Bet).map((result: any) => {
      this.betServices.setSession(result.token, Value_Bet);
    });
  }



}
