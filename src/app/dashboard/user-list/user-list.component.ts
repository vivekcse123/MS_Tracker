import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  name = 'Aman';
  users: any;
  p_date: any;
  adminId: any;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getAllUsers().subscribe(res => {
      this.users = res;
      this.users.forEach((user: { expectedPeriodDateRange: any; p_date: any; }) => {
        user.expectedPeriodDateRange = this.calculatePeriodDateRange(user.p_date);
      });
    });
    this.adminId = sessionStorage.getItem("adminId");
  }

  calculatePeriodDateRange(p_date: string): { startDate: string, endDate: string } {
    const userDate = new Date(p_date);

    const startDate = new Date(userDate);
    startDate.setDate(userDate.getDate() + 27);

    const endDate = new Date(userDate);
    endDate.setDate(userDate.getDate() + 33);


    return {
      startDate: startDate.toISOString().split('T')[0],  
      endDate: endDate.toISOString().split('T')[0]    
    };
  }
}
