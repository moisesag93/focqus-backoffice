import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 /**
  *  Components
  */
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { FormDialogComponent } from './common/form-dialog/form-dialog.component';
import { PaginasComponent } from './components/paginas/paginas.component';
/**
 * Modules
 */
import { MaterialComponentsModule } from './modules/material-components/material-components.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
/**
 * Services
 */
import { SidebarService } from './services/sidebar.service';
import { HttpService } from './services/api/http.service';
import { SeccionesComponent } from './components/secciones/secciones.component';
import { AppRoutingModule } from './app-routing.module';
import { PaginasDialogComponent } from './components/paginas/paginas-dialog/paginas-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    PaginasComponent,
    FormDialogComponent,
    UsuariosComponent,
    SeccionesComponent,
    PaginasDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    MaterialComponentsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  entryComponents: [
    FormDialogComponent,
    PaginasDialogComponent
  ],
  providers: [SidebarService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
