import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { PersonasCatalogoService } from './personas-catalogo.service';
import { MatTableDataSource, TooltipPosition } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort } from '@angular/material';
import { PersonasFormComponent } from './personas-form/personas-form.component';
import { Persona } from '../../../clases/persona';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personas-catalogo',
  templateUrl: './personas-catalogo.component.html',
  styleUrls: ['./personas-catalogo.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PersonasCatalogoComponent implements OnInit {

  constructor(private servicio: PersonasCatalogoService, public dialog: MatDialog) {
  }

  displayedColumns: string[] = ['Id', 'Nombre', 'A. Paterno', 'A. Materno', 'accion'];
  dataSource: MatTableDataSource<Persona>;
  selectedRowIndex = -1;
  formulario_persona: MatDialogRef<PersonasFormComponent>;
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  persona: Persona = new Persona();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.seleccionarPersonas();
  }

  seleccionarPersonas() {
    this.servicio.seleccionarPersonas()
      .subscribe((personas: Persona[]) => {
        this.dataSource = new MatTableDataSource<Persona>(personas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (Persona, Headers) => Persona["id"]
      });
  }

  highlight(row) {
    this.selectedRowIndex = row.id;
  }

  openFormulario(row) {
    const dialogRef = this.dialog.open(PersonasFormComponent, {
      width: '800px',
      data: { persona: row },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  editar(row) {
    this.openFormulario(row);
  }

  confirmaDelete(id) {

    Swal.fire({
      title: 'Confirmación',
      text: "Está seguro de eliminar a la persona",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      this.deletePersona(id);
    })
  }


  deletePersona(id) {
    this.servicio.deletePersona(id).subscribe(res => {

      let re = res;
      if (res.ok) {
        Swal.fire(
          'Borrado',
          'Persona borrada correctamente',
          'success'
        );
        this.seleccionarPersonas();
      }
    },
    error=>{
      Swal.fire({
        type: 'error',
        title: 'Error...',
        text: 'Algo salió mal!',
      })
    });
  }
}
