import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  //variables globales
  verf = false;
  usuario: any;
  iduser: any;
  user = {
    nombre: "",
    usuario: "",
    clave: "",
    cargo: ""
  };

  //para validar
  validnombre = true;
  validusuario = true;
  validclave = true;
  validcargo = true;
  beditar = false;
  constructor(private suser: UsuariosService) {}

  ngOnInit(): void {
    this.consulta();
    this.limpiar();
  }
  //mostrar formulario
  mostrar(dato: any) {
    switch (dato) {
      case 0:
        this.verf = false;
        this.beditar = false;
        this.iduser = "";
        this.limpiar();
        break;
      case 1:
        this.verf = true;
        break;
    }
  }
  //limpiar
  limpiar() {
    this.user.nombre = "";
    this.user.usuario = "";
    this.user.clave = "";
    this.user.cargo = "";
  }
  //validar
  validar() {
    if (this.user.nombre == "") {
      this.validnombre = false;
    } else {
      this.validnombre = true;
    }
    if (this.user.usuario == "") {
      this.validusuario = false;
    } else {
      this.validusuario = true;
    }

    if (this.user.clave == "") {
      this.validclave = false;
    } else {
      this.validclave = true;
    }
    if (this.user.cargo == "") {
      this.validcargo = false;
    } else {
      this.validcargo = true;
    }
  }

  consulta() {
    this.suser.consultar().subscribe((result: any) => {
      this.usuario = result;
      // console.log(this.usuario);
    })
  }
  ingresar() {
    //console.log(this.cat);
    this.validar();
    if (
      this.validnombre == true &&
      this.validusuario == true &&
      this.validclave == true &&
      this.validcargo == true
    ) {
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

  pregunta(id: any, nombre: any) {
    console.log('entro con el id' + id);
    Swal.fire({
      title: '¿ Esta seguro de eliminar el usuario ' + nombre + '?',
      text: 'El proceso no podra ser revertido!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.borrarusuario(id);
        Swal.fire({
          title: 'Eliminado!',
          text: 'El usuario ha sido eliminado.',
          icon: 'success',
        });
      }
    });
  }

  borrarusuario(id: any) {
    this.suser.eliminar(id).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        this.consulta();
      }
    });
  }

  cargardatos(datos: any, id: number) {
    //console.log(datos);
    this.user.nombre = datos.nombre;
    this.user.usuario = datos.usuario;
    this.user.clave = datos.clave;
    this.user.cargo = datos.cargo;
    this.iduser = id;
    this.mostrar(1);
    this.beditar = true;
  }

  editar() {
    this.validar();

    if (
      this.validnombre == true &&
      this.validusuario == true &&
      this.validclave == true &&
      this.validcargo == true
    ) {
      this.suser.editar(this.user, this.iduser).subscribe((datos: any) => {
        if (datos['resultado'] == 'ok') {
          // alerta datos
          this.consulta();
        }
      });
      this.mostrar(0);
    }
  }
}
