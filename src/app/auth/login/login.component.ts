import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){}
  submitted = false;
  isLoading : boolean = false;
  loginForm: FormGroup = new FormGroup({}); 
  adminMap = new Map<String, String>();
  userMap = new Map<String, String>();
  admins: any;
  users: any[] = [];

  otp: any = [];
  ngOnInit(): void {

  sessionStorage.setItem('adminId', "");
  sessionStorage.setItem("isLoggedIn", "false");
  sessionStorage.setItem('userId', "");
  sessionStorage.setItem("isUserLoggedIn", "false");


  this.loginForm = this.fb.group({
    'email': new FormControl('', [Validators.required]),
    'password': new FormControl('', [Validators.required])
  });


  this.auth.getAllAdmins().subscribe(res=>{
    this.admins = res;
    for(let i = 0; i<this.admins.length; i++){
      this.adminMap.set(this.admins[i].email, this.admins[i].password);
      //console.log(this.adminMap);
    }

  this.auth.getAllUsers().subscribe((res: any)=>{
    this.users = res;
    for(let i = 0; i<this.users.length; i++){
      this.userMap.set(this.users[i].email, this.users[i].password);
      //console.log(this.userMap);
    }
  });

});
}

error = "";
adminID: any;
userID: any;
success = "";
login(e: any){
  this.submitted = true;
  if(this.loginForm.invalid){
    return;
  }

  const password = this.loginForm.get('password')?.value;
  const email = this.loginForm.get('email')?.value;

  if (this.adminMap.has(email) && this.adminMap.get(email) === password) {
    const admin = this.admins.find((admin: { email: string }) => admin.email === email);
      if (admin) {
        sessionStorage.setItem("isLoggedIn", "true");
        this.adminID = admin.id;
        this.auth.setAdminId(this.adminID);
        sessionStorage.setItem('adminId', this.adminID);
        this.isLoading = true;
        this.success = "Otp send.. to your registered mailid..!";
        this.sendEmail(e);

        const myOtp = this.otp;
        setTimeout(()=>{
          let verify = Number(prompt("Enter otp: "));
          if(verify === myOtp){
            this.router.navigate(['/dashboard/' + this.adminID + "/home"]);
          }
          else{
            alert("Invalid otp");
            this.router.navigate(['/login/']);
          }
        },1000);
      }
  }


  else if (this.userMap.has(email) && this.userMap.get(email) === password) {
    const user = this.users.find((user: { email: string }) => user.email === email);
      if (user) {
        sessionStorage.setItem("isUserLoggedIn", "true");
        this.userID = user.id;
        //this.auth.setAdminId(this.userID);
        sessionStorage.setItem('userId', this.userID);
        this.isLoading = true;
        setTimeout(()=>{
          this.router.navigate(['/user/' + this.userID + "/home"]);
        }, 1000);
      }
  }
  else{
    this.error = "Invalid login credentials!";
    this.isLoading = false;
  }
}

//generate otp
generateOTP(){
   let rand = Math.floor(Math.random() * 10000 + 1);
   return this.otp = rand;
}

public sendEmail(e: Event) {
  e.preventDefault();

  //get form data
  const form = e.target as HTMLFormElement;

  const new_otp = this.generateOTP();

  const otpInput = document.createElement('input');
  otpInput.type = 'hidden';
  otpInput.name = 'otp';
  otpInput.value = new_otp.toString();
  form.appendChild(otpInput);

  emailjs
    .sendForm('service_l8la4oe', 'template_v2snjup', form, {
      publicKey: '9g7BaOkPC1lcih73D',
    })
    .then(
      () => {
        console.log('SUCCESS! OTP sent.');
      },
      (error) => {
        console.log('FAILED...', (error as EmailJSResponseStatus).text);
      }
    );
}


}
