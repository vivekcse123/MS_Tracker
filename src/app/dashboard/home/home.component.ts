import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private auth: AuthService, private router: Router){}
  adminId: any;
  current_date: any;
  current_time: any;
  allNotes: any[] = [];
  allWFH: any[] = [];
  allUsers: any[] = [];
  allDates: any[] = [];
  comingDate: any;
  ngOnInit(): void {
    this.adminId = sessionStorage.getItem('adminId');
      const date = new Date()
      setInterval(()=>{
        const newDate = new Date();
        let hours = newDate.getHours();
        let minutes = newDate.getMinutes();
        let seconds = newDate.getSeconds();
        this.current_date = date.toLocaleDateString();
        this.current_time = hours + " : " + minutes + " : " + seconds;
      }, 1000);

    this.auth.getAllNotes().subscribe((res: any)=>{
    this.allNotes = res;

    const today = new Date();
    const twoDaysLater = new Date(today);
    twoDaysLater.setDate(today.getDate() + 2);

    this.auth.getAllUsers().subscribe((res: any)=>{
      this.allUsers = res;

      this.allUsers.forEach((user)=>{
        const pDate = new Date(user.p_date);
        //console.log(pDate);
        console.log(today);
        if(pDate == today){
          console.log("hello");
        }
        else{
          console.log("No equal")
        }
      });
    });
   });
  
   this.auth.getAllWFH().subscribe((res: any)=>{
    this.allWFH = res;
   });
  }

  message = "";
  isSuccess: any;
  deleteNote(id: any){
    if(confirm("Are you sure? ") == false){
       this.message = "Canceled..!";
       this.isSuccess = false;
       setTimeout(()=>{
        this.message = "";
       }, 1000);
    }
   else{
    this.auth.deleteNoteById(id).subscribe(res=>{
      this.message = "Note deleted successfully...!";
      this.isSuccess = true;
      setTimeout(()=>{
        this.message = "";
        this.allNotes = this.allNotes.filter(note => note.id !== id);
      }, 1000);
    });
   }
  }

  isHidden: boolean = true;
  inboxMessage: string = "No request Good Gob!";
  approvedMessage = "";
  approved(user: any){
    this.isHidden = false;
    user.message = `Approval granted on ${new Date().toLocaleString()}`;
    user.status = "Approved";
    user.isHidden = true;
    this.auth.approved(user).subscribe((res)=>{
      this.approvedMessage = "WFH Approved...! for " + user.name;
      this.isSuccess = true;
      setTimeout(()=>{
        this.approvedMessage = "";
      }, 2000);
    });

  }
  reject(user: any){
    this.isHidden = false;
    user.message = `Approval rejected on ${new Date().toLocaleString()}`;
    user.status = "Rejected";
    user.isHidden = true;
    this.auth.reject(user).subscribe((res)=>{
      this.approvedMessage = "WFH Rejected...! for " + user.name;
      this.isSuccess = false;
      setTimeout(()=>{
        this.approvedMessage = "";
      }, 2000);
    });
  }

  get visibleUsers() {
    return this.allWFH.filter(user => !user.isHidden);
  }
}
