import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
constructor(private auth: AuthService){}
userId: any;
curr_date: any;
curr_time: any;
all_wfh: any;
userWFH: any;
user: any;
wfh_dates: any;
notes: any [] = [];
userData: any[] = [];
ngOnInit(): void {
  this.userId = sessionStorage.getItem("userId");
  this.calculteDate();

  this.auth.getuserById(this.userId).subscribe(res=>{
    this.user = res;
  });

  this.auth.getAllWFH().subscribe(res=>{
    this.all_wfh = res;
    this.userData = this.all_wfh.filter((data: any) => data.name === this.user.name);
  });

  this.auth.getUserNoteById(this.userId).subscribe((res: any)=>{
    this.notes = res;
  });

}

calculteDate(){
  setInterval(()=>{
  var date = new Date();
  this.curr_date = date.toLocaleDateString();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
    this.curr_time = hours + " : " + minutes + " : " + seconds;
  }, 1000);
}

message: any;
isSuccess:boolean = false;
delete(id: any){
  if(confirm("Are you sure?") == false){
    this.message = "Cancelled...!";
    this.isSuccess = false;
    setTimeout(()=>{
      this.message = "";
    }, 1000);
    return;
  }
  else{
    this.auth.deleteUserNoteById(id).subscribe(res=>{
      this.message = "Note deleted succcessfully...!";
      this.notes = this.notes.filter((note) => note.id != id);
      this.isSuccess = true;
      setTimeout(()=>{
        this.message = "";
      }, 1000)
    });
  }
}

}
