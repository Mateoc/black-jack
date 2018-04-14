import {Component, OnInit} from '@angular/core';
import {GameStateService} from '../../core/services/game-state.service';
import {Observable} from 'rxjs/Observable';
import {Config_bet} from '../../core/services/betServices/Config_bet.service';
import {StateService} from '@uirouter/angular';
import {ValueBet} from '../../core/model/valueBet';
import 'rxjs/add/operator/map';


import {PlayerService} from '../../core/services/player.service';
import Player from '../../core/model/player';
import cards from '../../commons/cards';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  playerObservable: Observable<Player>;
  gameStateObservable: Observable<string>;
  value_bet: ValueBet;
  cards = cards;
  private codes = {
    CREATED: 'Waiting for bets',
    PLAYERS_TURN: 'Dealing players',
    FINISHED: 'Round Finished',
    DEALER_TURN: 'Dealer\'s turn'
  };

  constructor( private stateService: StateService,private gameStateService: GameStateService, private playerService: PlayerService) {
    this.value_bet = new ValueBet(100);
  }

  ngOnInit() {
    this.playerObservable = this.gameStateService.userObserver();
    this.gameStateObservable = this.gameStateService.gameStateObserver().map(response => {
      return this.codes[response] || response;
    });
  }

  bet() {

      this.config_bet.bet(this.value_bet).subscribe(() => {
        this.stateService.go('game').catch(error => console.error(error));
      });
    
  }
  

  hit() {

  }

  stand() {

  }

}
