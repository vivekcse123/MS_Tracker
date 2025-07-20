import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit{
  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router){}
  errorMessage = "";
  successMessage = "";
  submitted: boolean = false;
  allUser: any[] = [];
  userId: any;
  userMap = new Map<String, String>();
  changePasswordForm: FormGroup = new FormGroup({});
  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9]+$/)]),
      'newpassword': new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9]+$/)])
    });

    this.auth.getAllUsers().subscribe((res: any)=>{
      this.allUser = res;
      for(let i = 0; i<this.allUser.length; i++){
        this.userMap.set(this.allUser[i].email, this.allUser[i].password);
        //console.log(this.userMap);
      }
    });
   }
   changePassword(){
    this.submitted = true;
    // this.sendEmail(event: any);
    if(this.changePasswordForm.invalid){
      return;
    }
    let email = this.changePasswordForm.get('email')?.value;
    let password = this.changePasswordForm.get('password')?.value;
    if(this.userMap.has(email) && this.userMap.get(email) == password){
    const user = this.allUser.find(user => user.email === email);
    if(user){
      this.userId = user.id;
    }
    this.auth.changePassword(this.userId, this.changePasswordForm.get('newpassword')?.value).subscribe(res=>{
      this.successMessage = "Password changed successfully...! redirecting to login page...";
      setTimeout(()=>{
        this.router.navigate(["/auth/login"]);
        this.errorMessage = "";
      }, 2000);
    });
    }
    else{
      this.errorMessage = "Invalid username or password!";
    }
   }

  //  public sendEmail(e: Event) {
  //   e.preventDefault();

  //   emailjs
  //     .sendForm('service_l8la4oe', 'template_v2snjup', e.target as HTMLFormElement, {
  //       publicKey: '9g7BaOkPC1lcih73D',
  //     })
  //     .then(
  //       () => {
  //         console.log('SUCCESS!');
  //       },
  //       (error) => {
  //         console.log('FAILED...', (error as EmailJSResponseStatus).text);
  //       },
  //     );
  // }

}
