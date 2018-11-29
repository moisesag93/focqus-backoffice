import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import { HttpService } from 'src/app/services/api/http.service';
import { PaginasDialogComponent } from './paginas-dialog/paginas-dialog.component';
/**
 * @Autor: Moisés Aguiar [09/11/2018]
 * @Modificado:
 * @Descripción:
 * @Version: 1.0
 */
@Component({
  selector: 'app-paginas',
  templateUrl: './paginas.component.html',
  styleUrls: ['./paginas.component.css']
})
export class PaginasComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'sections', 'actions'];
  dataSource = null;
  pagesResource = 'pages';

  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private httpService: HttpService) {

  }

  ngOnInit() {
    this.httpService.get(this.pagesResource).subscribe(res => {
      if (res.data !== undefined) {
        const data = [];
        res.data.forEach((page: any, indexA) => {
          if (page.sections !== undefined || page.sections !== '') {
            const sections = page.sections.split(';');
            if (sections.length > 0) {
              page.sections = '';
              page.content = [];
              sections.forEach((sectionID, indexB) => {
                if (sectionID !== '') {
                  const resource = 'sections/' + sectionID;
                  this.httpService.get(resource).subscribe(section => {
                    page.sections = page.sections + section.data[0].title + '; ';
                    page.content.push({text: section.data[0].content, title: section.data[0].title});
                  });
                }
              });
            }
          }
          data.push();
        });
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
      }

    }, error => {
      console.log(error);
    });
  }

  openDialog(page: any): void {
    const dialogRef = this.dialog.open(PaginasDialogComponent, {
      width: '600px',
      data: page
    });

    dialogRef.afterClosed().subscribe(result => {
      const animal = result;
    });
  }

}
