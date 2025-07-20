import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { UserListComponent } from './user-list/user-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { authGuard } from '../guards/auth.guard';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  {
    path: 'dashboard/:id', 
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },  
      { path: 'home', component: HomeComponent, canActivate: [authGuard]},        
      { path: 'home/lists', component: UserListComponent, canActivate: [authGuard] },      
      { path: 'home/manage', component: ManageUserComponent,  canActivate: [authGuard] },
      { path: 'home/create', component: CreateUserComponent,  canActivate: [authGuard]},
      { path: 'home/view/:id', component: ViewUserComponent,  canActivate: [authGuard] },
      {path: 'home/edit/:id', component: EditUserComponent, canActivate: [authGuard]},
      {path: 'home/me', component: AdminProfileComponent, canActivate: [authGuard]},
      {path: 'home/notes', component: NotesComponent, canActivate: [authGuard]},
      { path: '**', component: PageNotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
