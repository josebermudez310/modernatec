import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./RolSeguridad/home/home-routing.module').then( m => m.HomePageRoutingModule),
    canActivate:[ AuthGuard ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'password',
    loadChildren: () => import('./cambioContrasenaLogin/password/password.module').then( m => m.PasswordPageModule)
  },
 
  {
    path: 'codigo',
    loadChildren: () => import('./cambioContrasenaLogin/codigo/codigo.module').then( m => m.CodigoPageModule)
  },
  {
    path: 'visitantes',
    loadChildren: () => import('./RolSeguridad/visitantes/visitantes.module').then( m => m.VisitantesPageModule)
  },
  
  
  {
    path: 'home-admin',
    loadChildren: () => import('./RolAdministrador/home-admin/home-admin.module').then( m => m.HomeAdminPageModule)
  },
  {
    path: 'nueva-contrasena',
    loadChildren: () => import('./cambioContrasenaLogin/nueva-contrasena/nueva-contrasena.module').then( m => m.NuevaContrasenaPageModule)
  },
  {
    path: 'reportes',
    loadChildren: () => import('./RolAdministrador/reportes/reportes.module').then( m => m.ReportesPageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./RolAdministrador/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'foto',
    loadChildren: () => import('./RolSeguridad/foto/foto.module').then( m => m.FotoPageModule)
  },

  {
    path: 'info-visitantes',
    loadChildren: () => import('./RolSeguridad/info-visitantes/info-visitantes.module').then( m => m.InfoVisitantesPageModule)
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  

  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
