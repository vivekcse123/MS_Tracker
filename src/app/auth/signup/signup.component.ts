import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router) {}

  submitted: boolean = false;
  isLoading : boolean = false;
  signUpForm: FormGroup = new FormGroup({});
  checkMap = new Map<String, String>();
  admins: any;
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      'fname': new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z\s]+$/)]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'gender': new FormControl('', [Validators.required]),
      'mobile': new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      'password': new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9]+$/)]),
      'cpassword': new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9]+$/)]),
      'password_hint': new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9]+$/)])
    });

    this.auth.getAllAdmins().subscribe(res=>{
      this.admins = res;
      for(let i = 0; i<this.admins.length; i++){
        this.checkMap.set(this.admins[i].mobile, this.admins[i].email);
        console.log(this.checkMap);
      }
    },
    (error) => {
      this.error = error;
      this.success = '';
    }
   );    
  }

  error = "";
  success = "";
  count: number = 3;
  isSuccess = '';
  
  signUp() {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      console.log("Form is invalid, please fill out all required fields correctly.");
      return;
    }
    const password = this.signUpForm.get('password')?.value;
    const cpassword = this.signUpForm.get('cpassword')?.value;
    if (password !== cpassword) {
      this.error = "Password and Confirm password must be the same!";
      return;
    }
    const email = this.signUpForm.get('email')?.value;
    const mobile = this.signUpForm.get('mobile')?.value;
     if(this.checkMap.has(mobile)){
      this.error = "User already exists !!"
      return;
     }
      this.auth.signUp(this.signUpForm.value).subscribe(
        (res) => {
          this.isLoading = true;
          this.success = "User created successfully...!";
          setTimeout(()=>{
            this.router.navigate(['login']);
          }, 3000);
  
          setInterval(()=>{
            this.count--;
            this.success = "Redirecting to login after " + this.count + " seconds";
          }, 1000);
        },
        (error) => {
          console.error("Signup failed:", error);
          this.isLoading = false;
        }
      );
  }
}
