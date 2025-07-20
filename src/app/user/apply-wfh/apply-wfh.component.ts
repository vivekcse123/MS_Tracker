import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apply-wfh',
  templateUrl: './apply-wfh.component.html',
  styleUrl: './apply-wfh.component.css'
})
export class ApplyWFHComponent implements OnInit{
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){}
  submitted: boolean = false;
  current_user: any;
  current_date: any;
  user_name: any;
  email: any;
  userId: any;
  wfhForm: FormGroup = new FormGroup({});
  ngOnInit(): void {
    this.userId = sessionStorage.getItem("userId");
    this.wfhForm = this.fb.group({
      'name': new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z\s]+$/)]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'p_date': new FormControl('', [Validators.required, Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/)]),
      'message': new FormControl('', [Validators.required, Validators.minLength(10)]),
      "status": "Pending",
      "isHidden": false
    });

    this.auth.getuserById(this.userId).subscribe(res=>{
      this.current_user = res;
      this.user_name = this.current_user?.name;
      this.email = this.current_user?.email;
    });

    var date = new Date().toLocaleDateString();
    this.current_date = date;

  }

  message :string = "";
  apply(){
    this.submitted = true;
    if(this.wfhForm.invalid){
      return;
    }
    this.auth.apply(this.wfhForm.value).subscribe(res=>{
      this.message = "Applied successfully..redirecting to home page....";
      setTimeout(()=>{
        this.router.navigate(['/user/' + this.userId + '/home']);
      }, 2000);
      console.log("Applied...!");
    });
  }
}
