import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent implements OnInit{
  constructor(private auth: AuthService){}
    userId: any;
    name: any;
    user: any;
    ngOnInit(): void {
        this.userId = sessionStorage.getItem("userId");
        console.log(this.userId);
  
        this.auth.getuserById(this.userId).subscribe(res=>{
          this.user = res;
          this.name = this.user?.name;
        });
    }
  
    isDropdownOpen: boolean | undefined;
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  
    // toggleTheme(): void {
    //   this.isDarkMode = !this.isDarkMode;
    //   this.themeService.toggleDarkMode(this.isDarkMode);
    // }
}
