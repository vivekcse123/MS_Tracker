import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { UserSharedModule } from '../user-shared/user-shared.module';
import { ApplyWFHComponent } from './apply-wfh/apply-wfh.component';
import { UserNotesComponent } from './user-notes/user-notes.component';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
    HomeComponent,
    ViewComponent,
    ApplyWFHComponent,
    UserNotesComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    UserSharedModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule
  ]
})
export class UserModule { }
