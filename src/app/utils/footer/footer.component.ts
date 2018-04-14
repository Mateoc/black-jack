import { Component, OnInit } from '@angular/core';


declare var M :any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  	var els = document.querySelectorAll('.modal');
      for(var i =0; i < els.length; i++){
        var instance = M.Modal.init(els[i]);
      }
  }

}
