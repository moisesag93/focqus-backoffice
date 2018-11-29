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
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  actions: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', actions: ''},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', actions: ''},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', actions: ''},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', actions: ''}
];
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  animal: string;
  name: string;
  displayedColumns: string[] = ['id', 'name', 'lastname', 'email', 'type', 'actions'];
  dataSource = null;
  usersResource = 'users';


  @ViewChild(MatSort) sort: MatSort;

  constructor (public dialog: MatDialog, private httpService: HttpService) {

  }

  ngOnInit() {
    this.httpService.get(this.usersResource).subscribe(res => {
      if (res.data !== undefined) {
        console.log(res);
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
      }

    }, error => {
      console.log(error);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '350px',
      data: {type: 'users', name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}
