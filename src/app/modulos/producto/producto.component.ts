import { Component } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {

  verf = false;
  marcas: any;
  productos: any;
  idprod: any;
  product = {
    nombre: "",
    fo_marca: 0,
  };

  validnombre = true;
  validfomarca = true;
  beditar = false;

  constructor(private sproducto: ProductoService) { }

  ngOnInit(): void {
    this.consulta();
    this.consulta_marca();
    this.limpiar();
  }

  consulta() {
    this.sproducto.consultar().subscribe((result: any) => {
      this.productos = result;
    });
  }

  consulta_marca() {
    this.sproducto.consultar_marca().subscribe((result: any) => {
      this.marcas = result;
    });
  }

  ingresar() {
    this.validar();

    if (this.validnombre == true && 
      this.validfomarca == true) {

      this.sproducto.insertar(this.product).subscribe((datos: any) => {
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
      title: '¿Está seguro de eliminar el producto ' + nombre + '?',
      text: 'El proceso no podrá ser revertido!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.borrarproducto(id);
        Swal.fire({
          title: 'Eliminado!',
          text: 'El producto ha sido eliminado.',
          icon: 'success',
        });
      }
    });
  }

  borrarproducto(id: any) {
    this.sproducto.eliminar(id).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        this.consulta();
      }
    });
  }

  cargardatos(datos: any, id: number) {
    this.product.nombre = datos.nombre;
    this.product.fo_marca = datos.fo_marca;
    this.idprod= id;
    this.mostrar(1);
    this.beditar = true;
  }

  editar() {
    this.validar();

    if (this.validnombre == true &&
       this.validfomarca == true) {

      this.sproducto.editar(this.product, this.idprod).subscribe((datos: any) => {
        if (datos['resultado'] == 'ok') {
          this.consulta();
        }
      });
      this.mostrar(0);
    }
  }

  validar() {
    if (this.product.nombre == "") {
      this.validnombre = false;
    } else {
      this.validnombre = true;
    }
    if (this.product.fo_marca == 0) {
      this.validfomarca = false;
    } else {
      this.validfomarca = true;
    }
  }

  limpiar() {
    this.product.nombre = "";
    this.product.fo_marca = 0;
  }

  mostrar(dato: any) {
    switch (dato) {
      case 0:
        this.verf = false;
        this.beditar = false;
        this.idprod = "";
        break;
      case 1:
        this.verf = true;
        break;
    }
  }
  eliminar() {
    if (confirm("¿Estás seguro de eliminar el producto?")) {
      this.sproducto.eliminar(this.idprod).subscribe((datos: any) => {
        if (datos['resultado'] == 'OK') {
          this.consulta();
          Swal.fire('¡Eliminado!', 'el producto ha sido eliminado.', 'success');
          this.mostrar(0);
        }
      });
    }
  }
  
  }

