import { Component } from '@angular/core';
import { DepartamentoService } from 'src/app/servicios/departamento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss']
})
export class DepartamentoComponent {
  verf = false;
  departamento: any;
  iddep: any;
  depto = { nombre: "", id_depto: null };
  validnombre = true;
  beditar = false;

  constructor(private sdepartamento: DepartamentoService) {}

  ngOnInit(): void {
    this.consulta();
    this.limpiar();
  }

  mostrar(dato: any) {
    switch (dato) {
      case 0:
        this.verf = false;
        this.beditar = false;
        this.iddep = "";
        this.limpiar();
        break;
      case 1:
        this.verf = true;
        break;
    }
  }

  limpiar() {
    this.depto = { nombre: "", id_depto: null };
  }

  validar() {
    this.validnombre = this.depto.nombre !== "";
  }

  consulta() {
    this.sdepartamento.consultar().subscribe((result: any) => {
      this.departamento = result;
    });
  }

  ingresar() {
    this.validar();
    if (this.validnombre) {
      this.sdepartamento.insertar(this.depto).subscribe((datos: any) => {
        if (datos.resultado === 'OK') {
          this.consulta();
        }
      });
      this.mostrar(0);
      this.limpiar();
    }
  }

  pregunta(id: any, nombre: any) {
    Swal.fire({
      title: `¿Está seguro de eliminar el departamento ${nombre}?`,
      text: 'El proceso no podrá ser revertido!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.borrardepartamento(id);
        Swal.fire('Eliminado!', 'El departamento ha sido eliminado.', 'success');
      }
    });
  }

  borrardepartamento(id: any) {
    this.sdepartamento.eliminar(id).subscribe((datos: any) => {
      if (datos.resultado === 'OK') {
        this.consulta();
      }
    });
  }

  cargardatos(datos: any, id: number) {
    //console.log(datos);
  
    this.depto.nombre = datos.nombre;
    this.iddep = id;
    this.mostrar(1);
    this.beditar = true;
  }
  editar() {
    this.validar();
    if (this.validnombre) {
      this.sdepartamento.editar(this.depto, this.iddep).subscribe((datos: any) => {
        if (datos.resultado === 'OK') {
          this.consulta();
          this.mostrar(0);
        }
      });
    }
  }

  eliminar() {
    if (confirm("¿Estás seguro de eliminar el departamento?")) {
      this.sdepartamento.eliminar(this.iddep).subscribe((datos: any) => {
        if (datos.resultado === 'OK') {
          this.consulta();
          Swal.fire('¡Eliminado!', 'El departamento ha sido eliminado.', 'success');
          this.mostrar(0);
        }
      });
    }
  }
}
  