import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import { UserHeaderComponent } from './user-header/user-header.component';
import { UserFooterComponent } from './user-footer/user-footer.component';


@NgModule({
  declarations: [
    UserHeaderComponent,
    UserFooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatSlideToggleModule
  ],
  exports: [UserHeaderComponent, UserFooterComponent]
})
export class UserSharedModule { }
