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

}
