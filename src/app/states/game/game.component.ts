import {Component, OnInit} from '@angular/core';
import {GameStateService} from '../../core/services/game-state.service';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

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
  public canBet = true;
  public defaultBet = 100;

  constructor(
    private gameStateService: GameStateService, 
    private playerService: PlayerService) {
  }

  ngOnInit() {
    this.playerObservable = this.gameStateService.userObserver();

    this.gameStateObservable = this.gameStateService.gameStateObserver().map(response => {
      return this.codes[response] || response;
    });

  }

  bet() {

    this.canBet = false;
    this.playerObservable.subscribe((data:any) => {

      if(data._cards.length > 0){
        this.canBet = false;
      }
       var betData = {
        bet: this.defaultBet,
      };
  
      this.playerService.bet(betData).subscribe((data:any) => {

        console.log(data);
      });
    });
  }

  hit() {
    this.playerService.hit({}).subscribe(data => {
       console.log(data);
    });
  }

  stand() {
    this.playerService.stand({}).subscribe(data => {
      console.log(data);
    });
  }

}
