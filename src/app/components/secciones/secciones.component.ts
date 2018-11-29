import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormDialogComponent } from 'src/app/common/form-dialog/form-dialog.component';
import { HttpService } from 'src/app/services/api/http.service';
/**
 * @Autor: Moisés Aguiar [09/11/2018]
 * @Modificado:
 * @Descripción:
 * @Version: 1.0
 */
@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.css']
})
export class SeccionesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'sections', 'actions'];
  dataSource = null;
  pagesResource = 'sections';
  constructor() { }

  ngOnInit() {
  }

}
