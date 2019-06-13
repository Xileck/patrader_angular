import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonasCatalogoComponent } from './componentes/catalogos/personas-catalogo/personas-catalogo.component';
import { UsuariosCatalogoComponent } from './componentes/catalogos/usuarios-catalogo/usuarios-catalogo.component';
import { EmpresasCatalogoComponent } from './componentes/catalogos/empresas-catalogo/empresas-catalogo.component';

const routes: Routes = [
  {
    path: 'catalogo',  children: [
      { path: 'personas', component: PersonasCatalogoComponent },
      { path: 'usuarios', component: UsuariosCatalogoComponent },
      { path: 'empresas', component: EmpresasCatalogoComponent }
    ]
  },
   /***Default */
   { path: '', redirectTo: 'catalogo/empresas', pathMatch: 'full' },
   /**  No encontrado */
   { path: '**', redirectTo: '', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
