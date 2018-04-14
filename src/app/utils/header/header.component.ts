import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';

declare var M :any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private user: UserService) {
  	console.log(this.user);
  }

  ngOnInit() {
  	var elem = document.querySelector('.dropdown-trigger');
  	console.log(elem);
  	var instance = M.Dropdown.init(elem);
  }

}
