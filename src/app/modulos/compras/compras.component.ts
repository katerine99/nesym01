import { Component } from '@angular/core';
import { ComprasService } from 'src/app/servicios/compras.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent {
//variables globales
verf = false;
compras: any;
idcom: any;
comp = {
  cantidad: 0,
  total: 0,
  fo_producto:0,
  fo_usuarios: 0,
  fo_proveedor: 0,
};

//para validar
validcantidad = true;
validtotal = true;
validfoproducto= true;
validfousuarios= true;
validfoproveedor=true;
beditar = false;
constructor (private scompras: ComprasService) {}

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
      this.idcom = "";
      this.limpiar();
      break;
    case 1:
      this.verf = true;
      break;
  }

}
//limpiar
limpiar() {
  this.comp.cantidad = 0;
  this.comp.total = 0;
  this.comp.fo_producto = 0;
  this.comp.fo_usuarios =0;
  this.comp.fo_proveedor = 0;
}
//validar
validar() {
  if (this.comp.cantidad == 0) {
    this.validcantidad = false;
  }else{
    this.validcantidad = true;
  }

if (this.comp.total == 0) {
    this.validtotal = false;
  }else{
    this.validtotal = true;
}
  if (this.comp.fo_producto == 0 ){
    this.validfoproducto = false;
  }else{
    this.validfoproducto= true;
  }
  
  if (this.comp.fo_usuarios == 0) {
    this.validfousuarios = false;
  }else{
    this.validfousuarios = true;
  }
  if (this.comp.fo_proveedor == 0) {
    this.validfoproveedor = false;
  }else{
    this.validfoproveedor = true;
  }

}


consulta() {
  this.scompras.consultar().subscribe((result: any) => {
    this.compras = result;
   // console.log(this.usuario);
  })
}
ingresar() {
  //console.log(this.cat);
  this.validar();
  if (this.validcantidad == true && this.validtotal == true && this.validfoproducto == true && this.validfousuarios == true &&this.validfoproveedor == true) {

    this.scompras.insertar(this.compras).subscribe((datos: any) => {
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
