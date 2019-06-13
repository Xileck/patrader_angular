import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, TooltipPosition } from '@angular/material';
import { Empresa } from 'src/app/clases/empresa';
import Swal from 'sweetalert2';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { EmpresasCatalogoService } from './empresas-catalogo.service';
import { EmpresasFormComponent } from './empresas-form/empresas-form.component';

@Component({
  selector: 'app-empresas-catalogo',
  templateUrl: './empresas-catalogo.component.html',
  styleUrls: ['./empresas-catalogo.component.css']
})
export class EmpresasCatalogoComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'nombre', 'direccion', 'representante', 'accion'];
  dataSource: MatTableDataSource<Empresa>;
  selectedRowIndex: number = -1;
  selectedEmpresa: Empresa;
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  isLoading: boolean;

  constructor(private empresaService: EmpresasCatalogoService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.selectEmpresas();
  }

  selectEmpresas(): void {
    this.isLoading = true;
    this.empresaService.selectAll()
      .subscribe((empresas: HttpResponse<Empresa[]>) => {
        this.loadDataSource(empresas.body)
      },
        error => console.log(error),
        () => { this.isLoading = false; }// finally
      );
  }

  highlight(row): void {
    this.selectedRowIndex = row.id;

  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editar(empresa: Empresa) {
    this.openDialog(empresa, false);
  }



  confirmarBorrar(empresa: Empresa) {

    Swal.fire({
      title: 'Confirmación',
      text: "Está seguro de eliminar a la empresa?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value)
        this.borrar(empresa);
    })
  }

  private borrar(empresa: Empresa) {
    this.empresaService.delete(empresa.id)
      .subscribe((response: HttpResponse<any>) => {
        if (response.ok) {
          Swal.fire(
            'Exito',
            'Empresa borrada correctamente',
            'success'
          );
          this.isLoading = true;

          this.empresaService.selectAll().subscribe((empresas: HttpResponse<Empresa[]>) => {
            this.loadDataSource(empresas.body)
            this.isLoading = false;
          })

        }

      },
        (error: HttpErrorResponse) => {
          Swal.fire({
            type: 'error',
            title: 'Error...',
            text: 'Algo salió mal!',
          });
          console.error(error)
        }
      )
  }

  detalles(empresa: Empresa) {
    this.openDialog(empresa, true)
  }

  loadDataSource(empresas: Empresa[]) {
    this.dataSource = new MatTableDataSource<Empresa>(empresas);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**Dialog */
  openDialog(empresa: Empresa, readOnly: boolean): void {

    if (empresa == null)
      empresa = new Empresa();

    const dialogRef = this.dialog.open(EmpresasFormComponent, {
      width: '60%',
      data: {
        empresa: empresa,
        readOnly // habilitamos o deshabilitamos los campos del formulario
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result != null && result.update == true) {
        this.selectEmpresas()
        Swal.fire(
          'Exito',
          result.mensaje,
          'success'
        );
      }
    });
  }
}

