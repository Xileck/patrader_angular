import { Component, OnInit, Inject, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatBottomSheetRef, MatBottomSheet, MAT_BOTTOM_SHEET_DATA, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Empresa } from 'src/app/clases/empresa';
import { Persona } from 'src/app/clases/persona';
import { PersonasCatalogoService } from '../../personas-catalogo/personas-catalogo.service';
import Swal from 'sweetalert2';
import { EmpresasCatalogoService } from '../empresas-catalogo.service';
import { HttpResponse } from '@angular/common/http';
import { CodigoPostal } from 'src/app/clases/codigo-postal';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-empresas-form',
  templateUrl: './empresas-form.component.html',
  styleUrls: ['./empresas-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmpresasFormComponent implements OnInit {

  public empresaForm: FormGroup;

  empresa: Empresa;
  readOnly: boolean;
  personas: Persona[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EmpresasFormComponent>,
    private personasService: PersonasCatalogoService,
    private empresasService: EmpresasCatalogoService,
    private _bottomSheet: MatBottomSheet,
    private cd: ChangeDetectorRef) {

    this.empresa = new Empresa();

    // Clonamos el objeto, si no sigue haciendo referencia al objeto real.
    if (data.empresa != null)
      Object.assign(this.empresa, data.empresa)

    // Parametro que nos define si los inputs estaran habilitados o no
    this.readOnly = data.readOnly;

  }

  //Cuando el codigopostal es de 5 digitos
  onCPChange() {

    let codigoPostal: number = this.empresaForm.get('codigoPostal').value

    if (codigoPostal == null)
      return;

    if (codigoPostal.toString().length == 5) {
      this.empresasService.selectCodigoPostal(codigoPostal).subscribe(
        (cp: HttpResponse<CodigoPostal>) => {
          if (cp.body != null) {
            this.empresaForm.get('estado').setValue(cp.body.estado)
            this.empresaForm.get('ciudad').setValue(cp.body.ciudad)
          }
        }, (error) => {
          console.error(error)
        }
      );
    }
  }

  ngOnInit() {

    // Form representa la estructura de la clase Empresa
    this.empresaForm = new FormGroup({
      id: new FormControl(),
      nombre: new FormControl('', [Validators.required, Validators.maxLength(150)]),
      telefono: new FormControl('', [Validators.required, Validators.maxLength(22)]),
      codigoPostal: new FormControl('', [Validators.required, Validators.maxLength(5)]),
      estado: new FormControl('', [Validators.required, Validators.maxLength(35)]),
      ciudad: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      calle: new FormControl('', [Validators.required, Validators.maxLength(150)]),
      numCalle: new FormControl('', [Validators.required, Validators.maxLength(8)]),
      representante: new FormGroup({
        id: new FormControl('', [Validators.required]),
        nombre: new FormControl(''),
        apellidoPaterno: new FormControl(''),
        apellidoMaterno: new FormControl('')
      }),


    });


    // Si empresa no esta nula, inicializamos el Form con los valores de la empresa (modo edit y modo details)
    if (this.empresa != null && this.empresa.id != null) {
      this.empresaForm.patchValue(this.empresa)
    }

    // cargamos personas para seleccionarlas
    this.personasService.seleccionarPersonas()
      .subscribe((personas: Persona[]) => { this.personas = personas; })


  }

  onNoClick(): void {
    this.empresaForm.reset();
    this.dialogRef.close();
  }



  onSubmitEmpresa(empresaForm: FormGroup) {
    if (empresaForm.valid) {

      let empresa: Empresa = empresaForm.value;

      if (empresa.id == null)
        this.insert(empresa)
      else if (empresa.id != null)
        this.update(empresa)
      else
        this.dialogRef.close();

    } else {
      this.dialogRef.close()
    }
  }

  update(empresa: Empresa): void {

    this.empresasService.update(empresa).subscribe(
      (result) => {
        if (result.ok) {
          let result = { empresa: empresa, update: true, mensaje: 'Empresa actualizada exitosamente!' }
          this.dialogRef.close(result)
        }
      });
  }

  insert(empresa: Empresa) {
    this.empresasService.insert(empresa).subscribe(
      (result) => {
        if (result.ok) {
          let result = { empresa: empresa, update: true, mensaje: 'Empresa creada exitosamente!' }
          this.dialogRef.close(result)
        }
      });
  }

  openBottomSheet(): void {

    if (this.readOnly)
      return;

    const bottomSheetRef = this._bottomSheet.open(BuscarPersonaBottomSheet, { data: { personas: this.personas } });

    bottomSheetRef.afterDismissed().subscribe((result: Persona) => {

      if (result != null) {
        this.empresa.representante = result;
        this.empresaForm.get('representante').patchValue(result);
        this.cd.detectChanges();
      }
    })

  }
}


/* 
* *
* * Componente para buscar al representante
* */

@Component({
  selector: 'buscar-persona-bottom-sheet',
  templateUrl: 'buscar-persona-bottom-sheet.html',
  styleUrls: ['./empresas-form.component.css']
})
export class BuscarPersonaBottomSheet implements OnInit {

  //todo:agregar filtro personas
  displayedColumns: string[] = ['nombre'];
  dataSource: MatTableDataSource<Persona>;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private _bottomSheetRef: MatBottomSheetRef<BuscarPersonaBottomSheet>,
    private personasService: PersonasCatalogoService) {
  }

  ngOnInit(): void {
    this.personasService.seleccionarPersonas()
      .subscribe((personas: Persona[]) => {
        this.loadDataSource(personas)
        this.dataSource.filterPredicate = this.buscarPorNombreCompleto()
      })
  }

  private buscarPorNombreCompleto(): (data: Persona, filter: string) => boolean {
    return (persona: Persona, filter: string) => {
      let nombreCompleto = "";

      if (persona.nombre != null && persona.nombre.trim().length > 0)
        nombreCompleto += persona.nombre.trim();

      if (persona.apellidoPaterno != null && persona.apellidoPaterno.trim().length > 0)
        nombreCompleto += " " + persona.apellidoPaterno.trim();

      if (persona.apellidoMaterno != null && persona.apellidoMaterno.trim().length > 0)
        nombreCompleto += " " + persona.apellidoMaterno.trim();

      if (nombreCompleto.toUpperCase().indexOf(filter.toUpperCase()) >= 0)
        return true;
      else
        return false;
    };
  }

  private loadDataSource(personas: Persona[]) {
    this.dataSource = new MatTableDataSource<Persona>(personas);
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  highlight(row): void {
    this._bottomSheetRef.dismiss(row)

  }

  applyFilter(filterValue: string) {

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}