import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { userGuardGuard } from '../guards/user-guard.guard';
import { ApplyWFHComponent } from './apply-wfh/apply-wfh.component';
import { UserNotesComponent } from './user-notes/user-notes.component';

const routes: Routes = [
  {path: 'user/:id', children: [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, canActivate: [userGuardGuard]},
    {path: 'apply', component: ApplyWFHComponent, canActivate: [userGuardGuard]},
    {path: 'me', component: ViewComponent, canActivate: [userGuardGuard]},
    {path: 'note', component: UserNotesComponent, canActivate: [userGuardGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
