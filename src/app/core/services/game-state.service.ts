import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {environment} from '../../../environments/environment';
import {SessionService} from './uthorization/session.service';
import {Credentials} from '../model/credentials';
import Player from '../model/player';
import {PlayerService} from './player.service';


@Injectable()
export class GameStateService {

  eventObserver: BehaviorSubject<any>;

  constructor(private sessionService: SessionService, private playerService: PlayerService, private http: HttpClient) {
    console.log('loading');
    this.eventObserver = new BehaviorSubject([]);

    const eventSource = new window['EventSource'](`${environment.api}/public/player/updates?token=${sessionService.getSessionToken()}`);
    eventSource.addEventListener('gameState', (e) => {
      console.log('gameState', e);
      const game = JSON.parse(e.data);
      if (this.getPlayerDto(this.sessionService.getCredentials().email, game.players)) {
        this.eventObserver.next(game);
      } else {
        this.playerService.getPlayerState().subscribe((playerGame) => {
          if (playerGame.players) {
            this.eventObserver.next(playerGame);
            return {playerGame};
          } else {
            return playerService.getPlayer().subscribe(player => {
              this.eventObserver.next({...playerGame, players: [player]});
              return {...playerGame, players: [player]};
            });
          }
        });
      }
    }, false);

    this.playerService.getPlayerState().subscribe((playerGame) => {
      if (playerGame.players) {
        this.eventObserver.next(playerGame);
        return {playerGame};
      } else {
        return playerService.getPlayer().subscribe(player => {
          this.eventObserver.next({...playerGame, players: [player]});
          return {...playerGame, players: [player]};
        });
      }
    });
  }


  userObserver(): Observable<Player> {
    return this.eventObserver.map((data) => {
      if (Array.isArray(data)) {
        return null;
      }
      return this.getPlayerFromData(this.sessionService.getCredentials(), data);
    });
  }

  gameStateObserver(): Observable<string> {
    return this.eventObserver.map((data) => {
      return data.state;
    });
  }

  private getPlayerFromData(credentials: Credentials, data) {
    const _player = this.getPlayerDto(credentials.email, data.players || [data]);
    return new Player(
      _player.name,
      _player.email,
      _player.balance,
      data.currentPlayer && data.currentPlayer.email === _player.email,
      data.playersBet && data.playersBet[_player.email] && data.playersBet[_player.email].value,
      data.playersCards && data.playersCards[_player.email] && data.playersCards[_player.email]
    );
  }

  getPlayerDto(email, playerArray) {
    if (!playerArray) {
      return;
    }
    for (let i = 0; i < playerArray.length; i++) {
      const _player = playerArray[i];
      if (email === _player.email) {
        return _player;
      }
    }
  }
}
