import {UIRouter} from '@uirouter/angular';
// import {visualizer} from '@uirouter/visualizer';
import {Injector, Injectable} from '@angular/core';
import {SessionService} from '../core/services/uthorization/session.service';

/** UIRouter Config  */
export function uiRouterConfigFn(router: UIRouter, injector: Injector) {

  // If no URL matches, go to the `hello` state by default
  router.urlService.rules.otherwise({state: 'login'});

  const criteria = {entering: (state) => state.data && state.data.auth};
  router.transitionService.onBefore(criteria, requireAuthentication);
  // Use ui-router-visualizer to show the states as a tree
  // and transitions as a timeline
  // visualizer(router);
}

function requireAuthentication(transition) {
  const $state = transition.router.stateService;
  const sessionService = transition.injector().get(SessionService);
  const nextState = transition.to();
  if (nextState.data.auth === 'logged' && !sessionService.isLogged()) {
    return $state.target('login');
  }
}