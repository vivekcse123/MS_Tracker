import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit{
constructor(private auth: AuthService, private fb: FormBuilder, private router: Router){}
departments: any;
managers: any;
dept: string="";
curr_date: string = "";
adminId: any;
myMap = new Map<String, String>();
submitted: boolean = false;
createUserForm: FormGroup = new FormGroup({});
ngOnInit(): void {
  this.adminId = sessionStorage.getItem('adminId');
  this.auth.getAllDepartments().subscribe(res=>{
    this.departments = res;
    console.log(this.departments);
    for(let i = 0; i<this.departments.length; i++){
      this.myMap.set(this.departments[i].department, this.departments[i].managers.map((manager: { name: any; }) => manager.name));
    }
    console.log(this.myMap);
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    this.curr_date = day + "/" +month + "/" + year;
  });

  this.createUserForm = this.fb.group({
    'name': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/), Validators.minLength(5)]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'mobile': new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    'p_date': new FormControl('', [Validators.required,  Validators.pattern(/^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)]),
    'created_date': new FormControl('', [Validators.required, Validators.pattern(/^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)
    ]),
    'department': new FormControl('', [Validators.required]),
    'reporting_manager': new FormControl('', [Validators.required]),
    'password': new FormControl('')
  });

}
onchange() {
  if (this.dept) {
    this.managers = this.myMap.get(this.dept);
  }
}

message = "";
createUser(){
this.submitted = true;
if(this.createUserForm.invalid){
  return;
}
this.auth.createUser(this.createUserForm.value).subscribe(res=>{
  this.message = "User created successfully..! redirecting to users lists...!";
  setTimeout(()=>{
    this.router.navigate(['/dashboard/' + this.adminId + "/home/lists"]);
  }, 2000);
}, (error=>{
  this.message = error;
}));
}
}
