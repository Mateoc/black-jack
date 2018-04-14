import {Component, OnInit} from '@angular/core';
import {GameStateService} from '../../core/services/game-state.service';
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

  myCards = [];
  myBalance = 0;


  constructor(private gameStateService: GameStateService, private playerService: PlayerService) {
  }

  ngOnInit() {
    this.playerObservable = this.gameStateService.userObserver();
    this.gameStateObservable = this.gameStateService.gameStateObserver().map(response => {
      return this.codes[response] || response;
    });
  }

  bet() {
    console.log("apostando");
    //console.log(this.gameStateObservable);
    this.playerService.doBet().subscribe((gameState) => {
      if (gameState.dealerCards.openCards.length > 0){
        this.updateCards(gameState.dealerCards.openCards);
        console.log(gameState);
      }
    });
  }

  hit() {
    // TODO ejecutar solo en mi turno
    // TODO mostrar mensaje cuando perdi
    this.playerService.doHit().subscribe((gameState) => {
      if (gameState.dealerCards.openCards.length > 0){
        this.updateCards(gameState.dealerCards.openCards);
        this.updateBalance(gameState.currentPlayer.balance)
        console.log(gameState);
      }
    });
  }

  stand() {
    console.log("standing");
    this.playerService.doStand().subscribe((gameState) => {
      console.log(gameState);
    });
  }

  updateCards(newCards){
    this.myCards = this.myCards.concat(newCards);
  }

  updateBalance(newBalance){
    this.myBalance = newBalance;
  }

}
