import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit{
constructor(private auth: AuthService){}
userId: any;
userDetails: any;
ngOnInit(): void {
  this.userId = sessionStorage.getItem("userId");
  this.auth.getuserById(this.userId).subscribe(res=>{
    this.userDetails = res;
  });
}
}
