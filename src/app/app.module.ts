import { LayoutModule } from '@angular/cdk/layout';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatBottomSheetModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatMenuModule, MatNavList, MatOptionModule, MatPaginatorIntl, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTooltipModule, MatListModule, MatDatepickerModule, MatNativeDateModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpresasCatalogoComponent } from './componentes/catalogos/empresas-catalogo/empresas-catalogo.component';
import { BuscarPersonaBottomSheet, EmpresasFormComponent } from './componentes/catalogos/empresas-catalogo/empresas-form/empresas-form.component';
import { PersonasCatalogoComponent } from './componentes/catalogos/personas-catalogo/personas-catalogo.component';
import { PersonasFormComponent } from './componentes/catalogos/personas-catalogo/personas-form/personas-form.component';
import { UsuariosCatalogoComponent } from './componentes/catalogos/usuarios-catalogo/usuarios-catalogo.component';
import { ConfirmationDialogComponent } from './componentes/shared/confirmation-dialog/confirmation-dialog.component';
import { ExportExcelService } from './exportarExcel/export-excel.service';
import { EmpresaDireccionPipe } from './pipes/empresa-direccion.pipe';
import { NombreCompletoPipe } from './pipes/nombre-completo.pipe';

export const customPaginatorIntl = new MatPaginatorIntl(

);

@NgModule({
  declarations: [
    AppComponent,
    PersonasCatalogoComponent,
    PersonasFormComponent,
    UsuariosCatalogoComponent,
    EmpresasCatalogoComponent,
    EmpresaDireccionPipe,
    NombreCompletoPipe,
    EmpresasFormComponent,
    ConfirmationDialogComponent,
    BuscarPersonaBottomSheet

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    FlexLayoutModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatOptionModule,
    MatSelectModule,
    MatAutocompleteModule,
    ScrollDispatchModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatProgressBarModule,
    MatMenuModule,
    LayoutModule,
    MatRadioModule,
    MatBottomSheetModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule
  ],
  providers: [
    ExportExcelService,
    { provide: LOCALE_ID, useValue: 'es_MX' },
    MatSelectModule
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    PersonasFormComponent,
    EmpresasFormComponent,
    ConfirmationDialogComponent,
    BuscarPersonaBottomSheet
  ]
})
export class AppModule { }