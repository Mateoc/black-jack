import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GameStateService} from '../../core/services/game-state.service';
import {SessionService} from '../../core/services/uthorization/session.service';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import {PlayerService} from '../../core/services/player.service';
import Player from '../../core/model/player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  playerObservable: Observable<Player>;
  gameStateObservable: Observable<string>;

  private codes = {
    CREATED: 'Waiting for bets',
    PLAYERS_TURN: 'Dealing players',
    FINISHED: 'Round Finished',
    DEALER_TURN: 'Dealer\'s turn'
  };

  constructor(
    private gameStateService: GameStateService,
    private playerService: PlayerService,
    private sessionService: SessionService,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.playerObservable = this.gameStateService.userObserver();
    this.gameStateObservable = this.gameStateService.gameStateObserver().map(response => {
      return this.codes[response] || response;
    });
  }

  bet() {
    this.doBet().subscribe(res => {
      console.log(res)
    })
  }

  hit() {
    this.doHit().subscribe(res => {
      console.log(res)
    })
  }

  stand() {
    this.doStand().subscribe(res => {
      console.log(res)
    })
  }

  doBet(){
    return this.http.post(`${environment.api}/api/player/bet`, {value: 200});
  }

  doHit(){
    return this.http.post(`${environment.api}/api/player/hit`, {});
  }

  doStand(){
    return this.http.post(`${environment.api}/api/player/stand`, {});
  }
}
