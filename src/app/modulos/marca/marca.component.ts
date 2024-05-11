import { Component } from '@angular/core';
import { MarcaService } from 'src/app/servicios/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.scss']
})
export class MarcaComponent {
//variables globales
verf = false;
marca: any;
idmar: any;
marc = {
  nombre: "",
};

//para validar
validnombre = true;
beditar= false;
constructor (private smarca: MarcaService) {}

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
      this.idmar = "";
      this.limpiar();
      break;
    case 1:
      this.verf = true;
      break;
  }

}
//limpiar
limpiar() {
  this.marc.nombre = "";
  
}
//validar
validar() {
  if (this.marc.nombre == "") {
    this.validnombre = false;
  }else{
    this.validnombre = true;
  }


}


consulta() {
  this.smarca.consultar().subscribe((result: any) => {
    this.marca = result;
   // console.log(this.usuario);
  })
}
ingresar() {
  //console.log(this.cat);
  this.validar();
  if (this.validnombre == true) {

    this.smarca.insertar(this.marca).subscribe((datos: any) => {
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
