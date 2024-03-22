import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: any;
  clave: any;
  usuario: any;
  error = false;

  user = {
    nombre: '',
    clave: '',
    usuario: '',
    cargo: '',
  };

  //variables para validar
  validnombre = true;
  validclave = true;
  validusuario = true;
  validcargo = true;
  beditar = false;

  constructor(private slogin: LoginService, private router: Router) {}

  ngOnInit(): void {}

  consulta() {
    this.slogin.consultar(this.email, this.clave).subscribe((result: any) => {
      this.usuario = result;
      console.log(this.usuario);

      if (this.usuario[0].validar == "valida") {
        console.log("usuario valido");

        sessionStorage.setItem('id', this.usuario[0]["id_usaurio"]);
        sessionStorage.setItem('nombre', this.usuario[0]["nombre"]);
        sessionStorage.setItem('cargo', this.usuario[0]["cargo"]);
        this.router.navigate(['dashboard']);
      }
      
      else {
        console.log('usuario invalido');
        this.error = true;
      }
    });
  }
}
