import {Component} from '@angular/core';
import {Credentials} from '../../core/model/credentials';
import {AuthenticationService} from '../../core/services/uthorization/authentication.service';
import {StateService} from '@uirouter/angular';

import cards from '../../commons/cards';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  credentials: Credentials;
  cards = cards;
  constructor(private authenticationService: AuthenticationService, private stateService: StateService) {
    this.credentials = new Credentials();
  }

  ngOnInit(){
    if(localStorage.getItem('auth')){
      //this.auth();
    }
  }

  auth(){
    this.stateService.go('game').catch(error => console.error(error));
    localStorage.setItem('auth', "true");
  }

  login() {
    this.authenticationService.login(this.credentials).subscribe((data) => {
      this.auth();
    });
  }

}
