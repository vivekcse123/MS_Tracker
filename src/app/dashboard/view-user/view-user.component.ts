import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent implements OnInit{
  constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router){}
  userDetails: any;
  userId: any;
  adminId: any;
  p_date: any;
  startDate: any;
  endDate: any;
  ngOnInit(): void {
    this.route.params.subscribe(res=>{
      this.userId = res['id'];
      console.log(this.userId);
    });

    this.auth.getuserById(this.userId).subscribe(res=>{
      this.userDetails = res;
      //console.log(this.userDetails);
      this.p_date = this.userDetails.p_date;
        console.log(this.p_date);
        this.getExpectedDate();
    });

    this.adminId = sessionStorage.getItem('adminId');
  }

  getExpectedDate(){
    const userDate = new Date(this.p_date);

    //start date
    const startDate = new Date(userDate);
    startDate.setDate(userDate.getDate() + 27);
    this.startDate = startDate.toISOString().split('T')[0];// format a string in date format yyyy-mm-dd

    // end date
    const endDate = new Date(userDate);
    endDate.setDate(userDate.getDate()+ 33);
    this.endDate = endDate.toISOString().split('T')[0];
  }

  
  back(){
    this.router.navigate(['/dashboard/' + this.adminId + "/home/lists"]);
  }
  manage(){
    this.router.navigate(['/dashboard/' + this.adminId + "/home/manage"]);
  }
}
