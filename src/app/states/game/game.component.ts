import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../../core/services/game-state.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//Services
import { SessionService } from '../../core/services/uthorization/session.service';



import { PlayerService } from '../../core/services/player.service';
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
    private sessionService: SessionService) {
  }

  ngOnInit() {
    this.playerObservable = this.gameStateService.userObserver();
    this.gameStateObservable = this.gameStateService.gameStateObserver().map(response => {
      return this.codes[response] || response;
    });
  }

  bet(betText: any) {
    let betValue: number = parseInt(betText == "" ? "0" : betText);
    if (betValue == 0) {
      betValue = 100;
    }
    console.log(betValue);
    let token:string = this.sessionService.getSessionToken();

    this.playerService.bet(token, betValue);
  }

  hit() {
    let token:string = this.sessionService.getSessionToken();
    this.playerService.hit(token);
  }

  stand() {
    let token:string = this.sessionService.getSessionToken();
    this.playerService.stand(token);
  }

}
