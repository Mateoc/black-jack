import {Component, OnInit} from '@angular/core';
import {GameStateService} from '../../core/services/game-state.service';
import {BetService} from '../../bet.service';
import {HitService} from '../../hit.service';
import {StandService} from '../../stand.service';
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

  public isbet = false;
  public ishit = false;
  public isstand = false;
  playerObservable: Observable<Player>;
  gameStateObservable: Observable<string>;

  private codes = {
    CREATED: 'Waiting for bets',
    PLAYERS_TURN: 'Dealing players',
    FINISHED: 'Round Finished',
    DEALER_TURN: 'Dealer\'s turn'
  };

  constructor(private gameStateService: GameStateService,
    private playerService: PlayerService,
    private betService: BetService,
    private hitService: HitService,
    private standService: StandService
    ) {
  }

  ngOnInit() {
    this.playerObservable = this.gameStateService.userObserver();
    this.gameStateObservable = this.gameStateService.gameStateObserver().map(response => {
      return this.codes[response] || response;
    });
  }

  bet() {
    const bet = 1000;
    this.isbet = true;
    this.betService.saveBet(bet);
  }

  hit() {
    this.ishit = true;
    this.hitService.saveHit();
  }

  stand() {
    this.isstand = true;
    this.standService.saveStand();
  }

}
