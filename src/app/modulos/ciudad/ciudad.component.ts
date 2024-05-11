import { Component } from '@angular/core';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.scss']
})
export class CiudadComponent {
//variables globales
verf = false;
depto: any;
idciu: any;
ciud = {
  nombre: "",
  fo_depto: 0,
  
};

//para validar
validnombre = true;
validfodepto = true;
beditar = false;
constructor (private sciudad: CiudadService) {}

ngOnInit(): void {
  this.consulta();
  this.consulta_depto();
  this.limpiar();

}
//mostrar formulario
mostrar(dato: any) {
  switch (dato) {
    case 0:
      this.verf = false;
      this.beditar = false;
      this.idciu = "";
      this.limpiar();
      break;
    case 1:
      this.verf = true;
      break;
  }

}
//limpiar
limpiar() {
  this.ciud.nombre = "";
  this.ciud.fo_depto = 0;
  
}
//validar
validar() {
  if (this.ciud.nombre == "") {
    this.validnombre = false;
  }else{
    this.validnombre = true;
  }
  if (this.ciud.fo_depto == 0) {
    this.validfodepto = false;
  }else{
    this.validfodepto = true;
  }


}
    


consulta() {
  this.sciudad.consultar().subscribe((result: any) => {
    this.depto = result;
   // console.log(this.ciudad);
  })
}

consulta_depto() {
  this.sciudad.consultar_depto().subscribe((result: any) => {
    this.depto = result;
   // console.log(this.ciudad);
  })
}
ingresar() {
  //console.log(this.cat);
  this.validar();

  if (this.validnombre == true && this.validfodepto==true) {

    this.sciudad.insertar(this.depto).subscribe((datos: any) => {
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
      title: '¿ Esta seguro de eliminar la ciudad ' + nombre + '?',
      text: 'El proceso no podra ser revertido!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.borrarciudad(id);
        Swal.fire({
          title: 'Eliminado!',
          text: 'la ciudad ha sido eliminada.',
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
    //console.log(datos);
    this.ciud.nombre = datos.nombre;
    this.ciud.fo_depto = datos.fo_depto;
    
    this.idciu = id;
    this.mostrar(1);
    this.beditar = true;
  }

editar() {
  this.validar();
  if (this.validnombre==true &&
    this.validfodepto==true
  ) {
    this.sciudad.edit(this.ciud).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        this.consulta();
        this.mostrar(0);
        }
  });
    }
    }
  }