import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {
    path: 'auth', 
    loadChildren:()=> import('./auth/auth-routing.module').then((m) => m.AuthRoutingModule)
  },
  {
    path: 'dashboard',
    loadChildren:()=>import('./dashboard/dashboard.module').then(mod=>mod.DashboardModule)
  },
  {
    path: 'user',
    loadChildren:()=>import('./user/user.module').then(mod=>mod.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
