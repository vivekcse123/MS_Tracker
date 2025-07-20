import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { SharedModule } from '../shared/shared.module';
import { UserListComponent } from './user-list/user-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NotesComponent } from './notes/notes.component';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    HomeComponent,
    CreateUserComponent,
    ManageUserComponent,
    ViewUserComponent,
    UserListComponent,
    AdminProfileComponent,
    EditUserComponent,
    NotesComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatListModule,
    MatIconModule,
    MatPaginatorModule
  ]
})
export class DashboardModule { }
