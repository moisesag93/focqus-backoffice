import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router' ;
import { TestComponent } from './test/test.component';
import { PaginasComponent } from './components/paginas/paginas.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { SeccionesComponent } from './components/secciones/secciones.component';

const focqusRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'test', component: TestComponent },
  { path: 'paginas', component: PaginasComponent },
  { path: 'secciones', component: SeccionesComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }

];
@NgModule({
  imports: [ RouterModule.forRoot(focqusRoutes, {useHash: false}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
