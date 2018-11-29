import { Component, OnInit } from '@angular/core';
import { SidebarService } from './services/sidebar.service';
/**
 * @Autor: Moisés Aguiar [09/11/2018]
 * @Modificado:
 * @Descripción:
 * @Version: 1.0
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sidebarCollapsed: Boolean;
  title = 'focqus-backoffice';

  constructor (private sidebarService: SidebarService) {

  }

  ngOnInit() {
    this.sidebarCollapsed = this.sidebarService.sidebarCollapsed;
    this.sidebarService.sidebarCollapsedSubject.subscribe(val => {
      this.sidebarCollapsed = val;
      console.log(this.sidebarCollapsed);
    });
  }

  collapse (collapsed: boolean) {
    console.log(collapsed);
  }
}
