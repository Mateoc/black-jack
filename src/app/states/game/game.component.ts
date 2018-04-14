import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameStateService } from '../../core/services/game-state.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import { PlayerService } from '../../core/services/player.service';
import Player from '../../core/model/player';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  playerObservable: Observable<Player>;
  gameStateObservable: Observable<string>;

  betInfo$;
  hitInfo$;
  standInfo$;

  private codes = {
    CREATED: 'Waiting for bets',
    PLAYERS_TURN: 'Dealing players',
    FINISHED: 'Round Finished',
    DEALER_TURN: 'Dealer\'s turn'
  };

  constructor(private gameStateService: GameStateService, private playerService: PlayerService) {
  }

  ngOnInit() {
    this.playerObservable = this.gameStateService.userObserver();
    this.gameStateObservable = this.gameStateService.gameStateObserver().map(response => {
      return this.codes[response] || response;
    });
  }

  ngOnDestroy() {
  }

  bet() {
    this.playerService.bet().subscribe(response => { this.betInfo$ = response });
  }

  hit() {
    this.playerService.hit().subscribe(response => { this.hitInfo$ = response });
  }

  stand() {
    this.playerService.stand().subscribe(response => { this.standInfo$ = response });
  }

}
