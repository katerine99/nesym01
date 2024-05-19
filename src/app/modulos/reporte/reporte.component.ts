import { Component } from '@angular/core';
import { ReporteService } from 'src/app/servicios/reporte.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent {
//variables globales
verf = false;
reporte: any;
idrepor: any;
report = {
  preventivo: "",
  correctivo: "",
  emergente: "",
};

//para validar
validpreventivo = true;
validcorrectivo = true;
validemergente= true;
beditar = false;
constructor (private sreporte: ReporteService) {}

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
      this.idrepor = "";
      this.limpiar();
      break;
    case 1:
      this.verf = true;
      break;
  }

}
//limpiar
limpiar() {
  this.report.preventivo = "";
  this.report.correctivo = "";
  this.report.emergente = "";

}
//validar
validar() {
  if (this.report.preventivo == "") {
    this.validpreventivo = false;
  }else{
    this.validpreventivo = true;
  }
if (this.report.correctivo == "") {
    this.validcorrectivo = false;
  }else{
    this.validcorrectivo = true;
}
  if (this.report.emergente == "") {
    this.validemergente = false;
  }else{
    this.validemergente= true;
  }
  
}


consulta() {
  this.sreporte.consultar().subscribe((result: any) => {
    this.reporte= result;
   // console.log(this.usuario);
  })
}
ingresar() {
  //console.log(this.cat);
  this.validar();
  if (this.validpreventivo == true && this.validcorrectivo == true && this.validemergente) {

    this.sreporte.insertar(this.report).subscribe((datos: any) => {
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
    title: '¿ Esta seguro de eliminar el reporte ' + nombre + '?',
    text: 'El proceso no podra ser revertido!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Eliminar!',
  }).then((result) => {
    if (result.isConfirmed) {
      this.borrarreporte(id);
      Swal.fire({
        title: 'Eliminado!',
        text: 'El reporte ha sido eliminado.',
        icon: 'success',
      });
    }
  });
}

borrarreporte(id: any) {
  this.sreporte.eliminar(id).subscribe((datos: any) => {
    if (datos['resultado'] == 'OK') {
      this.consulta();
    }
  });
}

cargardatos(datos: any, id: number) {
  //console.log(datos);
  this.report.preventivo = datos.preventivo;
  this.report.correctivo = datos.correctivo;
  this.report.emergente = datos.emergente;
  this.idrepor = id;
  this.mostrar(1);
  this.beditar = true;
}

editar() {
  this.validar();

  if (
    this.validpreventivo== true &&
    this.validcorrectivo == true &&
    this.validemergente == true 
    
  ) {
    this.sreporte.edit(this.report).subscribe((datos: any) => {
      if (datos['resultado'] == 'ok') {
        // alerta datos
        this.consulta();
      }
    });
    this.mostrar(0);
  }
}
}
