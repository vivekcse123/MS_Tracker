import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ViewEncapsulation } from '@angular/compiler';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent implements OnInit{
  constructor(private auth: AuthService){}
  adminId: any;
  adminDetails: any;
  ngOnInit(): void {
      this.adminId = sessionStorage.getItem('adminId');
     // console.log(this.adminId);
      this.auth.getAdminById(this.adminId).subscribe(res=>{
        this.adminDetails = res;
      });
      //console.log(this.adminDetails);
  }
}
