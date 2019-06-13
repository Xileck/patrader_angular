import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {

  titulo: string;
  mensaje: string;
  acceptIcon:string;

  
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.mensaje = data.mensaje;
    this.titulo = data.titulo;
    this.acceptIcon = data.acceptIcon;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}