import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit{

  //variables globales
  verf = false;
  usuario: any;
  user = {
    nombre: "",
    clave: "",
    correo: "",
    cargo: ""
  };


  constructor(private suser: UsuarioService) { }

  ngOnInit(): void {
    this.consulta();
    this.limpiar();

  }
//mostrar formulario
  mostrar(dato: any) {
    switch (dato) {
      case 0:
        this.verf = false;
        break;
      case 1:
        this.verf = true;
        break;
    }

  }
  //limpiar
  limpiar() {
    this.user.nombre = "";
    this.user.clave = "";
    this.user.correo = "";
    this.user.cargo = ""
  }



  consulta() {
    this.suser.consultar().subscribe((result: any) => {
      this.usuario = result;
     // console.log(this.usuario);
    })
}
  ingresar() {
    //console.log(this.cat);
    this.suser.insertar(this.user).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        //alert(datos['mensaje']);
        this.consulta();
      }
    });
    this.mostrar(0);
    this.limpiar();



}


}
