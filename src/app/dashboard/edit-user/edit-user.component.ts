import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit{
  departments: any;
  constructor(private route: ActivatedRoute, private auth: AuthService, private fb: FormBuilder, private router: Router){}
  submitted: boolean = false;
  editUserForm: FormGroup = new FormGroup({});
  userID: any;
  adminId: any;
  managers: any;
  dept: string="";
  userDetails: any;
  myMap = new Map<String, String>();
  isLoaded: boolean = true;
  ngOnInit(): void {
    this.adminId = sessionStorage.getItem('adminId');
    this.isLoaded = false;
    this.auth.getAllDepartments().subscribe(res=>{
      this.departments = res;
      console.log(this.departments);
      for(let i = 0; i<this.departments.length; i++){
        this.myMap.set(this.departments[i].department, this.departments[i].managers.map((manager: { name: any; }) => manager.name));
      }
      });
      this.route.params.subscribe(res=>{
        this.userID = res['id'];
        console.log(this.userID);
      });
      if(this.userID !== ''){
        this.auth.getuserById(this.userID).
        toPromise()
        .then(res=>{
          this.userDetails = res;
          console.log(this.userDetails);
          this.editUserForm = this.fb.group({
            'name': new FormControl(this.userDetails.name, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/), Validators.minLength(5)]),
            'email': new FormControl(this.userDetails.email, [Validators.required, Validators.email]),
            'mobile': new FormControl(this.userDetails.mobile, [Validators.required, Validators.pattern(/^\d{10}$/)]),
            'p_date': new FormControl(this.userDetails.p_date, [Validators.required,  Validators.pattern(/^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)]),
            'created_date': new FormControl(this.userDetails.created_date, [Validators.required,  Validators.pattern(/^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)]),
            'department': new FormControl(this.userDetails.department, [Validators.required]),
            'reporting_manager': new FormControl(this.userDetails.reporting_manager, [Validators.required]),
            'password': new FormControl(this.userDetails.password, [Validators.required, Validators.minLength(5)])
          });
          this.editUserForm.get('department')?.setValue(this.userDetails.department);
          this.isLoaded = true;
        })
        .catch(error=>{
          this.message = error;
        });
      }
  }
  onchange(){
    if(this.dept){
      this.managers = this.myMap.get(this.dept);
    }
  }
  message = "";
  updateUser(){
    this.submitted = true;
    if (this.editUserForm.invalid) {
      return;
   }
    this.auth.updateUser(this.userID, this.editUserForm.value).subscribe(res=>{
      this.message = "User updated successfully... redirecting to view ueer";
      setTimeout(()=>{
        this.router.navigate(["/dashboard/" + this.adminId + "/home/view/" + this.userID]);
      }, 2000);
    });
  }

}
