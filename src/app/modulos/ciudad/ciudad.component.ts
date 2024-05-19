import { Component } from '@angular/core';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.scss']
  
})
export class CiudadComponent {
  verf = false;
  ciudades: any[] = [];
  deptos: any;
  idciu: any;
  ciud = {
    nombre: "",
    fo_depto: 0
  };
  validnombre = true;
  validfodepto = true;
  beditar = false;

  constructor(private sciudad: CiudadService) { }

  ngOnInit(): void {
    this.consulta();
    this.consulta_depto();
    this.limpiar();
  }

  consulta() {
    this.sciudad.consultar().subscribe((result: any) => {
      this.ciudades = result;
    });
  }

  consulta_depto() {
    this.sciudad.consultar_depto().subscribe((result: any) => {
      this.deptos = result;
    });
  }

  ingresar() {
    this.validar();
    if (this.validnombre == true && this.validfodepto == true) {
      this.sciudad.insertar(this.ciud).subscribe((datos: any) => {
        if (datos['resultado'] == 'OK') {
          this.consulta();
        }
      });
      this.mostrar(0);
      this.limpiar();
    }
  }

  pregunta(id: any, nombre: any) {
    Swal.fire({
      title: '¿Está seguro de eliminar la ciudad ' + nombre + '?',
      text: 'El proceso no podrá ser revertido!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.borrarciudad(id);
        Swal.fire({
          title: 'Eliminado!',
          text: 'La ciudad ha sido eliminada.',
          icon: 'success',
        });
      }
    });
  }

  borrarciudad(id: any) {
    this.sciudad.eliminar(id).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        this.consulta();
      }
    });
  }

  cargardatos(datos: any, id: number) {
    this.ciud.nombre = datos.nombre;
    this.ciud.fo_depto = datos.fo_depto;
    this.idciu = id;
    this.mostrar(1);
    this.beditar = true;
  }

  editar() {
    this.validar();
    if (this.validnombre == true && 
      this.validfodepto == true) {

      this.sciudad.editar(this.ciud, this.idciu).subscribe((datos: any) => {
        if (datos['resultado'] == 'OK') {
          this.consulta();
          this.mostrar(0);
        }
      });
    }
  }

  validar() {
    if (this.ciud.nombre == "") {
      this.validnombre = false;
    } else {
      this.validnombre = true;
    }
    if (this.ciud.fo_depto == 0) {
      this.validfodepto = false;
    } else {
      this.validfodepto = true;
    }
  }

  limpiar() {
    this.ciud.nombre = "";
    this.ciud.fo_depto = 0;
  }

  mostrar(dato: any) {
    switch (dato) {
      case 0:
        this.verf = false;
        this.beditar = false;
        this.idciu = "";
        break;
      case 1:
        this.verf = true;
        break;
    }
  }
}