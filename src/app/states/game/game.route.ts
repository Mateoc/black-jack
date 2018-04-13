import {GameComponent} from './game.component';
import {SessionService} from '../../core/services/uthorization/session.service';
import {Transition} from '@uirouter/core/lib';

export const state = {
  name: 'game',
  url: '/game',
  component: GameComponent,
  data: {
    auth: 'logged'
  }
};
