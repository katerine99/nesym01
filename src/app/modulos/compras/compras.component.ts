import { Component, OnInit } from '@angular/core';
import { ComprasService } from 'src/app/servicios/compras.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {
  // variables globales
  verf = false;
  compras: any;
  productos: any;
  usuarios: any;
  proveedores: any;
  idcom: any;
  comp = {
    cantidad: 0,
    total: 0,
    fo_producto: 0,
    fo_usuarios: 0,
    fo_proveedor: 0,
  };

  // para validar
  validcantidad = true;
  validtotal = true;
  validfoproducto = true;
  validfousuarios = true;
  validfoproveedor = true;
  beditar = false;

  constructor(private scompras: ComprasService) {}

  ngOnInit(): void {
    this.consulta();
    this.consulta_producto();
    this.consulta_usuarios();
    this.consulta_proveedor();
    this.limpiar();
  }

  // mostrar formulario
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

  // limpiar
  limpiar() {
    this.comp.cantidad = 0;
    this.comp.total = 0;
    this.comp.fo_producto = 0;
    this.comp.fo_usuarios = 0;
    this.comp.fo_proveedor = 0;
  }

  // validar
  validar() {
    this.validcantidad = this.comp.cantidad !== 0;
    this.validtotal = this.comp.total !== 0;
    this.validfoproducto = this.comp.fo_producto !== 0;
    this.validfousuarios = this.comp.fo_usuarios !== 0;
    this.validfoproveedor = this.comp.fo_proveedor !== 0;
  }

  // Consultar compras
  consulta() {
    this.scompras.consultar().subscribe((result: any) => {
      this.compras = result;
    });
  }

  // Consultar productos
  consulta_producto() {
    this.scompras.consultar_productos().subscribe((result: any) => {
      this.productos = result;
    });
  }

  // Consultar usuarios
  consulta_usuarios() {
    this.scompras.consultar_usuarios().subscribe((result: any) => {
      this.usuarios = result;
    });
  }

  // Consultar proveedores
  consulta_proveedor() {
    this.scompras.consultar_proveedores().subscribe((result: any) => {
      this.proveedores = result;
    });
  }

  ingresar() {
    this.validar();
    if (this.validcantidad ==true && 
      this.validtotal ===true && 

      this.validfoproducto ==true &&
       this.validfousuarios ==true && 
       this.validfoproveedor==true) {

      this.scompras.insertar(this.comp).subscribe((datos: any) => {
        if (datos['resultado'] == 'OK') {
          this.consulta();
        }
      });
      this.mostrar(0);
      this.limpiar();
    }
  }

  cargardatos(datos: any, id: number) {
    this.comp.cantidad = datos.cantidad;
    this.comp.total = datos.total;
    this.comp.fo_producto = datos.fo_producto;
    this.comp.fo_usuarios = datos.fo_usuarios;
    this.comp.fo_proveedor = datos.fo_proveedor;
    this.idcom = id;
    this.mostrar(1);
    this.beditar = true;
  }

  pregunta(id: any, nombre: any) {
    Swal.fire({
      title: '¿Está seguro de eliminar la compra ' + nombre + '?',
      text: 'El proceso no podrá ser revertido!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.borrarcompra(id);
        Swal.fire({
          title: 'Eliminado!',
          text: 'La compra ha sido eliminada.',
          icon: 'success',
        });
      }
    });
  }

  borrarcompra(id: any) {
    this.scompras.eliminar(id).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        this.consulta();
      }
    });
  }

  editar() {
    this.validar();
    if (this.validcantidad && this.validtotal && this.validfoproducto && this.validfousuarios && this.validfoproveedor) {
      this.scompras.editar(this.comp).subscribe((datos: any) => {
        if (datos['resultado'] == 'ok') {
          this.consulta();
          this.mostrar(0);
          this.limpiar();
        }
      });
    }
  }
  eliminar() {
    if (confirm("¿Estás seguro de eliminar la compra?")) {
      this.scompras.eliminar(this.idcom).subscribe((datos: any) => {
        if (datos['resultado'] == 'OK') {
          this.consulta();
          Swal.fire('¡Eliminado!', 'la compra ha sido eliminado.', 'success');
          this.mostrar(0);
        }
      });
    }
  }
  
  }
