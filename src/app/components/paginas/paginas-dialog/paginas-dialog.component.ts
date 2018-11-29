import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
/**
 * @Autor: Moisés Aguiar [09/11/2018]
 * @Modificado:
 * @Descripción:
 * @Version: 1.0
 */
@Component({
  selector: 'app-paginas-dialog',
  templateUrl: './paginas-dialog.component.html',
  styleUrls: ['./paginas-dialog.component.css']
})
export class PaginasDialogComponent {
  pageContent: Array<any> = [];
  constructor(
    public dialogRef: MatDialogRef<PaginasDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      data.content.forEach((key, index) => {
        const contentParsed =  JSON.parse(key.text.replace('\\', ''));
        const parentKeyname = Object.keys(contentParsed);
        const childrenKeynames = Object.keys(contentParsed[parentKeyname[0]]);
        const contentSerialized = [];
        childrenKeynames.forEach((keyName) => {
          const item = {id: keyName, text: contentParsed[parentKeyname[0]][keyName]};
          contentSerialized.push(item);
        });

        this.pageContent.push({title: key.title, content: contentSerialized});
      });
      console.log(this.pageContent);
    }

    cancel(): void {
    this.dialogRef.close();
  }

}
