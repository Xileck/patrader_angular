import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Persona } from '../../../../clases/persona';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { PersonasCatalogoService } from '../personas-catalogo.service';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';
import { utils } from '../../../../utils/utils';

@Component({
  selector: 'app-personas-form',
  templateUrl: './personas-form.component.html',
  styleUrls: ['./personas-form.component.css']
})
export class PersonasFormComponent implements OnInit {

  personaForm: FormGroup;
  nombreControl = new FormControl('', [Validators.required,]);
  apPatControl = new FormControl('', [Validators.required,]);
  apMatControl = new FormControl('', [Validators.required,]);
  objPersona: Persona = new Persona();

  constructor(
    public dialogRef: MatDialogRef<PersonasFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicio: PersonasCatalogoService
  ) { }

  ngOnInit() {
    this.personaForm = new FormGroup({
      nombreControl: new FormControl('', [Validators.required,]),
      apPatControl: new FormControl('', [Validators.required,]),
      apMatControl: new FormControl('', [Validators.required,]),
    });

    if (this.data.persona == null) {
      this.objPersona = new Persona();
    }
    else {
      this.objPersona = this.data.persona;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  insertarPersona() {
    if (this.validaObjeto()) {
      this.servicio.insertarPersona(this.objPersona).subscribe((res: HttpResponse<Persona>) => {
        if (res.status == 201) {
          Swal.fire(
            'Datos guardados!',
            'Da clic en el botón!',
            'success'
          )
          this.dialogRef.close();
        }
      },
        error => {
          Swal.fire({
            type: 'error',
            title: 'Error...',
            text: 'Algo salió mal!',
          })
        });
    }
    else {

      Swal.fire({
        title: 'Campos vacíos',
        type: 'info',
        animation: false,
        customClass: {
          popup: 'animated shake'
        },
        html: this.mensajeCamposVacios
      })
    }
  }



  mensajeCamposVacios: string = "";
  validaObjeto() {
    this.mensajeCamposVacios = "";
    if (this.objPersona.nombre != null &&
      this.objPersona.apellidoPaterno != null &&
      this.objPersona.apellidoMaterno != null) {
      return true;
    }
    else {
      if (this.objPersona.nombre == null) {
        this.mensajeCamposVacios = "<b><span style='color:red'>Nombre<b></span>";
      }
      else if (this.objPersona.nombre.length == 0) {
        this.mensajeCamposVacios = "<b><span style='color:red'>Nombre<b></span>";
      }

      if (this.objPersona.apellidoPaterno == null) {
        this.mensajeCamposVacios += "<br><b>Apellido paterno<b>";
      }
      else if (this.objPersona.apellidoPaterno.length == 0) {
        this.mensajeCamposVacios += "<br><b>Apellido paterno<b>";
      }

      if (this.objPersona.apellidoMaterno == null) {
        this.mensajeCamposVacios += "<br><b>Apellido materno<b>";
      }
      else if (this.objPersona.apellidoMaterno.length == 0) {
        this.mensajeCamposVacios += "<br><b>Apellido materno<b>";
      }

      return false
    }
  }

  keyPress(e){
    if(e.keyCode!=32){
      this.objPersona.apellidoPaterno = utils.getInstance().capitalLetter(e.key);
    }
  }

  capitalLetter(valor:string) {    
    return utils.getInstance().capitalLetter(valor);
  }
}
