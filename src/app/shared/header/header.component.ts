import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] 
})
export class HeaderComponent implements OnInit {
  adminId: any;
  admin: any;
  adminName: any;
  isLoaded = false;
  users: any;
  searchUserForm: FormGroup;
  searchUser = new Map<String, String>(); 
  isDropdownOpen: boolean | undefined;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private themeService: ThemeService
  ) {
    this.searchUserForm = this.fb.group({
      'fname': new FormControl('')
    });
  }

  isDarkMode: boolean = false;
  ngOnInit(): void {
    this.adminId = sessionStorage.getItem("adminId");

    this.auth.getAdminById(this.adminId).subscribe(res => {
      if (res) {
        this.admin = res;
        if (this.admin && this.admin.fname) {
          this.adminName = this.admin.fname;
        }
        this.isLoaded = true;
      }
    });

    this.auth.getAllUsers().subscribe(res => {
      this.users = res;
      this.users.forEach((user: any) => {
        this.searchUser.set(user.name.toLowerCase(), user.id);
       // console.log(this.searchUser);
      });
    });

    this.isDarkMode = this.themeService.isDarkMode();
  }

  userId: any;
  searchUserByName() {
    const fname = this.searchUserForm.get('fname')?.value?.toLowerCase().trim().toLowerCase();
    if(fname.trim().length == 0){
      alert("Input is required...!");
    }
    else if(!isNaN(fname)){
      alert("Invalid input...!");
    }
    else if(fname.trim().length < 5){
      alert("Name can not be less than 5 characters...!");
    }
    else if(fname && this.searchUser.has(fname)){
      this.userId = this.searchUser.get(fname);
      this.router.navigate(['/dashboard/' + this.adminId + "/home/view/" + this.userId]);
    }
    else{
      alert("User not found...! redirecting to users lists...");
      this.router.navigate(['/dashboard/' + this.adminId + "/home/lists"]);
    }
  }

  isMenuOpen: boolean = false;

toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}

get isDesktop(): boolean {
  return window.innerWidth >= 992;
}

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.toggleDarkMode(this.isDarkMode);
  }

}
