import { Component } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {

  //variables globales
  verf = false;
  producto: any;
  marca: any;
  idprod: any;
  product = {
    nombre: "",
    fo_marca: 0,

  };

  //para validar
  validnombre = true;
  validfo_marca = true;
  beditar = false;
  constructor (private sproducto: ProductoService) {}

  ngOnInit(): void {
    this.consulta();
    this.consulta_marca
   // this.limpiar();

  }
  //mostrar formulario
  mostrar(dato: any) {
    switch (dato) {
      case 0:
        this.verf = false;
        this.beditar = false;
        this.idprod= "";
        //this.limpiar();
        break;
      case 1:
        this.verf = true;
        break;
    }

  }
  //limpiar
  limpiar() {
    this.product.nombre = "";
    this.product.fo_marca = 0;

  }
  //validar
  validar() {
    if (this.product.nombre == "") {
      this.validnombre = false;
    }else{
      this.validnombre = true;
    }
if (this.product.fo_marca == 0) {
      this.validfo_marca = false;
    }else{
      this.validfo_marca = true;

    }


  }

consulta() {
    this.sproducto.consultar().subscribe((result: any) => {
      this.producto = result;
      console.log(this.producto);
    })


}
consulta_marca() {
  this.sproducto.consultar_marca().subscribe((result: any) => {
    this.marca = result;
    console.log(this.producto);
  })


}
ingresar() {
  //console.log(this.cat);
  this.validar();
  let ma = Number (this.product.fo_marca);
  this.product.fo_marca= ma

  if (this.validnombre == true && this.validfo_marca == true ) {

    this.sproducto.insertar(this.product).subscribe((datos: any) => {
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
