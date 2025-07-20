import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css'
})
export class ManageUserComponent implements OnInit{
 myLink = "my_style";
 my_th = "my_th_style";
 my_td = "my_td_style";
 users: any[] = [];
 adminId: any;
 constructor(private auth: AuthService, private router: Router){}
 ngOnInit(): void {
     this.auth.getAllUsers().subscribe((res: any)=>{
      this.users = res;
     });

     this.adminId = sessionStorage.getItem('adminId');
 }

 message = "";
 isSuccess: any;
 delete(id:any){
  if(confirm("Are you sure? ") == false){
    this.message = "Canceled...!";
    this.isSuccess = false;
    setTimeout(()=>{
      this.message = "";
    }, 1000);
  }
  else{
    this.auth.deleteUserById(id).subscribe(res=>{
      this.message = "User deleted successfully...!";
      this.isSuccess = true;
      setTimeout(()=>{
        // creates new array with only passed condition values. updated....
        this.users = this.users.filter(user => user.id !== id); 
        this.message = '';
      }, 1000);
    });
  }
 }
}
