import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * @Autor: Moisés Aguiar [09/11/2018]
 * @Modificado:
 * @Descripción:
 * @Version: 1.0
 */
@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  sidebarCollapsedSubject = new Subject<boolean>();
  sidebarCollapsed = false;

  constructor() { }

  toggleSidebar () {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    this.sidebarCollapsedSubject.next(this.sidebarCollapsed);
  }
}
