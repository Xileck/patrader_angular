import { Component, Directive } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ExportExcelService } from './exportarExcel/export-excel.service';
import { ViewChild, ElementRef } from '@angular/core';


import * as XLSX from 'xlsx';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private servicioExcel: ExportExcelService) { this.totalRegistros = this.ELEMENT_DATA.length; }

  ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  highlightedRows = [];
  selectedRowIndex = -1;
  totalRegistros;

  @ViewChild("customers", { read: ElementRef }) tabla: ElementRef;

  highlight(row) {
    this.selectedRowIndex = row.position;
  }

  ExportTOExcel(){
    this.servicioExcel.ExportTOExcel(this.tabla.nativeElement,"PRUEBA"+new Date().getTime());
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    this.totalRegistros = this.dataSource.filteredData.length;
  }



}
