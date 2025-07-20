import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup = new FormGroup({});
  submitted = false;
  errorMessage = "";
  successMessage = "";
  allAdmins: any;
  myMap = new Map<String, String>();
  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    sessionStorage.removeItem('adminId');
    sessionStorage.removeItem('isLoggedIn');
    this.forgotPasswordForm = this.fb.group({
      "email": new FormControl('', [Validators.required, Validators.email]),
      "password_hint": new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9]+$/)])
    });

    this.auth.getAllAdmins().subscribe(res=>{
      this.allAdmins = res;
      this.allAdmins.forEach((admin: any) => {
        this.myMap.set(admin.email, admin.password_hint);
      });
    });
  }

  resetPassword() {
    this.submitted = true;
    if(this.forgotPasswordForm.invalid){
      return;
    }
    let email = this.forgotPasswordForm.get('email')?.value;
    let password_hint = this.forgotPasswordForm.get('password_hint')?.value;
    let new_password = this.forgotPasswordForm.get('password')?.value;
    
    this.auth.getAdminByEmail(email).subscribe((res: any)=>{
      const currentAdmin = res;
      if(this.myMap.has(email) && this.myMap.get(email) == password_hint){
        this.auth.forgotPassword(currentAdmin[0].id, new_password).subscribe(res=>{
          //console.log("Password updated successfully....!");
          this.successMessage = "Password updated successfully...! redirecting to login page";
          sessionStorage.removeItem('adminId');
          sessionStorage.removeItem('isLoggedIn');
          setTimeout(()=>{
            this.router.navigate(['/auth/login']);
          }, 1000);
        });
      }
      else{
        this.errorMessage = "Invalid password or password hint..!";
      }
    });
  }
}
