import { Injectable } from '@angular/core';

declare var M :any;

@Injectable()
export class UserService {

  data:any;
  auth = false;

  constructor() {
  	var tmp = localStorage.getItem('user');
  	//this.auth = tmp != null && tmp != "";
   }



  logout(){
  	this.auth = true;
  	this.data = {};
  	localStorage.clear();
	window.location.reload();
  }


  setLogin(data){

    if(!data['password'] || !data['user']){
      return M.toast({html:`Debe rellenar todos los campos`});
    }

    document.getElementById("loader").style.display = 'block';

    setTimeout( () => {
       document.getElementById("loader").style.display = 'none';

       M.toast({html: "Inicio con éxito", displayLength: 4000});

       window.location.reload();

       localStorage.setItem('user', JSON.stringify(data['user']));

    }, 4000);

  	
  }

  changePassword(old, new_pass, confirm_pass){
    if(!new_pass || !old || !confirm_pass){
      return M.toast({html:`Debe rellenar todos los campos`});
    }

    if(new_pass != confirm_pass){
      return M.toast({html:`Las contraseñas no coinciden`});
    }

    document.getElementById("loader").style.display = 'block';

    setTimeout( () => {
       document.getElementById("loader").style.display = 'none';

       M.toast({html:`Contraseña cambiada con éxito`});

      var els = document.querySelectorAll(".modal");
      for (var i = 0; i < els.length; ++i) {
       M.Modal.getInstance(els[i]).close();
      }

    }, 4000);
    
    
    
  }
}
