import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../../core/services/game-state.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


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
  players_t: Array<any> = new Array();

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

  bet(state, player) {
    console.log("States: " + state);
    if (player._balance < 100) {
      alert('You cannot set a bet, your balance amount is under 100');
      return;
    }

    if (state != this.codes.CREATED) {
      alert('No more bets');
      return;
    }

    this.playerService.setBet().subscribe(test => {
      console.log(test);
      console.log(test.players);
      this.players_t = test.players;
    });
  }

  hit(state) {
    console.log("States: " + state);

    this.playerService.setHit().subscribe(test => {
      console.log(test);
      this.players_t = test.players;
    });
  }

  stand(state) {
    console.log("States: " + state);

    this.playerService.setStand().subscribe(test => {
      console.log(test);
      this.players_t = test.players;
    });
  }

  private
}
